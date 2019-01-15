let playerOne = document.getElementById('player-one');
let playerOnePos = 3;
playerOne.style.left = playerOnePos + "%";

let movement = function (event) {
    if (event.key === "d") {
        playerOnePos += 1;
        playerOne.style.left = playerOnePos + "%";
    } else if (event.key === "a") {
        playerOnePos -= 1;
        playerOne.style.left = playerOnePos + "%";

    }

};
let animWalk = function (event) {
    if (event.key === "d") {
        playerOne.src = "/static/images/jin_walk.gif";
        playerOne.removeEventListener('keydown', animWalk);
        console.log("sd");
    }
};


let changeBackStanceToStanding = function () {
    playerOne.src = "/static/images/jin_stance.gif";
    console.log(1);
    playerOne.addEventListener('keydown', animWalk);
};



window.addEventListener('keypress', movement);
window.addEventListener('keydown', animWalk);
window.addEventListener('keyup', changeBackStanceToStanding);

