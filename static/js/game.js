let playerMovement = function (event) {
    let movementDistance = 0.7;

    let playerOne = document.getElementById('player-one');
    let playerOnePosition = parseFloat(playerOne.dataset.playerPosition);
    let playerOneCanMoveOrAttack = playerOne.dataset.canMoveOrAttack;

    let playerTwo = document.getElementById('player-two');
    let playerTwoPosition = parseFloat(playerTwo.dataset.playerPosition);
    let playerTwoCanMoveOrAttack = playerTwo.dataset.canMoveOrAttack;

    /*
    KEY CODES:

    65 - a
    68 - d
    69 - e
    74 - j
    76 - l
    85 - u

     */

    if (event.keyCode === 68) {
        movePlayer(playerOne, 'right', movementDistance);
    }
    if (event.keyCode === 65) {
        movePlayer(playerOne, 'left', movementDistance);
    }

    if (event.keyCode === 69) {
        if (playerOneCanMoveOrAttack === 'false') {
            playerOne.src = "/static/images/jin_punch.gif";
            playerOne.dataset.canMoveOrAttack = 'true';
            if (playerTwoPosition-playerOnePosition<5) playerTwo.dataset.hp -= 10;
        }
    }

    if (event.keyCode === 74) {
        movePlayer(playerTwo, 'left', movementDistance);
    }

    if (event.keyCode === 76) {
        movePlayer(playerTwo, 'right', movementDistance);
    }

    if (event.keyCode === 85) {
        if (playerTwoCanMoveOrAttack === 'false') {
            playerTwo.src = "/static/images/asuka_punch_new.gif";
            playerTwo.dataset.canMoveOrAttack = 'true';
        }
    }

    function movePlayer(player, direction, movementDistance) {
        if (player === playerOne) {
            if (direction === 'right' && playerOnePosition < playerTwoPosition - 10) {
                playerOnePosition += movementDistance;
            } else if (direction === 'left' && playerOnePosition > 3) {
                playerOnePosition -= movementDistance;
            }

            player.style.left = playerOnePosition + "%";
            player.dataset.playerPosition = playerOnePosition;

            if (playerOneCanMoveOrAttack === 'false') {
                if (direction === 'right') {
                    player.src = "/static/images/jin_walk.gif";
                    player.dataset.canMoveOrAttack = 'true';
                } else if (direction === 'left') {
                    player.src = "/static/images/jin_backwalk.gif";
                    player.dataset.canMoveOrAttack = 'true';
                }
            }
        } else {
            if (direction === 'right' && playerTwoPosition < 87) {
                playerTwoPosition += movementDistance;
            } else if (direction === 'left' && playerOnePosition +10 < playerTwoPosition) {
                playerTwoPosition -= movementDistance;
            }


            player.style.left = playerTwoPosition + "%";
            player.dataset.playerPosition = playerTwoPosition;

            if (playerTwoCanMoveOrAttack === 'false') {
                if (direction === 'left') {
                    player.src = "/static/images/asuka_walk.gif";
                    player.dataset.canMoveOrAttack = 'true';
                } else if (direction === 'right') {
                    player.src = "/static/images/asuka_backwalk.gif";
                    player.dataset.canMoveOrAttack = 'true';
                }

            }
        }
        ;
    }

}




let playerOneBackToStance = function () {
    let playerOne = document.getElementById('player-one');
    setTimeout(function () {
        playerOne.src = "/static/images/jin_stance.gif";
        playerOne.dataset.canMoveOrAttack = 'false';

    }, 500);


};


let playerTwoBackToStance = function () {
    let playerTwo = document.getElementById('player-two');
    playerTwo.src = "/static/images/asuka_stance.gif";
    playerTwo.dataset.canMoveOrAttack = 'false';

};


let init = function () {
    addEventListener('keydown', playerMovement, false);
    addEventListener('keyup', playerOneBackToStance, false);
    addEventListener('keyup', playerTwoBackToStance, false);
};


let updateHPBar = function(playerID) {
    let player = document.getElementById(playerID);
    let playerActualHP = player.dataset.hp;

    let playerHPbar = document.getElementById(`${playerID}-HP`).firstElementChild;
    playerHPbar.style.width = (parseInt(playerActualHP) * 0.3) + 'vw';
};


init();
