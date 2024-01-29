
class Eddie {
    constructor(){
        this.width = 150;
        this.height = 66;
        this.positionX = 15;
        this.positionY = 15;
        this.eddieElm = null;
        this.jumping = false; 

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
            this.positionY += 10;
            this.eddieElm.style.bottom = this.positionY + "px";
         }
    }
    
    moveDown(){
        if (this.positionY > 0)  {
            this.positionY -= 10;
            this.eddieElm.style.bottom = this.positionY + "px";
         }
    }

    moveLeft() {
        if (this.positionX > 0) {
            this.positionX -= 10;
            this.eddieElm.style.left = this.positionX + "px";
        }

    }
    moveRight(){  
       if (this.positionX + this.width < 1200) {
           this.positionX += 10;
           this.eddieElm.style.left = this.positionX + "px";
        }
    }
    
    jump() {
        if (!this.jumping) {
            this.jumping = true;
            this.jumpAnimation();
        } 
    }

    jumpAnimation() {
        if (this.positionY < 400) {
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
        }, 50);
    }

}

class Obstacle {
    constructor(){
        this.width = 20; 
        this.height = 20;
        this.positionX = 1100;
        this.positionY = Math.floor(Math.random() * (100 - 20) + 20);
        this.domElm = null;

        this.createDomElement();
    }
    createDomElement(){
        this.domElm = document.createElement("div");

        this.domElm.setAttribute("class", "obstacle");
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
        this.width = 20;
        this.height = 10;
        this.positionX = Math.floor(Math.random() * (1000 - 20) + 20);
        this.positionY = 500;
        this.domElm = null;

        this.createDomElement();
    }
    createDomElement() {
        this.domElm = document.createElement("div");

        this.domElm.setAttribute("class", "treasure");
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




const eddie = new Eddie();
const obstacles = [];
const treasures = [];

setInterval(() => {
    const newObstacle = new Obstacle();
    obstacles.push(newObstacle);
}, 9000);


setInterval(() => {
    obstacles.forEach((obstacleInstance) => {
        obstacleInstance.moveLeft();
        if (eddie.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            eddie.positionX + eddie.width > obstacleInstance.positionX &&
            eddie.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            eddie.positionY + eddie.height > obstacleInstance.positionY) {
            console.log("game over");
            location.href = "gameover.html";
        }

    });
}, 20);


setInterval(() => {
    const newTreasure = new Treasure();
    treasures.push(newTreasure);
}, 7000);


setInterval(() => {
    treasures.forEach((treasureInstance) => {
        treasureInstance.moveDown();
        if (player.positionX < treasureInstance.positionX + treasureInstance.width &&
            player.positionX + player.width > treasureInstance.positionX &&
            player.positionY < treasureInstance.positionY + treasureInstance.height &&
            player.positionY + player.height > treasureInstance.positionY) {
            
        }

    });
}, 20);




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
        console.log("spacebar")
    }
});