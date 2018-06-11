// {lat: 50.1250891, lng: 8.5083272}
function bezier(startPoint, endPoint, ctrlPoint, n) {
  var points = [];
  for (var i = 0; i <= n; i++) {
    var p1 = calcBezierPoint(startPoint, ctrlPoint, i / n);
    var p2 = calcBezierPoint(ctrlPoint, endPoint, i / n);
    points.push(calcBezierPoint(p1, p2, i / n));
  }
  return points;
}

function calcBezierPoint(startPoint, endPoint, n) {
  return {
    lat: (endPoint.lat - startPoint.lat) * n + startPoint.lat,
    lng: (endPoint.lng - startPoint.lng) * n + startPoint.lng
  }
}

// curvature: int 0-100
function calcCtrlPoint(startPoint, endPoint, curvature) {
  var end = {
    lat: endPoint.lat - startPoint.lat,
    lng: endPoint.lng - startPoint.lng
  };
  var mid = {
    lat: end.lat / 2,
    lng: end.lng / 2,
  };
  var cross = {
    lat: - end.lng,
    lng: end.lat
  };
  var increase = {
    lat: mid.lat + cross.lat * curvature / 100,
    lng: mid.lng + cross.lng * curvature / 100
  };
  return {
    lat: startPoint.lat + increase.lat,
    lng: startPoint.lng + increase.lng,
  };
}

function randomMN(m,n){
  return Math.floor(Math.random()*(n-m+1)) + m;
}

function generateBezierPoints(startPoint, endPoint, n) {
  console.log(bezier(startPoint, endPoint, calcCtrlPoint(startPoint, endPoint, randomMN(5, 30)), n));
  return bezier(startPoint, endPoint, calcCtrlPoint(startPoint, endPoint, randomMN(5, 30)), n);
}

generateBezierPoints({
  lat: 0,
  lng: 0
},{
  lat: 10,
  lng: 10
}, 10)













