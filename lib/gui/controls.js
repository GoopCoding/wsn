class Controls {
  static Button(parent, text, x, y, width, height) {
    console.log(`Creating Button [${text}] at (${x}, ${y}) in window [${parent.title}] with size (${width}x${height})`);
    return { type: 'button', text, x, y, width, height, parent };
  }
  static TextBox(parent, x, y, width, height) {
    console.log(`Creating TextBox at (${x}, ${y}) in window [${parent.title}] with size (${width}x${height})`);
    return { type: 'textbox', x, y, width, height, parent };
  }
  static ListView(parent, x, y, width, height) {
    console.log(`Creating ListView at (${x}, ${y}) in window [${parent.title}] with size (${width}x${height})`);
    return { type: 'listview', x, y, width, height, parent };
  }
}
module.exports = Controls;
