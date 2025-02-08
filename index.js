const ProcessManager = require('./lib/processManager');
const ProcessNative = require('./lib/processNative');
const MemoryManager = require('./lib/memoryManager');
const Registry = require('./lib/registry');
const Services = require('./lib/services');
const Network = require('./lib/network');
const Desktop = require('./lib/gui/desktop');
const WebBrowser = require('./lib/gui/browser');
const Controls = require('./lib/gui/controls');
const Drivers = require('./lib/drivers');
const Explorer = require('./explorer');
module.exports = {
  ProcessManager,
  ProcessNative,
  MemoryManager,
  Registry,
  Services,
  Network,
  Desktop,
  WebBrowser,
  Controls,
  Drivers,
  Explorer
};
