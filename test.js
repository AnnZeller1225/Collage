// // Generated by CoffeeScript 1.6.3
// const testFunc =(imageBox) =>  {
//     const rotateBtn = imageBox.querySelector('.rotate');

//     // var R2D, active, angle, center, rotate, rotation, start, startAngle, stop;
//   let R2D;
//   let active = false;
  
//     angle = 0;
//     rotation = 0;
//     startAngle = 0;
//     center = {
//       x: 0,
//       y: 0
//     };
  
//     document.ontouchmove = function(e) {
//       return e.preventDefault();
//     };
  
  
     
   
  
//     R2D = 180 / Math.PI;
  
//     start = function(e) {
//       var height, left, top, width, x, y, _ref;
//       e.preventDefault();
//       _ref = imageBox.getBoundingClientRect(), top = _ref.top, left = _ref.left, height = _ref.height, width = _ref.width;
//       center = {
//         x: left + (width / 2),
//         y: top + (height / 2)
//       };
//       x = e.clientX - center.x;
//       y = e.clientY - center.y;
//       startAngle = R2D * Math.atan2(y, x);
//     //   console.log(_ref, 'its this')
//       return active = true;
//     };
  
//     rotate = function(e) {
//       var d, x, y;
//       e.preventDefault();
//       x = e.clientX - center.x;
//       y = e.clientY - center.y;
//       d = R2D * Math.atan2(y, x);
//       rotation = d - startAngle;
//       if (active) {
//         return imageBox.style.webkitTransform = "rotate(" + (angle + rotation) + "deg)";
//       }
//     };
  
//     stop = function() {
//       angle += rotation;
//       return active = false;
//     };
  
//     // init();

//     rotateBtn.addEventListener("mousedown", start, false);
//     document.documentElement.addEventListener("mousemove", rotate, false);
//     document.addEventListener("mouseup", stop, false);
  
//   }
