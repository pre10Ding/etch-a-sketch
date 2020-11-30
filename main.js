let size = 16;
let numOfSquares = size * size;
const canvasContainer = document.querySelector("#canvas-container");

generateCanvas();



//canvas generation
function generateCanvas() {
    for (let i = 0; i < numOfSquares; i++) {
        let squareDiv = document.createElement("div")
        squareDiv.classList.add('pixels', 'unpainted');
        canvasContainer.appendChild(squareDiv);
    }

    //formatting the canvas
    let gridFormat = `repeat(${size},1fr)`
    canvasContainer.style.gridTemplateColumns = gridFormat;
    canvasContainer.style.gridTemplateRows = gridFormat;


//drawing listener
let pixels = document.querySelectorAll('.pixels');
pixels.forEach(element => {
    element.addEventListener('mouseenter', (e) => {
        console.log(element);
        element.classList.remove('unpainted');
        element.classList.add('painted');
    }
    )
});

}

//reset wipe canvas
function rmPaint() {
    getNewSize();

    canvasContainer.querySelectorAll('.pixels').forEach(element => element.remove());

    generateCanvas();

}

//prompt user for new canvas size
function getNewSize() {
    size = parseInt(prompt("How large would you like your etch-a-sketch to be?", '1-100'));
    console.log(size)
    while (!(typeof size === 'number' && size > 0 && size < 101)) {
        console.log(size)

        size = parseInt(prompt("Please enter a number between 1 and 100.", '1-100'));
    }

    numOfSquares = size * size;
}
