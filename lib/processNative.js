const ffi = require('ffi-napi');
const ref = require('ref-napi');
const Struct = require('ref-struct-napi');
function stringToWideBuffer(str) {
  return Buffer.from(str + '\0', 'ucs2');
}
const STARTUPINFO = Struct({
  cb: ref.types.uint32,
  lpReserved: 'pointer',
  lpDesktop: 'pointer',
  lpTitle: 'pointer',
  dwX: ref.types.uint32,
  dwY: ref.types.uint32,
  dwXSize: ref.types.uint32,
  dwYSize: ref.types.uint32,
  dwXCountChars: ref.types.uint32,
  dwYCountChars: ref.types.uint32,
  dwFillAttribute: ref.types.uint32,
  dwFlags: ref.types.uint32,
  wShowWindow: ref.types.uint16,
  cbReserved2: ref.types.uint16,
  lpReserved2: 'pointer',
  hStdInput: 'pointer',
  hStdOutput: 'pointer',
  hStdError: 'pointer'
});
const PROCESS_INFORMATION = Struct({
  hProcess: 'pointer',
  hThread: 'pointer',
  dwProcessId: ref.types.uint32,
  dwThreadId: ref.types.uint32
});
const kernel32 = new ffi.Library('kernel32.dll', {
  'CreateProcessW': [
    'bool', [
      'pointer', 
      'pointer', 
      'pointer', 
      'pointer', 
      'bool',   
      'uint32',  
      'pointer', 
      'pointer', 
      STARTUPINFO.ref(), 
      PROCESS_INFORMATION.ref() 
    ]
  ]
});
function createProcessNative(exePath, args = []) {
  let commandLine = `"${exePath}"`;
  if (args.length > 0) {
  commandLine += ' ' + args.join(' ');
  }
  const lpApplicationName = stringToWideBuffer(exePath);
  const lpCommandLine = stringToWideBuffer(commandLine);
  const lpProcessAttributes = ref.NULL;
  const lpThreadAttributes = ref.NULL;
  const bInheritHandles = false;
  const dwCreationFlags = 0x00000010;
  const lpEnvironment = ref.NULL;
  const lpCurrentDirectory = ref.NULL;
  const startupInfo = new STARTUPINFO();
  startupInfo.cb = STARTUPINFO.size;
  const processInformation = new PROCESS_INFORMATION();
  const success = kernel32.CreateProcessW(
    lpApplicationName,
    lpCommandLine,
    lpProcessAttributes,
    lpThreadAttributes,
    bInheritHandles,
    dwCreationFlags,
    lpEnvironment,
    lpCurrentDirectory,
    startupInfo.ref(),
    processInformation.ref()
  );
  if (!success) {
    const err = new Error('CreateProcessW failed');
    err.code = ffi.errno();
    throw err;
  }
  return {
    processHandle: processInformation.hProcess,
    threadHandle: processInformation.hThread,
    processId: processInformation.dwProcessId,
    threadId: processInformation.dwThreadId
  };
}
module.exports = {
  createProcessNative,
  stringToWideBuffer,
  STARTUPINFO,
  PROCESS_INFORMATION
};
