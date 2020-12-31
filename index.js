const {app, BrowserWindow} = require('electron');

//const production = !process.env.ELECTRON_RELOAD;

//if (!production) {
	const path = require('path');
	require('electron-reload')(__dirname, {
		electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
		awaitWriteFinish: true,
	});
//}

let mainWindow;

function createWindow () {
	mainWindow = new BrowserWindow({
		width: 1440,
		height: 900,
		webPreferences: {
			nodeIntegration: true
		},
		icon: 'icon.png'
	});

	mainWindow.setMenu(null);

	mainWindow.loadFile('public/index.html');

	mainWindow.on('closed', function () {
		mainWindow = null
	});
	
	mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
})

app.on('activate', function () {
	if (mainWindow === null) createWindow();
})
