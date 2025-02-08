const Window = require('./window');
class Desktop {
  constructor() {
    this.windows = new Map();
    this.taskbar = this.createTaskbar();
    this.startMenu = this.createStartMenu();
  }
  createTaskbar() {
    const taskbar = new Window('WSN Taskbar', 1280, 40);
    taskbar.createWindow();
    taskbar.show();
    return taskbar;
  }
  createStartMenu() {
    const startMenu = new Window('WSN Start Menu', 300, 500);
    startMenu.createWindow();
    startMenu.show();
    return startMenu;
  }
  launchApp(appPath) {
    console.log(`Launching app: ${appPath}`);
    const ProcessManager = require('../processManager');
    try {
      ProcessManager.createProcess(appPath);
    } catch (e) {
      console.error(`Failed to launch app: ${e.message}`);
    }
  }
}
module.exports = new Desktop();
