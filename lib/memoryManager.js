const ffi = require('ffi-napi');
const ref = require('ref-napi');

const MEM_COMMIT = 0x1000;
const MEM_RELEASE = 0x8000;
const PAGE_READWRITE = 0x04;

class MemoryManager {
  constructor() {
    this.allocations = new Map();
    this.kernel32 = new ffi.Library('kernel32.dll', {
      VirtualAlloc: ['pointer', ['pointer', 'size_t', 'uint32', 'uint32']],
      VirtualFree: ['bool', ['pointer', 'size_t', 'uint32']],
      VirtualProtect: ['bool', ['pointer', 'size_t', 'uint32', 'pointer']]
    });
  }
  allocate(size) {
    const address = this.kernel32.VirtualAlloc(null, size, MEM_COMMIT, PAGE_READWRITE);
    if (ref.isNull(address)) {
      throw new Error('Memory allocation failed');
    }
    this.allocations.set(address, size);
    return address;
  }
  free(address) {
    if (!this.allocations.has(address)) {
      throw new Error('Invalid memory address');
    }
    const result = this.kernel32.VirtualFree(address, 0, MEM_RELEASE);
    if (result) {
      this.allocations.delete(address);
    }
    return result;
  }
}
module.exports = new MemoryManager();
