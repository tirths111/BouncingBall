Core Components:
Initialization:

initialize(): Sets up the court, initial ball image, and starts the animation.
Ball Dynamics:

getRandomDirection(): Determines a random direction, either -1 (left/up) or 1 (right/down).
getRandomSpeedMagnitude(): Determines a random speed factor for the ball.
updateBallSpeed(ball): Updates the speed (dx, dy) of the given ball.
Collision Handling:

isOutOfCourt(...): Checks if a ball is out of the court's boundaries.
handleBoundaryCollision(...): Adjusts ball's direction and position upon boundary collision.
ballCollision(ballA, ballB): Checks if two balls collide with each other.
handleBallCollision(ballA, ballB): Handles the dynamics after two balls collide.
Ball Placement & Animation:

setBallNum(): Places a given number of balls randomly within the court.
isOverlapping(position): Checks if a ball overlaps with any existing balls.
getRandomPosition(): Gets a random position for a ball inside the court.
setSpeed(value): Adjusts the speed of the balls based on user input.
startAnimation(): Begins the ball movement animation.
moveBalls(): Main loop that moves each ball, checks for collisions, and updates positions.
resumeOrSuspend(): Pauses or resumes the animation.
Usage:
Setup:

Include the script in your HTML page.
Ensure you have an element with the ID "court", and within it, an image representing the ball.
Provide an input element with ID "ballNums" to specify the number of balls you wish to display.
Controls:

Use the setSpeed(value) function to adjust the speed of the balls. Value can be 0 (slow), 1 (medium), or 2 (fast).
Call resumeOrSuspend() to pause or resume the animation.
Customization:

The default ball diameter is set to 40 pixels. Modify this in the code if needed.
Adjust the interval in startAnimation() to make the animation loop faster or slower.
