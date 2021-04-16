var forever = require('forever-monitor');
var child = new (forever.Monitor)('./index.js', {
    max: 999,
    silent: false,
    args: []
});
child.on('exit', function () {
    console.log('index.js has exited after 999 restarts');
});
child.start();
