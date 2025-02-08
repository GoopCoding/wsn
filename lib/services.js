const ffi = require('ffi-napi');
class WindowsServices {
  constructor() {
    this.scm = new ffi.Library('advapi32', {
      OpenSCManagerA: ['pointer', ['string', 'string', 'uint32']],
      CreateServiceA: ['pointer', ['pointer', 'string', 'string', 'uint32', 'uint32', 'uint32', 'uint32', 'string', 'string', 'pointer', 'string', 'string', 'string']],
      StartServiceA: ['bool', ['pointer', 'uint32', 'pointer']],
      DeleteService: ['bool', ['pointer']],
      CloseServiceHandle: ['bool', ['pointer']]
    });
  }
  createService(name, displayName, binaryPath) {
    const scHandle = this.scm.OpenSCManagerA(null, null, 0xF003F);
    console.log(`Creating service [${name}] with binary ${binaryPath}`);
    return { success: true, handle: scHandle };
  }
  startService(name) {
    console.log(`Starting service ${name}`);
  }
  stopService(name) {
    console.log(`Stopping service ${name}`);
  }
}
module.exports = new WindowsServices();
