let gridNode = document.querySelector("div");
const width = 30;
const height = 15;
let checkboxes = [];

function createCheckBoxes(grid){
    for(let i = 0 ; i < height ; i++){
        for ( let j = 0 ; j < width ; j++){
            let box = document.createElement("input");
            box.type = "checkbox"
            gridNode.appendChild(box);
            checkboxes.push(box);
        }
        gridNode.appendChild(document.createElement("br"));
    }
}


function randomGrid(){
    let result = []
    for(let i = 0 ; i < height * width ; i ++){
        result.push(Math.random() < 0.5);
    }
    return result;
}

function gridToCheckBoxes(grid){
    grid.forEach((value,i) => checkboxes[i].checked = value);
}

function checkBoxesToGrid(){
    return checkboxes.map(box => box.checked)
}

function countNeighbour(grid,x,y){
    let count = 0;
    for(let y1 = Math.max(0 , y - 1) ; y1 <= Math.min(height - 1 , y + 1) ; y1++){
        for(let x1 = Math.max(0 , x - 1); x1 <= Math.min(width - 1 , x + 1) ; x1++){
            if((x1 != x || y1 != y) && grid[x1 + y1 * width] ){
                count ++;
            }
        }
    }
    return count;
}

function nextGeneration(grid){
    let newGrid = new Array(height * width);
    for(let y = 0 ; y < height ; y ++){
        for(let x = 0 ; x < width ; x++){
            let neighbour = countNeighbour(grid,x,y);
            let offset = x + y * width;
            if(neighbour < 2 || neighbour > 3){
                newGrid[offset] = false;
            }
            else
            if(neighbour == 2){
                newGrid[offset] = grid[offset] ;
            }else{
                //tiene 3 celdas vivas colindantes
                newGrid[offset] = true;
            }
        }
    }
    return newGrid;
}


createCheckBoxes();
gridToCheckBoxes(randomGrid());

function turn(){
    gridToCheckBoxes(nextGeneration(checkBoxesToGrid()));
}

let next = document.querySelector("#next");
next.addEventListener("click", turn);


let run = document.querySelector("#run");
let running = null;
run.addEventListener("click", event =>{
    if(running){
        clearInterval(running);
        running = null;
    }
    else{
        running = setInterval(turn,400);
    }

})