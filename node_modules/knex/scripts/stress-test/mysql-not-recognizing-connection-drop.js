const toxiproxy = require('toxiproxy-node-client');
const toxicli = new toxiproxy.Toxiproxy('http://localhost:8474');
const rp = require('request-promise-native');
const Bluebird = require('bluebird');

const knex = require('../../lib')({
  client: 'mysql2',
  connection: 'mysql://root:mysqlrootpassword@localhost:23306/?charset=utf8',
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 100,
    reapIntervalMillis: 100
  }
});

async function main () {
  await recreateProxy('mysql', 23306, 3306);
  try {
    console.log('select 1');
    await knex.raw('select 1');
    console.log('waiting 5 secs for pool to discard connection');
    await Bluebird.delay(5000 * 1);
    console.log('closing connection by proxy');
    await recreateProxy('mysql', 23306, 3306); // cut connection router level
    console.log('waiting again 5 secs just for fun');
    await Bluebird.delay(5000 * 1);
    console.log('select 1');
    await knex.raw('select 1');
  } catch (e) {
    console.log(e);
  }
}

main().then(async () => {
  console.log('Main ended with success');
  await knex.destroy();
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.log('Unhandled Exception!', err);
});


async function recreateProxy(serviceName, listenPort, proxyToPort) {
  try {
    await rp.delete({
      url: `${toxicli.host}/proxies/${serviceName}`
    });  
  } catch(err) {}

  const proxy = await toxicli.createProxy({
    name: serviceName,
    listen: `0.0.0.0:${listenPort}`,
    upstream: `${serviceName}:${proxyToPort}`
  });
}
