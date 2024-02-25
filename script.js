let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let win = document.querySelector(".msg-container");
let newGameBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");

let turn0 = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

let count = 0;

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    win.classList.add("hide");
    boxes.forEach((box) =>{
        box.style.backgroundColor = "#dad7cd";
    })
  };

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        if(turn0===true){
            box.innerText = "O";
            box.style.color = "#588157";
            turn0 = false;
            count++;
        }
        else{
            box.innerText = "X";
            box.style.color = "#344e41";
            turn0 = true;
            count++;
        }
        box.disabled = true;
        checkWinner();
    })
});

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) =>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    win.classList.remove("hide")
    disableBoxes();
}

const draw = () => {
    msg.innerText = "It's a Draw!!";
    win.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () =>{
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        
        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                showWinner(pos1Val);
                boxes[pattern[0]].style.backgroundColor = "green";
                boxes[pattern[1]].style.backgroundColor = "green";
                boxes[pattern[2]].style.backgroundColor = "green";
                
                return true;
            }   
        }
        if(count>=9){
            draw();
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);