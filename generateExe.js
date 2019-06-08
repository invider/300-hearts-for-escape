const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig() {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')
  return Promise.resolve({
    appDirectory: path.join(outPath, 'collider-win32-ia32/'),
    authors: 'Igor Khotin',
    noMsi: false,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'collider.exe',
    setupExe: 'ColliderAppInstaller.exe',
    setupMsi: 'ColliderAppInstaller.msi',
    setupIcon: path.join(rootPath, 'out', 'assets', 'icons', 'jam.ico')
  })
}
