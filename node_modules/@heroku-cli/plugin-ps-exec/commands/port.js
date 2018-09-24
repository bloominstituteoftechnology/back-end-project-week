'use strict';

const child = require('child_process');
const path = require('path');
const cli = require('heroku-cli-util');
const exec = require('heroku-exec-util');
const https = require('https')
const http = require('http')
const fs = require('fs')
const co = require('co');
const socks = require('@heroku/socksv5')
var net = require("net");

module.exports = function(topic, command) {
  return {
    topic: topic,
    command: command,
    description: 'Forward traffic on a local port to a dyno',
    help: `Example:

    $ heroku ps:forward 8080 --app murmuring-headland-14719`,
    args: [{name: 'port', optional: false}],
    flags: [
      { name: 'dyno', char: 'd', hasValue: true, description: 'specify the dyno to connect to' },
      { name: 'localPort', char: 'p', hasValue: true, description: 'the local port to use' } ],
    needsApp: true,
    needsAuth: true,
    run: cli.command(co.wrap(run))
  }
};

function * run(context, heroku) {
  yield exec.initFeature(context, heroku, function *(configVars) {
    let remotePort = context.args.port;
    let localPort = context.flags.localPort || remotePort;

    yield exec.createSocksProxy(context, heroku, configVars, function(dynoIp, dynoName, socksPort) {
      cli.log(`Listening on ${cli.color.white.bold(localPort)} and forwarding to ${cli.color.white.bold(`${dynoName}:${remotePort}`)}`)
      cli.log(`Use ${cli.color.magenta('CTRL+C')} to stop port fowarding`)
      net.createServer(function(connIn) {
        socks.connect({
          host: '0.0.0.0',
          port: remotePort,
          proxyHost: '127.0.0.1',
          proxyPort: socksPort,
          auths: [ socks.auth.None() ]
        }, function(socket) {
          connIn.pipe(socket);
          socket.pipe(connIn);
        });
      }).listen(localPort);
    });
  });
  return new Promise(resolve => {})
}
