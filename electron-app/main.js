var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;

app.on('window-all-closed', function() 
{
  if (process.platform != 'darwin')
    app.quit();
});


app.on('ready', function() 
{
  mainWindow = new BrowserWindow({
                                  "auto-hide-menu-bar": true,
                                  kiosk:false, 
                                  icon:'/images/favicon.ico',
                                  title:'Plexus! Create, Read and Compose',
                                  "web-preferences": {
                                                        "node-integration": false
                                                      },
                                  width: 800,
                                  height: 600});



	mainWindow.loadURL('http://127.0.0.1:3000/');
  //mainWindow.openDevTools();
  
  mainWindow.on('closed', function() 
  {
    mainWindow = null;
  });
});
