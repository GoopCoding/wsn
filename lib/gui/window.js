const ffi = require('ffi-napi');
const ref = require('ref-napi');
const user32 = new ffi.Library('user32', {
  CreateWindowExW: ['pointer', ['uint32', 'pointer', 'pointer', 'uint32', 'int32', 'int32', 'int32', 'int32', 'pointer', 'pointer', 'pointer', 'pointer']],
  ShowWindow: ['bool', ['pointer', 'int32']],
  UpdateWindow: ['bool', ['pointer']]
});
class Window {
  constructor(title, width = 800, height = 600) {
    this.title = title;
    this.width = width;
    this.height = height;
    this.handle = null;
  }
  createWindow() {
    console.log(`Creating window: ${this.title} (${this.width}x${this.height})`);
    this.handle = {};
    return this.handle;
  }
  show() {
    console.log(`Showing window: ${this.title}`);
  }
}
module.exports = Window;
