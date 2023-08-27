/**
 * Rock Paper Scissors
 * Created by Nikola Ilievski
 * Version: 1.1.3
 */

let pcScore = 0;
let userScore = 0;

let user_tag = document.getElementById("user");
let pc_tag = document.getElementById("pc");

/**
 * A function that gets all buttons from the wrapper and compares their value
 */
let btns = document.querySelectorAll("#btn-wrapper button");
btns.forEach(element => {
    element.addEventListener("click", () => {
        compareValue(element.id);
    });
});

/**
 * A function that compares the user's choice to the computer's
 * @param {number} choice and updates the scores accordingly
 */
const compareValue = (choice) => {
    let user = choice;
    let pc = generateNumber();

    showImage(user, "user-select");
    showImage(pc, "pc-select");

    if (pc != user) {
        if (pc == 1) {
            user == 2 ? userScore++ : pcScore++;
        } else if (pc == 2) {
            user == 1 ? pcScore++ : userScore++;
        } else {
            user == 1 ? userScore++ : pcScore++;
        };
    };

    UpdateScores();
    checkWinner();
};

/**
 * A function that generates a random number for the PC and
 * @returns that number
 */
const generateNumber = () => {
    return Math.ceil(Math.random() * 3);
};

/**
 * A function that has 2 parameters
 * @param {number} num which is used to determine which image to display and
 * @param {string} place which is used to identify the HTML element where the image should be displayed
 */
const showImage = (num, place) => {
    switch (Number(num)) {
        case 1:
            document.getElementById(place).src = "Images/rock.png";
            break;
        case 2:
            document.getElementById(place).src = "Images/paper.png";
            break;
        case 3:
            document.getElementById(place).src = "Images/scissors.png";
            break;
    };
};

/**
 * A function that updates the score labels
 */
const UpdateScores = () => {
    pc_tag.innerHTML = pcScore;
    user_tag.innerHTML = userScore;
};

/**
 * A function that checks who is the winner based on best of five
 */
const checkWinner = () => {
    if (userScore == 3 || pcScore == 3) {
        btns.forEach(element => {
            element.disabled = true;
        });

        setTimeout(() => {
            let winner;
            winner = (userScore == 3 ? "You won! :D" : "PC won :(");
            document.querySelector(".final-result h2").innerHTML = winner;
            document.querySelector(".final-result").toggleAttribute("hidden");
        }, 300);
    };
};

/**
 * A function to reload the page
 */
document.getElementById("retry").addEventListener("click", () => {
    location.reload();
});