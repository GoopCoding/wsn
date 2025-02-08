const { Desktop, ProcessManager, ProcessNative, Drivers, Explorer, Controls } = require('./index');
const Window = require('./lib/gui/window');
console.log("=== Launching Notepad via ProcessManager ===");
Desktop.launchApp('C:\\Windows\\System32\\notepad.exe');
console.log("=== Launching Calculator via ProcessNative ===");
try {
  const proc = ProcessNative.createProcessNative('C:\\Windows\\System32\\calc.exe', []);
  console.log("Native process created:", proc);
} catch (e) {
  console.error("Error launching native process:", e);
}
console.log("=== Listing Drivers ===");
Drivers.listDrivers()
  .then(output => {
    console.log("Driver list:");
    console.log(output);
  })
  .catch(err => {
    console.error("Error listing drivers:", err);
  });
console.log("=== Opening Explorer for C:\\ ===");
Explorer.openFolder('C:\\');
console.log("=== Creating a Custom Window with Controls ===");
const myWindow = new Window('My Custom App', 800, 600);
myWindow.createWindow();
const button = Controls.Button(myWindow, 'Click Me', 10, 10, 100, 30);
const textBox = Controls.TextBox(myWindow, 10, 50, 200, 25);
myWindow.show();
