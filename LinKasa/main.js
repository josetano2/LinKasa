
const { app, Tray, Menu } = require('electron');

let tray = null;
app.whenReady().then(() => {
  tray = new Tray('./resources/icon.ico');

  const contextMenu = Menu.buildFromTemplate([
    { label: 't1', type: 'radio' },
    { label: 't2', type: 'radio' },
    { label: 't3', type: 'radio' },
    { label: 't4', type: 'radio' }
  ]);
  tray.setContextMenu(contextMenu);
});