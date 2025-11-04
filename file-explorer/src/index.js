const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('node:path');
const fs = require('fs')


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.setMenuBarVisibility(false);

  //dev
  // mainWindow.loadURL('http://localhost:3000');

  // prod

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle('get-files', async (event, folderPath) => {
  try {
    const files = fs.readdirSync(folderPath);

    const folders = [];
    const documents = [];

    for (const file of files) {
      const fullPath = path.join(folderPath, file);

      try {
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
          folders.push({
            name: file,
            type: 'folder',
            size: null,
            modified: stats.mtime,
          });
        } else {
          documents.push({
            name: file,
            type: 'file',
            size: stats.size, // in bytes
            modified: stats.mtime,
          });
        }
      } catch (err) {
        console.warn(`Error reading ${file}:`, err.message);
      }
    }

    // Sort folders by name, documents by size
    folders.sort((a, b) => a.name.localeCompare(b.name));
    documents.sort((a, b) => a.size - b.size);

    return { folders, documents };
  } catch (err) {
    return { error: err.message };
  }
});

ipcMain.handle('open-file', async (event, filePath) => {
  try {
    await shell.openPath(filePath);
    return { success: true };
  } catch (err) {
    return { error: err.message };
  }
});
