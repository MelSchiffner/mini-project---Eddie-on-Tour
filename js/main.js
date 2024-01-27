
class Eddie {
    constructor(){
        this.positionX = 30;
        this.positionY = 30;
        this.width = 50;
        this.height = 40;

        const eddieImg = document.createElement("img");

        eddieImg.setAttribute("src", "./ ");
        eddieImg.setAttribute("alt", "Eddie campervan picture");
        eddieImg.setAttribute("id", "eddie"); 

        const parentElm = document.getElementById("Eddie");
        parentElm.appendChild(eddieImg);

    }
    moveUp() {
        this.positionY = this.positionY + 10; 

    }
    moveDown(){
        this.positionY = this.positionY - 10;
    }
    jumpUp(){

    } 
}

const eddie = new Eddie();



/*
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      console.log("you've pressed the spacebar");
      const spacebarDiv = document.createElement("div");
      spacebarDiv.textContent = "Spacebar pressed";
      document.body.appendChild(spacebarDiv);
  
    } else if (event.code === "ArrowUp") {
      console.log("you've pressed the up arrow");
  
    } else if (event.code === "ArrowDown") {
      console.log("you've pressed the down arrow")
      */