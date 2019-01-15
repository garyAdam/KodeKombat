let playerOne = document.getElementById('player-one');
let playerOnePos = 3;
playerOne.style.left = playerOnePos + "%";
let moving;


let movement = function (event) {
    if (event.key === "d") {
        playerOnePos += 1;
        playerOne.style.left = playerOnePos + "%";
        if (moving ===false) {
            playerOne.src = "/static/images/jin_walk.gif";
            moving = true;
        }
    } else if (event.key === "a") {
        playerOnePos -= 1;
        playerOne.style.left = playerOnePos + "%";

    }

};


let changeBackStanceToStanding = function () {
    playerOne.src = "/static/images/jin_stance.gif";
    moving = false;

};



window.addEventListener('keypress', movement);
window.addEventListener('keyup', changeBackStanceToStanding);

