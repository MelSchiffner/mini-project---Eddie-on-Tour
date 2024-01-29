
class Eddie {
    constructor(){
        this.width = 150;
        this.height = 66;
        this.positionX = 15;
        this.positionY = 15;
        this.eddieElm = null;
       
        this.createEddieElement
        ()

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
        if (this.positionY > 0) {
            this.positionY = this.positionY + 10;
            this.eddieElm.style.bottom = this.positionY + "px";
         }
    }
    
    moveDown(){
        if (this.positionY + this.height) {
            this.positionY = this.positionY - 10;
            this.eddieElm.style.bottom = this.positionY + "px";
         }
    }

    moveLeft() {
        if (this.positionX > 0) {
            this.positionX = this.positionX - 10;
            this.eddieElm.style.left = this.positionX + "px";
        }

    }
    moveRight(){  
       if (this.positionX + this.width ) {
           this.positionX = this.positionX + 10;
           this.eddieElm.style.left = this.positionX + "px";
        }
    }
    
   /* jumpUp(){
        
    } */

}

const eddie = new Eddie();

document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp") {
      eddie.moveUp();
    } else if (event.code === "ArrowDown") {
      eddie.moveDown();
    } else if (event.code === "ArrowRight") {
        eddie.moveRight();
    } else if (event.code === "ArrowLeft") {
        eddie.moveLeft();
    }
});