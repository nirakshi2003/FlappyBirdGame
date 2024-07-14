//canvas
let board;          //represents the html canvas element
let boardwidth=360; //the bg image is 360*640 so...
let boardheight=640;
let context;        //used to draw on the canvas

//bird
let birdwidth=34;           //width/height ratio = 408/228 = 17/12
let birdheight=24;
let birdx=boardwidth/8;     //(x, y) position of the bird initially
let birdy=boardheight/2;
let birdimage;              //holds the bird image

let bird = {            //object representing the bird with its position and size
    x: birdx,           //x position of the bird
    y: birdy,           //y position of the bird
    width: birdwidth,   //width of the bird
    height: birdheight  //height of the bird
}

//pipes
let pipearray=[];       //array to hold the pipe
let pipewidth=64;       //width and height dimensions of the pipe
let pipeheight=512;     //width/height ratio = 384/3072 = 1/8
let pipex=boardwidth;   //initial (x,y) position of the pipes
let pipey=0;

let toppipeimg;         //holds the top pipe image
let bottompipeimg;      //holds the botttom pipe image

//game physics and state
let velocityx = -2; //speed at which pipes move left
let velocityy = 0;  //speed at which the bird jumps
let gravity = 0.4;  //the force/gravity pulling the bird down

let gameover=false; //flag to indicate the game is over
let score = 0;      //player's score

window.onload=function(){
    //get the canvas element and set its dimensions
    board=document.getElementById("board"); //retrieves the canvas html element with the id 'board' and set its width and height properties.
    board.height=boardheight;               //this sets up the area where the game graphics will be drawn
    board.width=boardwidth;

    //used for drawing on the board
    context=board.getContext("2d"); //get the 2d rendering context of the canvas

    //drawing a rectangle for the initial position of the bird (not necessary in final version)
    //context.fillStyle = "transparent";
    //context.fillRect(bird.x, bird.y, bird.width, bird.height);

    //load bird image
    birdimage=new Image();              //new image object
    birdimage.src="./flappybird.png";   //sets its 'src' attribute to the file path of the bird image
    //once the bird image is loaded, draw it on the canvas
    birdimage.onload=function(){                                                //once the image is fully loaded
        context.drawImage(birdimage, bird.x, bird.y, bird.width, bird.height);  //draw the bird image onto the canvas at its initial position (bird.x, bird.y) with specified dimensions (bird.width, bird.height)
    }

    //load images for the top pipe
    toppipeimg = new Image();
    toppipeimg.src = "./toppipe.png";
    //load images for the bottom pipe
    bottompipeimg = new Image();
    bottompipeimg.src = "./bottompipe.png";

    //start the animation loop for updating the game
    requestAnimationFrame(update);      //schedules a repaint of the canvas for the next animation frame, allowing smooth animation updates
    //set an interval to place new pipes every 1.5 seconds
    setInterval(placePipes, 1500); //calls the placePipes function every 1500ms, that generates and places new pairs of pipes on the canvas, simulating the continuous movement of obstacles in the game
    document.addEventListener("keydown", movebird);    //to make the bird jump in keyboard input 
    document.addEventListener("mousedown", movebird); //to make the bird jump in mouse click
}

//for updating the frames of the canvas over and over again
function update(){
    requestAnimationFrame(update);  //schedules the update function to be called before the next repaint, creating a loop for the game to continuosly update and render frames

    if (gameover){      //if the game is over, the function returns early and stops updating the game state and rendering
        return;
    }
    context.clearRect(0, 0, board.width, board.height); //clears the entire canvas to prepare it for the next frame, ensuring no remnants of the previous frame are visible

    //bird drawing
    velocityy += gravity;                     //increases the bird's vertical velocity by adding gravity, simulating the downward pull  
    bird.y = Math.max(bird.y + velocityy, 0); //updates the bird's vertical position by adding the vertical velocity, Math.max function ensures the bird doesn't go above the top edge of the canvas
    context.drawImage(birdimage, bird.x, bird.y, bird.width, bird.height);  //draws the bird at its new position

    if (bird.y > board.height){ //if the bird's vertical position goes beyond the bottom edge of the canvas, the game is marked as over
        gameover=true;
    }

    //pipes
    for (let i = 0; i < pipearray.length; i++) {    //iterates through all pipes in the pipearray
        let pipe=pipearray[i];
        pipe.x += velocityx;    //moves each pipe to the left by adding velocityx to its horizontal position
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);   //draws each pipe at its new position
        
        if (!pipe.passed && bird.x > pipe.x + pipe.width){      //checks if the bird has passed a pipe
            score += 0.5;       //if true, increments the score by 0.5 (because each pair of pipes should add 1 to the score) and marks the pipe as passed
            pipe.passed=true;
        }

        if (detectcollision(bird, pipe)){   //checks if the bird has collided with a pipe. If true, the game is marked as over
            gameover=true;
        }
    }

    //clear off-screen pipes
    while(pipearray.length > 0 && pipearray[0].x < -pipewidth){ //r Removes pipes that have moved off the left edge of the canvas from pipearray to free up memory and keep the array manageable
        pipearray.shift(); //removes first element from the array
    }

    //score
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameover){
        context.fillText("GAME OVER!", 5, 90);  //if the game is over, it displays the "GAME OVER!" message below the score
    }
}

function placePipes() {
    if (gameover){  //if the game is over, the function returns early and stops placing new pipes
        return;
    }

    let randompipey= pipey - pipeheight/4 - Math.random()*(pipeheight/2); //shifting the pipe upwards by512/4 = 128px upward, so 3/4th of the pipe is visiblw
    //calculates a random vertical position for the top pipe. This is done to vary the gap's vertical position between the top and bottom pipes
    //pipeheight / 4 shifts the pipe upwards by 1/4 of its height
    //Math.random() * (pipeheight / 2) generates a random number between 0 and half the pipe's height to add variability
    //the subtraction ensures that the pipe's position is within a certain range, making the game more challenging
    //(0-1) * pipeheight/2
    // 0 -> -128 (pipeheight/4)
    // 1 -> -128 - 256 (pipeheight/4 - pipeheight/2) =-3/4 pipeheight

    openingspace = board.height/4;  //sets the vertical space between the top and bottom pipes. This space determines how difficult it is for the bird to fly through the gap

    let toppipe = {         //creates an object representing the top pipe with
        img : toppipeimg,   //top pipe image
        x : pipex,          //initial horizontal position
        y : randompipey,    //calculated vertical position
        width : pipewidth,  //width of the pipe
        height : pipeheight,//hight of the pipe
        passed : false      //flag to track if the bird has passed the pipe for scoring purposes
    }

    pipearray.push(toppipe);    //adds the newly created top pipe object to the pipearray, which holds all the active pipes in the game

    let bottompipe = {                              //creates an object representing the bottom pipe with
        img : bottompipeimg,                        //bottom pipe image
        x : pipex,                                  //initial horizontal position
        y : randompipey + pipeheight + openingspace,//calculated vertical position
        width : pipewidth,                          //width of the pipe
        height : pipeheight,                        //height of the pipe
        passed : false                              //flag to track if the bird has passed the pipe for scoring purposes 
    }

    pipearray.push(bottompipe); //adds the newly created bottom pipe object to the pipearray
}

function movebird(e) {  //handles the events that cause the bird to jump and also resets the game if it's over
    if (e.type === "keydown" && (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX")){
        //jump bird
        velocityy = -6; //sets the vertical velocity velocityy to -6, causing the bird to move upward when the key is pressed

        //reset game
        if (gameover){  //if the game is over, reset the game state
            bird.y = birdy;
            pipearray = [];
            score = 0;
            gameover = false;
        }
    }
    else if (e.type === "mousedown"){
        //jump bird
        velocityy = -6; //sets the vertical velocity velocityy to -6, causing the bird to move upward when the key is pressed

        //reset game
        if (gameover){  //if the game is over, reset the game state
            bird.y = birdy;
            pipearray = [];
            score = 0;
            gameover = false;
        }
    }
}

function detectcollision(a,b) { //checks if two rectangular objects, a and b, are colliding... objects a and b are expected to have x, y, width, and height properties
    //these conditions collectively determine if the rectangles representing a and b overlap, indicating a collision
    return a.x < b.x + b.width &&   //checks if the left edge of a is to the left of the right edge of b
           a.x + a.width > b.x &&   //checks if the right edge of a is to the right of the left edge of b
           a.y < b.y + b.height &&  //checks if the top edge of a is above the bottom edge of b
           a.y + a.height > b.y;    //checks if the bottom edge of a is below the top edge of b
}
