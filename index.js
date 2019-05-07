var config = {
  seconds: true,
  interval: 500,
  keep: true,
  pattern: "[^-]*-(.*)",
  metrics: {
    one: {
      aggregator: "growth",
      color: "yellow,bold"
    }
  }
}

var stats = require('docker-stats');
var through = require('through2');
var turtle = (require('turtle-race'))(config);
stats({ statsinterval: 1 }).pipe(through.obj(function (container, enc, cb) {
  turtle.metric(container.name, `CPU (limit ${container.stats.cpu_stats.online_cpus} cpus)`)
    .push(container.stats.cpu_stats.cpu_usage.cpu_percent);

  // turtle.metric(container.name, `RAM (limit ${parseFloat(container.stats.memory_stats.limit / (1 * 1000 * 1000 * 1000)).toFixed(2)} GB)`)
  //   .push(container.stats.memory_stats.usage);
  return cb();
}));
