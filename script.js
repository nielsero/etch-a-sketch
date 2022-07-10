// dom elements
const sketchSection = document.querySelector('.sketch-section');
const defaultButton = document.querySelector('.default-btn');
const resetButton = document.querySelector('.reset-btn');
const sizeButton = document.querySelector('.size-btn');
const randomButton = document.querySelector('.random-btn');

let numSquares = 10;

// adding items to the grid container
let grid = gridMaker(numSquares*numSquares);
addGrid(sketchSection, grid);

// adding listeners to the buttons
defaultButton.addEventListener('click', clickedDefault);
resetButton.addEventListener('click', resetGrid);
sizeButton.addEventListener('click', changeGridSize);
randomButton.addEventListener('click', clickedRandom);


/* ================ DOM MANIPULATION FUNCTIONS ================ */
// creates an array of divs
function gridMaker(numElements) {
    const grid = [];
    for(let i=0; i<numElements; i++) {
        grid[i] = document.createElement('div');
        grid[i].classList.add('grid-item');
        grid[i].classList.add('blank');
        grid[i].addEventListener('mouseover', paintGridItem);
    }
    return grid;
}

// adds elements from grid array to a container
function addGrid(gridContainer, grid) {
    for(let i=0; i<grid.length; i++) {
        gridContainer.appendChild(grid[i]);
    }
}

// removes grid from container
function removeGrid(gridContainer, grid) {
    for(let i=0; i<grid.length; i++) {
        gridContainer.removeChild(grid[i]);
    }
}

/* =============== EVENT LISTENERS =================== */
// reset all the grid items
function resetGrid(e) {

    removeGrid(sketchSection, grid);
    grid = gridMaker(numSquares*numSquares);

    addGrid(sketchSection, grid);
}

// creating new grid
function changeGridSize(e) {
    let prevNumSquares = numSquares;
    numSquares = Number(prompt('How many squares per line'));

    if(!isNaN(numSquares) && numSquares>0 && numSquares<=100) {
        removeGrid(sketchSection, grid);

        sketchSection.setAttribute('style', `grid-template-columns: repeat(${numSquares}, 1fr)`);

        grid = gridMaker(numSquares*numSquares);
        addGrid(sketchSection, grid);
    } else {
        numSquares = prevNumSquares;
    }
}

function clickedDefault(e) {

    for(let i=0; i<grid.length; i++) {
        grid[i].removeEventListener('mouseover', paintRandom); 
        grid[i].addEventListener('mouseover', paintGridItem);
    }

    addGrid(sketchSection, grid);
}

function clickedRandom(e) {

    for(let i=0; i<grid.length; i++) {
        grid[i].removeEventListener('mouseover', paintGridItem); 
        grid[i].addEventListener('mouseover', paintRandom);
    }

    addGrid(sketchSection, grid);
}

function paintRandom(e) {
    let r,g,b;
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);

    this.setAttribute('style', `background-color: rgb(${r},${g},${b})`);
}

// change grid item bg color
function paintGridItem(e) {

    // had to change attribute directly because paintRandom() does the same
    this.setAttribute('style','background-color: black');
}