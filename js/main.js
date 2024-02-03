document.addEventListener("DOMContentLoaded", () => {
    
    const startButton = document.createElement("button");
    startButton.textContent = "Start Roadtrip";
    startButton.id = "startButton";

    const boardElm = document.getElementById("board");
    if (boardElm) {
        const backgroundImage = document.createElement("div");
        backgroundImage.id = "backgroundImage";
        boardElm.appendChild(backgroundImage);
        boardElm.appendChild(startButton);
    } 

    // Instructions
    const instruction = document.createElement("div");
    instruction.innerHTML = "Drive Eddie with arrow keys or spacebar to make him jump!"

    const arrowImg = document.createElement ("img");
    arrowImg.src = "./Images/arrow.png";
    arrowImg.style.width = "55px";  
    arrowImg.style.height = "55px";

    instruction.appendChild(arrowImg);

    const spaceImg = document.createElement ("img");
    spaceImg.src = "./Images/space.png";
    spaceImg.style.width = "55px";  
    spaceImg.style.height = "55px";
    instruction.appendChild(spaceImg);
    
    instruction.innerHTML += "<br>Avoid the obstacles on the road (-10 points). <br>And collect the treasures falling from the sky (+10 points)!";
    instruction.id = "instruction";

    boardElm.appendChild(instruction);

    startButton.addEventListener("click", () => {
        let backgroundMusic = new Audio('./sound/Xavier Rudd - Follow The Sun [official music video].mp3');
        backgroundMusic.volume = 0.2;
        backgroundMusic.play();
        startGame();
        startButton.style.display = "none";
        instruction.style.display = "none";
    });
});


let collisionFlag = false;
let sec = 120;
let sound = new Audio ('./sound/vw_sound.wav');
sound.volume = 0.2;
let hornSound = new Audio ('./sound/VW_horn.wav');
hornSound.volume = 0.2;

// Images Obstacles and Treasures
const obstacleImages = [
    './Images/Kanguru.png',
    './Images/waste.png',
    './Images/oil-barrel.png',
    './Images/deer.png',
    './Images/school-bus.png'
]

const treasureImages = [
    './Images/log.png',
    './Images/lantern.png',
    './Images/bonfire.png',
    './Images/food-drink.png',
    './Images/fuel-station.png',
    './Images/wine.png'
]

class Eddie {
    constructor(){
        this.width = 150;
        this.height = 66;
        this.positionX = 15;
        this.positionY = 20;
        this.eddieElm = null;
        this.jumping = false; 
        this.score = 0;
        this.obstacleSound = new Audio ('./sound/crash.wav');
        this.obstacleSound.volume = 0.1;
        this.treasureSound = new Audio ('./sound/ring.wav');
        this.treasureSound.volume = 0.2;

        this.createEddieElement()

    }
    createEddieElement() {
        this.eddieElm = document.createElement("img");

        this.eddieElm.setAttribute("id", "eddie");
        this.eddieElm.setAttribute("src", "./Images/Eddie_Cartoonize.png");
        this.eddieElm.setAttribute("alt", "Eddie campervan picture");

        this.eddieElm.style.width = this.width + "px";
        this.eddieElm.style.height = this.height + "px";
        this.eddieElm.style.left = this.positionX + "px";
        this.eddieElm.style.bottom = this.positionY + "px";
        

        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.eddieElm);

    }


    moveUp() {
        if (this.positionY + this.height < 170) {
            this.positionY += 15;
            this.eddieElm.style.bottom = this.positionY + "px";
            sound.play();
         }
    }
    
    moveDown(){
        if (this.positionY > 0)  {
            this.positionY -= 15;
            this.eddieElm.style.bottom = this.positionY + "px";
            sound.play();
         }
    }

    moveLeft() {
        if (this.positionX > 0) {
            this.positionX -= 15;
            this.eddieElm.style.left = this.positionX + "px";
            this.eddieElm.style.transform = "scaleX(-1)";
            sound.play();
        }

    }
    moveRight(){  
       if (this.positionX + this.width < 1100) {
           this.positionX += 15;
           this.eddieElm.style.left = this.positionX + "px";
           this.eddieElm.style.transform = "scaleX(1)";
           sound.play();
        }
    }
    
    jump() {
        if (!this.jumping) {
            this.jumping = true;
            this.jumpAnimation();
            hornSound.play();
        } 
    }

    jumpAnimation() {
        if (this.positionY < 275) {
            this.positionY += 15;
            this.eddieElm.style.bottom = this.positionY + "px";
            this.positionX += 2  ;
            this.eddieElm.style.left = this.positionX + "px";
            requestAnimationFrame(() => this.jumpAnimation());
        } else {
            this.fall();
        }
    }

    fall(){
           setTimeout(() => {
            this.positionY -= 5;
            this.eddieElm.style.bottom = this.positionY + "px";
            if (this.positionY > 15) {
                this.fall();
            } else {
                this.jumping = false;
            }
        }, 30);
    }

    collectTreasure() {
        if (!collisionFlag) {
            this.score += 10;
            console.log("Score: " + this.score);
            
            collisionFlag = true; 

                 const collectedTreasures = document.querySelectorAll('.treasure');
        collectedTreasures.forEach((treasure) => {
            const treasureRect = treasure.getBoundingClientRect();
            const eddieRect = this.eddieElm.getBoundingClientRect();

            if (
                eddieRect.right >= treasureRect.left &&
                eddieRect.left <= treasureRect.right &&
                eddieRect.bottom >= treasureRect.top &&
                eddieRect.top <= treasureRect.bottom
            ) {
                treasure.remove();
                this.treasureSound.play();
            }
            });
    
            setTimeout(() => {
                collisionFlag = false; 
            }, 1500); 
        }
    }
    
    hitObstacle() {
        if (!collisionFlag) {
            this.score -= 10;
            console.log("Score: " + this.score);
            
            collisionFlag = true;
            this.obstacleSound.play();

            setTimeout(() => {
                collisionFlag = false;
            }, 3000);
        }
        if(this.score < -1){
            location.href = "gameover.html";
        }
    }
}


class Obstacle {
    constructor(){
        this.width = 70; 
        this.height = 70;
        this.positionX = 1050;
        this.positionY = Math.floor(Math.random() * (100 - 15) + 15);
        this.domElm = null;

        this.createDomElement();
    }
    createDomElement(){
        this.domElm = document.createElement("div");
        this.domElm.setAttribute("class", "obstacle");

        const randomImageIndex = Math.floor(Math.random() * obstacleImages.length);
        this.domElm.style.backgroundImage = `url('${obstacleImages[randomImageIndex]}')`;

        this.domElm.style.width = this.width + "px"
        this.domElm.style.height = this.height + "px"
        this.domElm.style.left = this.positionX + "px";
        this.domElm.style.bottom = this.positionY + "px";

        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);
    }
    moveLeft(){
        this.positionX--;
        const threshold = 60;
        if (this.positionX + this.width < threshold) {
            this.domElm.remove();
        } else {
            this.domElm.style.left = this.positionX + "px";
        }
    }
}

class Treasure {
    constructor(){
        this.width = 55;
        this.height = 55 ;
        this.positionX = Math.floor(Math.random() * (1000 - 20) + 20);
        this.positionY = 500;
        this.domElm = null;

        this.createDomElement();
    }
    createDomElement() {
        this.domElm = document.createElement("div");

        this.domElm.setAttribute("class", "treasure");

        const randomImageIndex = Math.floor(Math.random() * treasureImages.length);
        this.domElm.style.backgroundImage = `url('${treasureImages[randomImageIndex]}')`;

        this.domElm.style.width = this.width + "px"
        this.domElm.style.height = this.height + "px"
        this.domElm.style.left = this.positionX + "px";
        this.domElm.style.bottom = this.positionY + "px";

      
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);
    }
    moveDown(){
        this.positionY--;
        const threshold = 60;
        if (this.positionY + this.height < threshold) {
            this.domElm.remove();
        } else {
            this.domElm.style.bottom = this.positionY + "px"; 
        }
    }
}



let eddie;
let obstacles = [];
let treasures = [];
let scoreElement;

// Start Background Animation

function startBackgroundAnimation() {
    const backgroundImage = document.getElementById("backgroundImage");
    if (backgroundImage) {
        backgroundImage.style.animationPlayState = "running";
    }
}



// Start game
function startGame(){
    eddie = new Eddie();
    obstacles = [];
    treasures = [];
    timer();
    createScoreElement();
    startBackgroundAnimation();

 

    // Obstacle Interval
    let obstacleInterval = 4000;
    let obstacleCreationInterval;

    // start obstacle interval
    function startObstacleCreationInterval() {
        obstacleCreationInterval = setInterval(() => {
            const newObstacle = new Obstacle();
            obstacles.push(newObstacle);
        }, obstacleInterval);
    }


    startObstacleCreationInterval();


    setInterval(() => {
        obstacles.forEach((obstacleInstance) => {
            obstacleInstance.moveLeft();
            if (eddie.positionX < obstacleInstance.positionX + obstacleInstance.width &&
                eddie.positionX + eddie.width > obstacleInstance.positionX &&
                eddie.positionY < obstacleInstance.positionY + obstacleInstance.height &&
                eddie.positionY + eddie.height > obstacleInstance.positionY) {
                eddie.hitObstacle();
                console.log("outch you hit an obstacle");
                updateScoreDisplay();
            }

        });
    }, 10);
    

    // Update obstacleInterval 
    setTimeout(() => {
        clearInterval(obstacleCreationInterval);
        obstacleInterval = 3000;
        startObstacleCreationInterval();
    }, 30000);

    setTimeout(() => {
        clearInterval(obstacleCreationInterval);
        obstacleInterval = 2000;
        startObstacleCreationInterval();
    }, 60000);

    setTimeout(() => {
        clearInterval(obstacleCreationInterval);
        obstacleInterval = 1000;
        startObstacleCreationInterval();
    }, 90000);

 
    // Treasure Interval
    setInterval(() => {
        const newTreasure = new Treasure();
        treasures.push(newTreasure);
    }, 3000);


    setInterval(() => {
        treasures.forEach((treasureInstance) => {
            treasureInstance.moveDown();
            if (eddie.positionX < treasureInstance.positionX + treasureInstance.width &&
                eddie.positionX + eddie.width > treasureInstance.positionX &&
                eddie.positionY < treasureInstance.positionY + treasureInstance.height &&
                eddie.positionY + eddie.height > treasureInstance.positionY) {
                eddie.collectTreasure();
                console.log("yeah I'm getting a treasure");
                updateScoreDisplay();
            }

        });
    }, 15);


    // Timer

    function timer(){
        const timerElement = document.createElement("div");
        timerElement.setAttribute("class", "timer");

        const timerDispaly = document.createElement("div");
        timerDispaly.textContent = sec;
        timerDispaly.classList.add("timerDisplay");
        timerElement.appendChild(timerDispaly);

        document.body.appendChild(timerElement);

        let timerInterval = setInterval(function(){
            timerDispaly.innerHTML = sec;
            sec--;

            if (sec < 0) {
                clearInterval(timerInterval);
                localStorage.setItem("finalScore", eddie.score);
                location.href = "endgamescore.html";
            }
        }, 1000);
    }

    timer();


    // Score
    function createScoreElement() {
        scoreElement = document.createElement("div");
        scoreElement.setAttribute("class", "score");
        

        const scoreDisplay = document.createElement("div");
        scoreDisplay.textContent = eddie.score;
        scoreDisplay.classList.add("scoreDisplay");
        scoreElement.appendChild(scoreDisplay);

        document.body.appendChild(scoreElement);

        collisionFlag = false;
    }

    createScoreElement();


    // Score Dispaly
    function updateScoreDisplay() {
        scoreElement.querySelector(".scoreDisplay").textContent = eddie.score;
    }

}




document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp") {
      eddie.moveUp();
    } else if (event.code === "ArrowDown") {
      eddie.moveDown();
    } else if (event.code === "ArrowRight") {
        eddie.moveRight();
    } else if (event.code === "ArrowLeft") {
        eddie.moveLeft();
    } else if (event.code === "Space") {
        eddie.jump();
    }
});