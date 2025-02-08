const { exec } = require('child_process');
const fs = require('fs');
class Explorer {
  static openFolder(folderPath) {
    console.log(`Opening Explorer for folder: ${folderPath}`);
    exec(`explorer "${folderPath}"`);
  }
  static listFiles(folderPath) {
    return new Promise((resolve, reject) => {
      fs.readdir(folderPath, (err, files) => {
        if (err) return reject(err);
        resolve(files);
      });
    });
  }
}
module.exports = Explorer;
