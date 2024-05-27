// script.js
document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.getElementById("reset");
    let newGameBtn = document.getElementById("new-btn");
    let msgContainer = document.querySelector(".msg-container");
    let msg = document.getElementById("winner");

    // Initialize turn variable
    let turn0 = true;

    // Define winning patterns
    const winningPattern = [
        [0, 1, 2], [0, 3, 6], [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8], [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];

    // Add event listeners to each box
    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            console.log("box was clicked");

            if (turn0) {
                box.innerText = "0";
                turn0 = false;
            } else {
                box.innerText = "X";
                turn0 = true;
            }
            box.disabled = true;
            checkWinner();
        });
    });

    // Disable all boxes
    const disableBoxes = () => {
        boxes.forEach(box => {
            box.disabled = true;
        });
    };

    // Enable all boxes and reset text
    const enableBoxes = () => {
        boxes.forEach(box => {
            box.disabled = false;
            box.innerText = "";
        });
        msgContainer.classList.add("hide");
    };

    // Show the winner message
    const showWinner = (winner) => {
        msg.innerHTML = `Congratulations! Winner is ${winner}`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    };

    // Check for a winner
    const checkWinner = () => {
        for (let pattern of winningPattern) {
            let [a, b, c] = pattern;
            let posVal1 = boxes[a].innerText;
            let posVal2 = boxes[b].innerText;
            let posVal3 = boxes[c].innerText;

            if (posVal1 !== "" && posVal1 === posVal2 && posVal2 === posVal3) {
                console.log("winner");
                showWinner(posVal1);
                return;
            }
        }
    };

    // Reset the game
    const resetGame = () => {
        turn0 = true;
        enableBoxes();
    };

    // Attach event listeners to the buttons
    newGameBtn.addEventListener("click", resetGame);
    resetBtn.addEventListener("click", resetGame);

    // Enable boxes when the page loads
    window.onload = enableBoxes;
});
