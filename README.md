# Flappy Bird Game

## Introduction
This project is a simple Flappy Bird game created using HTML, CSS, and JavaScript. The game involves a bird navigating through gaps between pipes, aiming to avoid collisions and score points by passing through the gaps.

## Game Structure
The game structure consists of two main parts: the **DEFINITIONS** and the **GAME LOOP**.

### Definitions
The definitions section includes the setup of the game elements such as the canvas, bird, pipes, and game physics.

### Game Loop
The game loop is responsible for event handling, updating the positions of game objects, and rendering these objects onto the canvas. The game loop runs continuously until the game is over.

## How the Game Works
The game has been developed by breaking down the development process into smaller steps:

### Step 1: Setting Up the Canvas
The game window is created using an HTML `<canvas>` element, which serves as the area where game graphics are drawn. The dimensions of the canvas are set to 360x640 pixels to match the background image.

### Step 2: Creating the Bird
The bird is represented as an image drawn on the canvas. It has defined width, height, and initial position. The bird's movement is controlled by adjusting its vertical velocity and responding to user input (keyboard or mouse).

### Step 3: Creating the Pipes
Pipes are generated at regular intervals and move from right to left across the canvas. Each pipe pair consists of a top and a bottom pipe, creating a gap for the bird to pass through. The vertical position of the pipes is randomized to increase difficulty.

### Step 4: Game Physics and State
The game includes basic physics such as gravity affecting the bird's downward movement and a velocity that makes the bird jump. The game state includes variables for tracking whether the game is over and the player's score.

### Step 5: Game Loop and Rendering
The game loop updates the positions of the bird and pipes, checks for collisions, and renders the updated positions onto the canvas. The loop runs continuously using `requestAnimationFrame` to ensure smooth animation.

### Step 6: Collision Detection and Scoring
Collision detection is implemented to check if the bird hits a pipe or goes off-screen, which ends the game. The score is updated when the bird successfully passes through a pipe pair.

## How to Play
1. Open `index.html` in a web browser.
2. Press the Space key, Arrow Up key, or click the mouse to make the bird jump.
3. Avoid hitting the pipes or the edges of the canvas.
4. The game ends if the bird collides with a pipe or goes off-screen.
5. Your score is displayed on the canvas.

## Project Files
- `index.html`: Contains the structure of the game, including the canvas element.
- `style.css`: Contains the styles for the game, including the background image.
- `script.js`: Contains the JavaScript code for the game logic, including the game loop, bird and pipe movement, collision detection, and event handling.

## Installation
To run the game locally:
1. Clone the repository to your local machine.
2. Open `index.html` in your web browser.

## Screenshots
![Game Start](path_to_screenshot1)
![Game Over](path_to_screenshot2)

### Play The Game Here : 
https://nirakshi2003.github.io/FlappyBirdGame/ 

## Future Enhancements
- Add sound effects for bird movement and collisions.
- Implement different difficulty levels.
- Add a high score feature.
