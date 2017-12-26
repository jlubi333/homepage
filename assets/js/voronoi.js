/*
 * Uses the following MIT-licensed library for computing the Voronoi diagram:
 *   https://github.com/gorhill/Javascript-Voronoi
 */

(function() {
  "use strict";

  // [min, max)
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function randColor() {
    var r = 200;
    var g = randInt(50, 150);
    var b = 0;
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  function point(x, y, angle) {
    return {
      "x": x,
      "y": y,
      "angle": angle
    };
  }

  function color(strokeStyle) {
    return {
      "strokeStyle": strokeStyle
    };
  }

  var ctx, bbox, points, colors;
  var previousTimestamp, delta;

  function render() {
    ctx.fillRect(0, 0, bbox.xr, bbox.yb);

    var voronoi = new Voronoi();
    var diagram = voronoi.compute(points, bbox);
    var cells = diagram.cells;

    for (var c = 0; c < cells.length; c++) {
      var edges = cells[c].halfedges;

      ctx.strokeStyle = colors[c].strokeStyle;

      ctx.beginPath();
      // closePath fills in last edge
      for (var e = 0; e < edges.length - 1; e++) {
        var edge = edges[e];
        var startpoint = edge.getStartpoint();
        var endpoint = edge.getEndpoint();

        if (e == 0) {
          ctx.moveTo(startpoint.x, startpoint.y);
        }
        ctx.lineTo(endpoint.x, endpoint.y);
      }
      ctx.closePath();

      ctx.stroke();
    }
  }

  var xSpeed = 10;
  var ySpeed = 10;
  function update(delta) {
    for (var p = 0; p < points.length; p++) {
      var angle = points[p].angle;
      var dx = Math.cos(angle) * xSpeed * delta;
      var dy = Math.sin(angle) * ySpeed * delta;
      points[p].x += dx;
      points[p].y += dy;
      points[p].angle += Math.random() - 0.5;
    }
  }

  function step(timestamp) {
    var delta = previousTimestamp ? (timestamp - previousTimestamp) / 1000 : 0;
    previousTimestamp = timestamp;

    update(delta);

    render();

    window.requestAnimationFrame(step);
  }


  window.onload = function () {
    var mainCanvas = document.getElementById("voronoi");
    mainCanvas.width = window.innerWidth;
    mainCanvas.height = window.innerHeight;

    bbox = {xl: -10, xr: mainCanvas.width + 10, yt: -10, yb: mainCanvas.height + 10};

    ctx = mainCanvas.getContext("2d");

    var grd = ctx.createLinearGradient(bbox.xr / 2, 0, bbox.xr / 2, bbox.yb);
    grd.addColorStop(0, "hsl(12, 100%, 50%)");
    grd.addColorStop(1, "hsl(12, 100%, 15%)");
    ctx.fillStyle = grd;
    ctx.lineWidth = 2;

    var N = 50;

    points = [];
    colors = [];
    for (var i = 0; i < N; i++) {
      var x = randInt(0, bbox.xr);
      var y = randInt(0, bbox.yb);
      var angle = 0;
      points.push(point(x, y, angle));

      var stroke = "rgba(0, 0, 0, 0.05)";
      colors.push(color(stroke));
    }

    window.requestAnimationFrame(step);
  }
})();
