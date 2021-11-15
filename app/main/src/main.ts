// Modules to control application life and create native browser window
import { app, BrowserWindow, dialog, ipcMain } from "electron";
import * as path from "path";

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs')
        }
    })

    const url = (import.meta.env.MODE === 'development' && import.meta.env.VITE_DEV_SERVER_URL !== undefined
        ? `${import.meta.env.VITE_DEV_SERVER_URL}`
        : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString()) || '';

    mainWindow.loadURL(url)

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('show-message-box', async (event, arg) => {
    const result = await dialog.showMessageBox({ message: arg.message });
    event.reply('show-message-box-response', result);
})
