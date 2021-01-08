

const resizing = (imageBox)=> {
  const rbCorner = imageBox.querySelector(".square__corner--rb");
  const lbCorner =  imageBox.querySelector(".square__corner--lb");
  const ltCorner =  imageBox.querySelector(".square__corner--lt");
  const rtCorner =  imageBox.querySelector(".square__corner--rt");


  rbCorner.addEventListener("mousedown",  initDrag, false);
  rtCorner.addEventListener("mousedown", initDrag, false);
  lbCorner.addEventListener("mousedown", initDrag, false);

  var startX, startY, startWidth, startHeight;
  
  function initDrag(e) {
    let target = e.currentTarget;
    console.log('initDrag');
    
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(document.defaultView.getComputedStyle(imageBox).width, 10);
      startHeight = parseInt(
        document.defaultView.getComputedStyle(imageBox).height,
        10
      );
    if (target.classList.contains('square__corner--rb')) {
 
      document.documentElement.addEventListener("mousemove", doDrag, false); // здесь делать условие куда двигать 
      document.documentElement.addEventListener("mouseup", stopDrag, false);
    }
    if (target.classList.contains('square__corner--lb')) {
      document.documentElement.addEventListener("mousemove", doDragLeft, false); 
      document.documentElement.addEventListener("mouseup", stopDragLeft, false);
    }
 
  }
  
  function doDrag(e) {
    console.log( 'do drag ')

    imageBox.style.maxWidth = startWidth + e.clientX - startX + "px";
    let imageBoxImg = imageBox.querySelector('img');

    //  работает для нижнего правого
    imageBoxImg.style.height = startHeight + e.clientY - startY - 20 + "px";

    // console.log('начальная высота ', startHeight, " высота по Y курсора ", e.clientY, "старт по Унаверное ", startY, ' итого ',  imageBoxImg.style.height );
  
  }
  
  function stopDrag(e) {
    console.log(' stop')
    document.documentElement.removeEventListener("mousemove", doDrag, false);
    document.documentElement.removeEventListener("mouseup",stopDrag, false);
  }



  function doDragLeft(e) {
    console.log( ' doDragLeft')
    let imageBoxImg = imageBox.querySelector('img');

    imageBox.style.maxWidth = startWidth - e.clientX + startX + "px";

    imageBoxImg.style.height = startHeight + e.clientY - startY - 20 + "px";

    // console.log('начальная высота ', startHeight, " высота по Y курсора ", e.clientY, "старт по Унаверное ", startY, ' итого ',  imageBoxImg.style.height );
  
  }
  
  function stopDragLeft(e) {
    console.log(' stop drug left ')
    document.documentElement.removeEventListener("mousemove", doDragLeft, false);
    document.documentElement.removeEventListener("mouseup",stopDragLeft, false);
  }






}


