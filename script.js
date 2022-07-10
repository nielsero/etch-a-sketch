// dom elements
const sketchSection = document.querySelector('.sketch-section');
const defaultButton = document.querySelector('.default-btn');
const resetButton = document.querySelector('.reset-btn');
const eraseButton = document.querySelector('.erase-btn');
const randomButton = document.querySelector('.random-btn');
const slider = document.querySelector('.slider');
const sliderValue = document.querySelector('.slider-value');

// Initial values
let numSquares = 25;
let active = "default";

// adding items to the grid container
let grid = gridMaker(numSquares * numSquares);
addGrid(sketchSection, grid);

// adding listeners
defaultButton.addEventListener('click', clickedDefault);
resetButton.addEventListener('click', resetGrid);
randomButton.addEventListener('click', clickedRandom);
eraseButton.addEventListener('click', clickedErase);
slider.addEventListener('change', handleSliderChange);



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

// updates slider value
function updateSliderValue(value) {
    const newText = `${value} x ${value}`;
    sliderValue.textContent = newText;
}

// change background color for the active button
function changeActive(newActive) {
    if(active === newActive) {
        return; // do nothing
    }
    active = newActive;

    // reset buttons background colors
    defaultButton.classList.remove('active');
    randomButton.classList.remove('active');
    eraseButton.classList.remove('active');

    if(newActive == "default") {
        defaultButton.classList.add('active');
        return;
    }
    if(newActive == "random") {
        randomButton.classList.add('active');
        return;
    }
    // Not default nor random = erase
    eraseButton.classList.add('active');
}

/* =============== EVENT LISTENERS =================== */
// updates slider value
function handleSliderChange(e) {
    const value = e.target.value;
    updateSliderValue(value);
    numSquares = value;
    changeGridSize();
}

// reset all the grid items
function resetGrid(e) {
    removeGrid(sketchSection, grid);
    grid = gridMaker(numSquares * numSquares);
    addGrid(sketchSection, grid);
    changeActive("default");
}

// creating new grid
function changeGridSize() {
    removeGrid(sketchSection, grid);
    sketchSection.setAttribute('style', `grid-template-columns: repeat(${numSquares}, 1fr)`);
    grid = gridMaker(numSquares * numSquares);
    addGrid(sketchSection, grid);
}

function clickedDefault(e) {
    changeActive("default");

    for(let i=0; i<grid.length; i++) {
        grid[i].removeEventListener('mouseover', paintRandom);
        grid[i].removeEventListener('mouseover', eraseGrid);
        grid[i].addEventListener('mouseover', paintGridItem);
    }

    addGrid(sketchSection, grid);
}

function clickedRandom(e) {
    changeActive("random");

    for(let i=0; i<grid.length; i++) {
        grid[i].removeEventListener('mouseover', paintGridItem); 
        grid[i].removeEventListener('mouseover', eraseGrid);
        grid[i].addEventListener('mouseover', paintRandom);
    }

    addGrid(sketchSection, grid);
}

function clickedErase(e) {
    changeActive("erase");

    for(let i=0; i<grid.length; i++) {
        grid[i].removeEventListener('mouseover', paintGridItem); 
        grid[i].removeEventListener('mouseover', paintRandom);
        grid[i].addEventListener('mouseover', eraseGrid);
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
    this.setAttribute('style', 'background-color: black');
}

// to erase grid
function eraseGrid(e) {
    this.setAttribute('style', 'background-color: lightgray');
}