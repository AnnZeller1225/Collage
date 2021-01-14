//  imageBox.style.transform = `rotate(${degree}deg)`;
let degree = 0;
let width = 150;


// получить начальную позицию мыши, конечную, 
let rotateBtnIsMousedown = false;
let mouseCoordCurrent = {
    x: 0,
    y: 0,
}
const mouseCoordStarted = {
    x: 0,
    y: 0,
}

let getMouseCoordin = (event, mouseData) => {
    mouseCoordCurrent = {
        x:  event.clientX,
        y:  event.clientY,
    }

}

const getDegree = (event, imageBox) => {

    if (rotateBtnIsMousedown) {
        getMouseCoordin(event);
        // console.log(event.pageX, event.pageY);
        // console.log(mouseCoordCurrent)


        calculateDegree(mouseCoordStarted, mouseCoordCurrent);

//  imageBox.style.transform = `rotate(${degree}deg)`;
imageBox.style.transform = `rotate(${degree}deg)`;


    }
}

const calculateDegree = (startMouseData, finishMouseData) => {
    let resultY =( startMouseData.y - finishMouseData.y ) ;
    console.log(degree );
    degree = resultY;

}
const test = (event, imageBox) => {
    rotateBtnIsMousedown = true;
// запоминаем начальные значения мыши 

    mouseCoordStarted.x = event.clientX;
    mouseCoordStarted.y = event.clientY;
    // getDegree(event);


}
const rotate = (imageBox) => {
    const rotateBtn = imageBox.querySelector('.rotate');
    // rotateBtn.addEventListener('mousedown', (event) => test(event, imageBox));
    rotateBtn.addEventListener('mousedown', (event) => test(event, imageBox));
    document.documentElement.addEventListener('mousemove', (event) => getDegree(event, imageBox));
    document.onmouseup = function () {
        rotateBtnIsMousedown = false;
        // плучим угол?
     
      };

}