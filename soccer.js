    let court;
    let ballImage;
    let balls = [];
    let interval;
    let speedFactor = 1;

    function initialize() {
        court = document.getElementById("court");
        ballImage = court.querySelector('img');
        setBallNum();
        startAnimation();
    }

    function getRandomDirection() {
        return Math.random() < 0.5 ? -1 : 1;
    }

    function getRandomSpeedMagnitude() {
        return (2 + Math.random() * 4) * speedFactor;
    }

    function updateBallSpeed(ball) {
        const magnitude = getRandomSpeedMagnitude();
        ball.dx = (ball.dx > 0 ? 1 : -1) * magnitude;  
        ball.dy = (ball.dy > 0 ? 1 : -1) * magnitude;  
    }

    function isOutOfCourt(newLeft, newTop, courtRect, ballDiameter) {
        return newLeft <= courtRect.left || newLeft + ballDiameter >= courtRect.right || 
            newTop <= courtRect.top || newTop + ballDiameter >= courtRect.bottom;
    }

    function handleBoundaryCollision(ball, newLeft, newTop, courtRect, ballDiameter) {
        if (newLeft <= courtRect.left || newLeft + ballDiameter >= courtRect.right) {
            ball.dx = -ball.dx;
            newLeft = Math.min(Math.max(newLeft, courtRect.left), courtRect.right - ballDiameter);
        }

        if (newTop <= courtRect.top || newTop + ballDiameter >= courtRect.bottom) {
            ball.dy = -ball.dy;
            newTop = Math.min(Math.max(newTop, courtRect.top), courtRect.bottom - ballDiameter);
        }

        return { newLeft, newTop };
    }

    function updateBallPosition(ball) {
        return {
            left: ball.element.offsetLeft + ball.dx,
            top: ball.element.offsetTop + ball.dy
        };
    }

    function setBallNum() {
        const numBalls = parseInt(document.getElementById('ballNums').value);
        balls = [];
        court.replaceChildren();

        for (let i = 0; i < numBalls; i++) {
            const newBall = ballImage.cloneNode();
            
            let randomPosition;
            let tries = 0;
            do {
                randomPosition = getRandomPosition();
                tries++;
            } while (isOverlapping(randomPosition) && tries < 100); 

            newBall.style.left = `${randomPosition.x}px`;
            newBall.style.top = `${randomPosition.y}px`;
            court.appendChild(newBall);

            balls.push({
                element: newBall,
                dx: getRandomDirection() * getRandomSpeedMagnitude(),
                dy: getRandomDirection() * getRandomSpeedMagnitude()
            });
        }
    }

    function isOverlapping(position) {
        const ballDiameter = 40;
        for (const ball of balls) {
            const ballLeft = ball.element.offsetLeft;
            const ballTop = ball.element.offsetTop;

            if (position.x + ballDiameter > ballLeft && position.x < ballLeft + ballDiameter &&
                position.y + ballDiameter > ballTop && position.y < ballTop + ballDiameter) {
                return true;  
            }
        }
        return false;
    }

    function ballCollision(ballA, ballB) {
        const distance = Math.sqrt(
            (ballA.element.offsetLeft - ballB.element.offsetLeft) ** 2 + 
            (ballA.element.offsetTop - ballB.element.offsetTop) ** 2
        );
        return distance < 40; // 40 is the diameter of the ball
    }

    function handleBallCollision(ballA, ballB) {
        [ballA.dx, ballB.dx] = [ballB.dx, ballA.dx];
        [ballA.dy, ballB.dy] = [ballB.dy, ballA.dy];
    }

    function getRandomPosition() {
        const courtRect = court.getBoundingClientRect();
        const ballDiameter = 40;

        return {
            x: Math.random() * (courtRect.width - ballDiameter),
            y: Math.random() * (courtRect.height - ballDiameter)
        };
    }

    function setSpeed(value) {
        if (value === 0) speedFactor = 0.8;
        else if (value === 1) speedFactor = 2;
        else speedFactor = 3.5;

        balls.forEach(updateBallSpeed);
    }

    function startAnimation() {
        interval = setInterval(moveBalls, 20);
    }

    function moveBalls() {
        const courtRect = court.getBoundingClientRect();
        const ballDiameter = 40;

        for (let i = 0; i < balls.length; i++) {
            for (let j = i + 1; j < balls.length; j++) {
                if (ballCollision(balls[i], balls[j])) {
                    handleBallCollision(balls[i], balls[j]);
                }
            }

            let { left, top } = updateBallPosition(balls[i]);

            if (isOutOfCourt(left, top, courtRect, ballDiameter)) {
                const position = handleBoundaryCollision(balls[i], left, top, courtRect, ballDiameter);
                left = position.newLeft;
                top = position.newTop;
            }

            balls[i].element.style.left = `${left}px`;
            balls[i].element.style.top = `${top}px`;
        }
    }

    function resumeOrSuspend() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        } else {
            startAnimation();
        }
    }

    initialize();
