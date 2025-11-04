// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  getFiles: (path) => ipcRenderer.invoke('get-files', path),
  openFile: (filePath) => ipcRenderer.invoke('open-file', filePath)
})
