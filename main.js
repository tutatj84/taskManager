const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
  createWindow();
})

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  mainWindow.webContents.openDevTools();
  mainWindow.setMenu(null);
  mainWindow.loadFile('index.html');
 
    app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
  app.on('window-all-closed', ()=>{
    if (process.platform !== 'darwin') {
      app.quit();
    }
  })

}