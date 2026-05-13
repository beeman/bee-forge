import { spawnSync } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'

type AppConfig = {
  expo?: {
    android?: {
      package?: string
    }
  }
}

type SigningMetadata = {
  createdAt: string
  keyAlias: string
  keyPassword: string
  keystorePassword: string
  packageName: string
}

const APP_CONFIG_PATH = resolve('app.json')
const GRADLE_BUILD_PATH = resolve('android/app/build.gradle')
const KEY_ALIAS = 'android-upload'
const KEYSTORE_PATH = resolve('keys/android-upload.keystore')
const KEYS_DIR = resolve('keys')
const METADATA_PATH = resolve('keys/android-upload.json')
const RELEASE_APK_PATH = resolve('android/app/build/outputs/apk/release/app-release.apk')
const RELEASE_KEYSTORE_PATH = resolve('android/app/release.keystore')

main()

function buildReleaseApk(metadata: SigningMetadata) {
  run('bun', ['x', 'expo', 'prebuild', '--clean', '--platform', 'android'], {
    capture: false,
    env: { ...process.env, CI: '1' },
  })

  writeFileSync(RELEASE_KEYSTORE_PATH, readFileSync(KEYSTORE_PATH))
  chmodSync(RELEASE_KEYSTORE_PATH, 0o600)

  patchReleaseSigning()

  run('./gradlew', ['app:assembleRelease'], {
    capture: false,
    cwd: resolve('android'),
    env: {
      ...process.env,
      APK_UPLOAD_KEY_ALIAS: metadata.keyAlias,
      APK_UPLOAD_KEY_PASSWORD: metadata.keyPassword,
      APK_UPLOAD_STORE_PASSWORD: metadata.keystorePassword,
    },
  })

  console.log(`\nRelease APK: ${displayPath(RELEASE_APK_PATH)}`)
}

function createKeystore(metadata: SigningMetadata) {
  run(
    'keytool',
    [
      '-genkeypair',
      '-v',
      '-alias',
      metadata.keyAlias,
      '-dname',
      'CN=Android APK, OU=Development, O=Bee Forge, L=Local, S=Local, C=US',
      '-keyalg',
      'RSA',
      '-keypass',
      metadata.keyPassword,
      '-keysize',
      '2048',
      '-keystore',
      KEYSTORE_PATH,
      '-noprompt',
      '-storepass',
      metadata.keystorePassword,
      '-validity',
      '10000',
    ],
    { capture: false },
  )

  chmodSync(KEYSTORE_PATH, 0o600)
}

function createMetadata(packageName: string): SigningMetadata {
  const password = randomBytes(24).toString('hex')

  return {
    createdAt: new Date().toISOString(),
    keyAlias: KEY_ALIAS,
    keyPassword: password,
    keystorePassword: password,
    packageName,
  }
}

function displayPath(path: string) {
  const relativePath = relative(process.cwd(), path)
  return relativePath === '' ? '.' : relativePath
}

function ensureSigningFiles(packageName: string): SigningMetadata {
  const keystoreExists = existsSync(KEYSTORE_PATH)
  const metadataExists = existsSync(METADATA_PATH)

  if (keystoreExists && !metadataExists) {
    fail(`Found ${displayPath(KEYSTORE_PATH)} without ${displayPath(METADATA_PATH)}.`)
  }

  if (!keystoreExists && metadataExists) {
    fail(`Found ${displayPath(METADATA_PATH)} without ${displayPath(KEYSTORE_PATH)}.`)
  }

  if (keystoreExists && metadataExists) {
    const metadata = readMetadata()

    if (metadata.packageName !== packageName) {
      fail(`Signing metadata is for ${metadata.packageName}, but app.json uses ${packageName}.`)
    }

    console.log(`Reusing release signing key from ${displayPath(KEYSTORE_PATH)}`)
    return metadata
  }

  mkdirSync(KEYS_DIR, { recursive: true })
  chmodSync(KEYS_DIR, 0o700)

  const metadata = createMetadata(packageName)

  console.log(`Creating release signing key at ${displayPath(KEYSTORE_PATH)}`)
  createKeystore(metadata)
  writeFileSync(METADATA_PATH, `${JSON.stringify(metadata, null, 2)}\n`)
  chmodSync(METADATA_PATH, 0o600)

  console.log(`Back up ${displayPath(KEYS_DIR)}/. This key is required for future APK updates.`)

  return metadata
}

function fail(message: string): never {
  console.error(`Error: ${message}`)
  process.exit(1)
}

function main() {
  const packageName = readPackageName()
  const metadata = ensureSigningFiles(packageName)

  buildReleaseApk(metadata)
}

function patchReleaseSigning() {
  const debugSigningBlock = [
    '        debug {',
    "            storeFile file('debug.keystore')",
    "            storePassword 'android'",
    "            keyAlias 'androiddebugkey'",
    "            keyPassword 'android'",
    '        }',
  ].join('\n')
  const releaseSigningBlock = [
    '        release {',
    "            storeFile file('release.keystore')",
    "            storePassword System.getenv('APK_UPLOAD_STORE_PASSWORD')",
    "            keyAlias System.getenv('APK_UPLOAD_KEY_ALIAS')",
    "            keyPassword System.getenv('APK_UPLOAD_KEY_PASSWORD')",
    '        }',
  ].join('\n')
  const releaseDebugSigning = [
    '        release {',
    '            // Caution! In production, you need to generate your own keystore file.',
    '            // see https://reactnative.dev/docs/signed-apk-android.',
    '            signingConfig signingConfigs.debug',
  ].join('\n')
  let source = readFileSync(GRADLE_BUILD_PATH, 'utf8')

  if (!source.includes(releaseSigningBlock)) {
    if (!source.includes(debugSigningBlock)) {
      fail('Could not find the Android debug signing block to patch.')
    }

    source = source.replace(`${debugSigningBlock}\n`, `${debugSigningBlock}\n${releaseSigningBlock}\n`)
  }

  if (source.includes(releaseDebugSigning)) {
    source = source.replace(
      releaseDebugSigning,
      releaseDebugSigning.replace('signingConfig signingConfigs.debug', 'signingConfig signingConfigs.release'),
    )
  } else if (!source.includes('signingConfig signingConfigs.release')) {
    fail('Could not find the Android release buildType signingConfig to patch.')
  }

  writeFileSync(GRADLE_BUILD_PATH, source)
}

function readMetadata(): SigningMetadata {
  const metadata = JSON.parse(readFileSync(METADATA_PATH, 'utf8')) as Partial<SigningMetadata>

  if (
    typeof metadata.createdAt !== 'string' ||
    typeof metadata.keyAlias !== 'string' ||
    typeof metadata.keyPassword !== 'string' ||
    typeof metadata.keystorePassword !== 'string' ||
    typeof metadata.packageName !== 'string'
  ) {
    fail(`Invalid signing metadata in ${displayPath(METADATA_PATH)}.`)
  }

  return metadata as SigningMetadata
}

function readPackageName() {
  const config = JSON.parse(readFileSync(APP_CONFIG_PATH, 'utf8')) as AppConfig
  const packageName = config.expo?.android?.package

  if (!packageName) {
    fail('app.json must define expo.android.package.')
  }

  return packageName
}

function run(
  command: string,
  args: string[],
  options: { capture?: boolean; cwd?: string; env?: NodeJS.ProcessEnv } = {},
) {
  const capture = options.capture ?? true
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    encoding: 'utf8',
    env: options.env,
    stdio: capture ? 'pipe' : 'inherit',
  })

  if (result.error) {
    const maybeErrno = result.error as NodeJS.ErrnoException

    if (maybeErrno.code === 'ENOENT') {
      fail(`${command} is required on PATH.`)
    }

    throw result.error
  }

  if (result.status !== 0) {
    const stderr = result.stderr?.trim()
    fail(stderr || `${command} ${args.join(' ')} failed.`)
  }

  if (capture && result.stdout.trim()) {
    console.log(result.stdout.trim())
  }
}
