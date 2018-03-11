var numOfSquares = 6;
var colors = []
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#messageDisplay");
var resetButton = document.querySelector("#reset");
var heading = document.querySelector("h1");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    setModeButtons();
    setSquares();
    reset();
}

/**
 * Adds Eventlisteners to the squares
 */
function setSquares() {
    for (let i = 0; i < squares.length; i++) {
        // add event listeners
        squares[i].addEventListener("click", function () {
            // grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            // compare color to pickedColor
            if (clickedColor == pickedColor) {
                messageDisplay.textContent = "Correct";
                changeColors(clickedColor);
                resetButton.textContent = "Play again";
            }
            else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again";
            }
        });
    }
}

/**
 * Handles the Mode-Buttons (hard/easy)
 */
function setModeButtons() {
    for (let i = 0; i < modeButtons.length; i++) {
        const element = modeButtons[i];
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numOfSquares = 3 : numOfSquares = 6;
            reset();
        });
    }
}

/**
 * Changes the color of all the squares to the parameter
 * @param {*rgb color} color 
 */
function changeColors(color) {
    // loop all squares
    squares.forEach(element => {
        // change each color
        element.style.backgroundColor = color;
    });
    // document.body.style.backgroundColor = color;
    heading.style.backgroundColor = color;

}

/**
 * Returns a random color from the str
 */
function pickColor() {
    var randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

/**
 * Returns an array filled with random rgb colors
 * @param {*number} arrlength 
 */
function generateRandomColors(arrlength) {
    //make an array
    var arr = [];
    //add arrlength randm colors to array
    for (let i = 0; i < arrlength; i++) {
        // get random color and push into arr
        arr.push(genRandomColor());
    }
    // return array
    return arr;
}

/**
 * Generates a random color string
 */
function genRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

/**
 * Eventhandler for Reset-Button
 */
resetButton.addEventListener("click", function(){
    reset();
});


/**
 * Resets the game 
 */
function reset(){
    colors = generateRandomColors(numOfSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    heading.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
    resetButton.textContent = "Reset";
}