let size = 16; //number of pixels per side
let numOfSquares = size * size; //total pixels
const canvasContainer = document.querySelector("#canvas-container");

/* toggle between these two for rainbow colors vs greyscale */
let colorPicker = pickGreyscale;
//let colorPicker = pickRandomColors
/* -------------------------------------------------------- */


generateCanvas();

//canvas generation
function generateCanvas() {
    for (let i = 0; i < numOfSquares; i++) {
        let squareDiv = document.createElement("div")
        squareDiv.classList.add('pixels', 'unpainted');
        canvasContainer.appendChild(squareDiv);
    }

    //CSS for formatting the canvas
    let gridFormat = `repeat(${size},1fr)`
    canvasContainer.style.gridTemplateColumns = gridFormat;
    canvasContainer.style.gridTemplateRows = gridFormat;


    //drawing listener
    let pixels = document.querySelectorAll('.pixels');

    pixels.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            if (!element.classList.contains('painted')) {
                element.classList.replace('unpainted', 'painted');
            }
            let bgColor = element.style.background;
            if (bgColor == '') {
                let lightness = 63; //7*9 is 63, so there will be room for 9 more decrements of 7
                colorPicker(element, lightness);
            }
            else {
                let lightness = parseInt(element.style.getPropertyValue("--lightness"));
                lightness = lightness - 7; //decrementing by 7 to turn color to black in 9 steps
                colorPicker(element, lightness);
            }
        }
        )
    });

}


/* ...there should be a better way to implement these two functions... */
//enable this for a monochrome pallet
function pickGreyscale(element, lightness) {
    //setting lightness as a property of each pixel div
    element.style.setProperty("--lightness", lightness);
    //using 0 in the saturation slot gets rid of the color
    element.style.background = `hsl(360,0%,${lightness}%)`;
}

//enable this for a rainbow pallet
function pickRandomColors(element, lightness) {
    element.style.setProperty("--lightness", lightness);
    element.style.background = `hsl(${getRndInteger(0, 361)},${getRndInteger(0, 101)}%,${lightness}%)`;
}
/* ------------------------------------------------------------------- */


//resize then wipe canvas
function resize() {
    getNewSize();
    rmPaint();
}

//wipe canvas
function rmPaint() {
    //loop through and remove all divs before adding them all back
    canvasContainer.querySelectorAll('.pixels').forEach(element => element.remove());
    generateCanvas();
}

//prompt user for new canvas size
function getNewSize() {
    //input defaults to the previously selected size for user convenience 
    let newSize = parseInt(prompt("How large would you like your etch-a-sketch to be?", size));
    //input validation

    while (!(typeof newSize === 'number' && newSize > 0 && newSize < 101)) {
        newSize = parseInt(prompt("Please enter a number between 1 and 100.", size));
    }
    size = newSize
    numOfSquares = size * size;
}

//random int gen from w3school
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function shakeScreen() {
    const etchCover = document.querySelector('#etch-cover');
    let rightBound = 20,
        currentPos = 0,
        numShook = 0,
        speed = 5;

    speed *= -1; //invert it because it will be inverted back on the first loop
    let animateFrames = setInterval(function () {
        if (currentPos >= rightBound || currentPos <= 0) {
            speed *= -1;
            numShook++;

            let pixels = document.querySelectorAll('.pixels');

            pixels.forEach(element => {
    
                let lightness = parseInt(element.style.getPropertyValue("--lightness"));
                if (lightness < 63) {
                    lightness = lightness + 8; //decrementing by 7 to turn color to black in 9 steps
                    colorPicker(element, lightness);
                } else {
                    element.style.background='';
                }
    
    
    
            });

        };

        if (numShook > 10) {
            clearInterval(animateFrames);
        }





        currentPos += speed;

        etchCover.style.left = `${currentPos}px`;

    }, 20)
}