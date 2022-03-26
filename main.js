// Size of the game area (in px)
const GAME_AREA_WIDTH = 700;
const GAME_AREA_HEIGHT = 500;

const gameArea = document.querySelector('.game-area');

// Size of the paddles (in px)
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

// Size of the ball (in px)
const BALL_SIZE = 20;
const BALL_RADIUS = 10;

// Get the computer paddle element
const computerPaddle = document.querySelector('.computer-paddle');

// Get the player paddle element
const playerPaddle = document.querySelector('.player-paddle');

// The computer paddle x-position
let computerPaddleXPosition = GAME_AREA_WIDTH - PADDLE_WIDTH

// The player paddle x-pos
let playerPaddleXPosition = PADDLE_WIDTH

// The y-velocity of the computer paddle
let computerPaddleYPosition = 0;
let computerPaddleYVelocity = 2;

// The y-velocity of the player paddle
let playerPaddleYPosition = 100;
let playerPaddleYVelocity = 2;

// Ball variables
const ball = document.querySelector('.ball');
let ballSpeed = 2

//Vertical
//Position - where the ball is on the screen
let ballPositionY = 250;
//Velocity - how the ball moves over time
let ballVelocityY = 2;

//Horizontal
//Position - where the ball is on the screen
let ballPositionX = 350;
//Velocity - how the ball moves over time
let ballVelocityX = 2;

// collision variables
let ballTop = ballPositionY - BALL_RADIUS;
let ballBottom = ballPositionY + BALL_RADIUS;
let ballLeft = ballPositionX - BALL_RADIUS;
let ballRight = ballPositionX + BALL_RADIUS;

let playerTop = playerPaddleYPosition;
let playerBottom = playerPaddleYPosition + PADDLE_HEIGHT;
let playerLeft = playerPaddleXPosition;
let playerRight = playerPaddleXPosition + PADDLE_WIDTH;

let computerTop = computerPaddleYPosition;
let computerBottom = computerPaddleYPosition + PADDLE_HEIGHT;
let computerLeft = computerPaddleXPosition;
let computerRight = computerPaddleXPosition + PADDLE_WIDTH;



//reset
function resetBall() {
    ballPositionX = GAME_AREA_WIDTH/2;
    ballPositionY = GAME_AREA_HEIGHT/2
    ballSpeed = 2
    ballVelocityX = -ballVelocityX;
}



// Update the pong world
function update() {

    // Update the computer paddle's position
    computerPaddleYPosition = computerPaddleYPosition + computerPaddleYVelocity;

    // Update the player paddle's position
    playerPaddleYPosition = playerPaddleYPosition + playerPaddleYVelocity;

    // Apply the y-position 
    computerPaddle.style.top = `${computerPaddleYPosition}px`;
    playerPaddle.style.top = `${playerPaddleYPosition}px`;

    // Apply top edge and bottom edge for computer paddle
    if (computerPaddleYPosition <= 0 || computerPaddleYPosition >= 400) {
        computerPaddleYVelocity *= -1;
    }

    // Apply top edge and bottom edge for player paddle
    if (playerPaddleYPosition <=0 || playerPaddleYPosition >= 400) {
        playerPaddleYVelocity *= -1;
    }

    //To control computer paddle
    let computerLevel = 0.1;
    computerPaddleYPosition += (ballPositionY -(computerPaddleYPosition + PADDLE_HEIGHT/2)) + computerLevel;
    // computerPaddleYPosition += (ballPositionY -(computerPaddleYPosition + PADDLE_HEIGHT/2));

    //Update horizontal position
    ballPositionX += ballVelocityX;
    ball.style.left = ballPositionX + 'px'; //changes it into a px string that we can use


    //Update vertical position
    ballPositionY += ballVelocityY;
    ball.style.top = ballPositionY + 'px'; //changes it into a px string that we can use
    
    // //if it hits left edge
    // if(ballPositionX <= 20){
    //     ballVelocityX *= -1;
    //     // ballPositionX = 0;
    // }

    // collision with 

    if (ballRight > playerLeft && ballBottom > playerTop && ballLeft > playerRight && ballTop < playerBottom) {
        let collisionPoint = ballPositionY - (playerPaddleYPosition + PADDLE_HEIGHT/2);

        collisionPoint = collisionPoint/(PADDLE_HEIGHT/2);

        // calulate angle
        let angle = collisionPoint * Math.PI/4;

        // calculate direction
        let direction = (ballPositionX < GAME_AREA_WIDTH/2) ? 1 : -1;

        // change velocity
        ballVelocityX = direction * ballSpeed * Math.cos(angle);
        ballVelocityY = direction * ballSpeed * Math.sin(angle);

        //increment speed everytime ball hits paddle
        ballSpeed += 0.1;
    }

    // //if it hits right edge
    // if(ballPositionX > 655){
    //     ballVelocityX *= -1;
    //     // ballPositionX = 670;
    // }

    if (ballRight > computerLeft && ballBottom > computerTop && ballLeft > computerRight && ballTop < computerBottom) {
        let collisionPoint = ballPositionY - (computerPaddleYPosition + PADDLE_HEIGHT/2);

        collisionPoint = collisionPoint/(PADDLE_HEIGHT/2);

        // calulate angle
        let angle = collisionPoint * Math.PI/4;

        // calculate direction
        let direction = (ballPositionX < GAME_AREA_WIDTH/2) ? 1 : -1;

        // change velocity
        ballVelocityX = direction * ballSpeed * Math.cos(angle);
        ballVelocityY = direction * ballSpeed * Math.sin(angle);

        //increment speed everytime ball hits paddle
        ballSpeed += 0.1;
    }

    //if it hits the top edge
    //if it hits the bottom edge, bounce it
    if(ballPositionY + BALL_RADIUS > GAME_AREA_HEIGHT || ballPositionY - BALL_RADIUS < 0){
        ballVelocityY *= -1;
        
    }

    if (ballPositionX - BALL_RADIUS < 0 ) {
        // computerScore++;
        resetBall();
    } else if (ballPositionX + BALL_RADIUS > GAME_AREA_WIDTH) {
        // playerScore++;
        resetBall();
    }





}

// Call the update() function every 35ms
setInterval(update, 35);
