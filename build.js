const electronInstaller = require('electron-winstaller');

try {
  await electronInstaller.createWindowsInstaller({
    appDirectory: '/build/my-app-64',
    outputDirectory: '/tmp/build/installer64',
    authors: 'My App Inc.',
    exe: 'myapp.exe',
  });
  console.log('It worked!');
} catch (e) {
  console.log(`No dice: ${e.message}`);
}
