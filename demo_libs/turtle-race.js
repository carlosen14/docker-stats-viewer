var config = {
  seconds : true,
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
 
var turtle = require('turtle-race')(config);
 
turtle.metric("one").push(5.4);  // metric without group
turtle.metric("nginx", "cpu").push(5.4); // metric with group
turtle.metric("nginx", "cpu").push(5.4).color("red,bold"); // fluent api
 
var metric = turtle.metric("nginx", "cpu");
metric.push(5.4);
metric.mark("▼");  // marker above graph
metric.mark({ symbol:"▼", color: "yellow,bold" }); // styled marker
metric.vline("white"); // vertical line
