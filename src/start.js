var forever = require('forever-monitor');
var child = new (forever.Monitor)('./index.js', {
    max: 999,
    silent: true,
    args: []
});
child.on('exit', function () {
    console.log('index.js has exited after 99 restarts');
});
child.start();
