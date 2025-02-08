const { exec } = require('child_process');
class Drivers {
  static listDrivers() {
    return new Promise((resolve, reject) => {
      exec('driverquery', (error, stdout, stderr) => {
        if (error) return reject(error);
        resolve(stdout);
      });
    });
  }
  static loadDriver(driverPath) {
    return new Promise((resolve, reject) => {
      exec(`sc start "${driverPath}"`, (error, stdout, stderr) => {
        if (error) return reject(error);
        resolve(stdout);
      });
    });
  }
  static unloadDriver(driverName) {
    return new Promise((resolve, reject) => {
      exec(`sc stop "${driverName}"`, (error, stdout, stderr) => {
        if (error) return reject(error);
        resolve(stdout);
      });
    });
  }
}
module.exports = Drivers;
