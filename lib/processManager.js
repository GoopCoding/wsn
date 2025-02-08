const ffi = require('ffi-napi');
const ref = require('ref-napi');
const { spawn } = require('child_process');
const PROCESS_ALL_ACCESS = 0x001F0FFF;
const kernel32 = new ffi.Library('kernel32.dll', {
  OpenProcess: ['pointer', ['uint32', 'bool', 'uint32']],
  TerminateProcess: ['bool', ['pointer', 'uint32']],
  SetProcessPriorityClass: ['bool', ['pointer', 'uint32']],
  CloseHandle: ['bool', ['pointer']]
});
class ProcessManager {
  static openProcess(pid, access = PROCESS_ALL_ACCESS) {
    const handle = kernel32.OpenProcess(access, false, pid);
    if (ref.isNull(handle)) {
      throw new Error(`Failed to open process ${pid}`);
    }
    return handle;
  }
  static terminate(pid) {
    const handle = this.openProcess(pid);
    const result = kernel32.TerminateProcess(handle, 0);
    kernel32.CloseHandle(handle);
    return result;
  }
  static setPriority(pid, priority) {
    const handle = this.openProcess(pid);
    const result = kernel32.SetProcessPriorityClass(handle, priority);
    kernel32.CloseHandle(handle);
    return result;
  }
  static createProcess(exePath, args = []) {
    console.log(`Creating process for ${exePath} with args ${args.join(' ')}`);
    const child = spawn(exePath, args, { detached: true, stdio: 'ignore' });
    child.unref();
    console.log(`Process started with PID ${child.pid}`);
    return child;
  }
}
module.exports = ProcessManager;
