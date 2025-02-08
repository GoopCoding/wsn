// lib/registry.js
const ffi = require('ffi-napi');
const ref = require('ref-napi');

const advapi32 = new ffi.Library('advapi32', {
  RegOpenKeyExA: ['long', ['pointer', 'string', 'uint32', 'uint32', 'pointer']],
  RegGetValueA: ['long', ['pointer', 'string', 'string', 'uint32', 'pointer', 'pointer', 'pointer']],
  RegSetValueExA: ['long', ['pointer', 'string', 'uint32', 'uint32', 'pointer', 'uint32']],
  RegCloseKey: ['long', ['pointer']]
});
class Registry {
  static HKEY_LOCAL_MACHINE = 0x80000002;
  static HKEY_CURRENT_USER = 0x80000001;
  static readKey(hKey, path, name) {
    const keyHandle = ref.alloc('pointer');
    const result = advapi32.RegOpenKeyExA(hKey, path, 0, 0x20019, keyHandle);
    if (result !== 0) throw new Error(`Failed to open registry key: ${path}`);
    return { handle: keyHandle, value: 'registry_value' };
  }
  static writeKey(hKey, path, name, value) {
    console.log(`Writing registry key [${path}\\${name}] = ${value}`);
  }
}

module.exports = Registry;
