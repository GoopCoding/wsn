const Window = require('./window');
class WebBrowser extends window {
  constructor() {
    super('WSN Browser', 1024, 768);
    this.controller = null;
    this.initBrowser();
  }
  initBrowser() {
    console.log('Initializing WebView2 browser...');
    this.controller = { initialized: true };
  }
  navigate(url) {
    console.log(`Navigating browser to ${url}`);
  }
}
module.exports = WebBrowser;
