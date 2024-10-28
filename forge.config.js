require("dotenv").config();
const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");
// test/icons/mac test/icons/png test/icons/win

// NOTE
// The icons specified in the packagerConfig is the icon that will be used for the application
// The icons specified in the makers are the icons that will be used for the installer

function fixPath(path) {
  let base = `${process.cwd()}`;
  if (!path.startsWith("/")) {
    base += "/";
  }

  return `${process.cwd()}${path}`;
}

console.log(`[Iliad] Process root: `, process.cwd());
console.log(
  process.env.APPLE_API_ISSUER,
  process.env.APPLE_API_KEY_ID,
  process.env.APPLE_API_KEY
);

module.exports = {
  packagerConfig: {
    icon: "/Users/owen/Documents/GitHub/atlas/electron-client-legacy/src/assets/cross-platform/icon",
    asar: {
      unpack: "**/icon.ico",
    },
    name: "Atlas Suite",
    appBundleId: "com.iliad.atlas",
    osxSign: {}, // object must exist even if empty
    // osxNotarize: {
    //   appleApiIssuer: process.env.APPLE_API_ISSUER,
    //   appleApiKeyId: process.env.APPLE_API_KEY_ID,
    //   appleApiKey: process.env.APPLE_API_KEY,
    // },
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        title: "Atlas Suite",
        authors: "Iliad",
        description: "Installer for the Atlas Suite application",
        name: "atlas_suite",
        iconUrl: fixPath("/src/assets/win/icon.ico"),
        setupIcon: fixPath("/src/assets/win/icon.ico"),
        setupExe: "AtlasSuiteInstaller.exe",
        setupMsi: "AtlasSuiteInstaller.msi",
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        icon: fixPath("/src/assets/mac/icon.icns"),
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: true,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: true,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
