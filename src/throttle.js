// @see https://stackoverflow.com/a/59378445
export default function throttle(func, timeFrame) {
  var lastTime = 0;
  return function () {
      var now = Date.now();
      if (now - lastTime >= timeFrame) {
          func();
          lastTime = now;
      }
  };
}
