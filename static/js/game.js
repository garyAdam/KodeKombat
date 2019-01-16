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
        movePlayerOne(playerOne, playerOnePosition, playerOneCanMoveOrAttack, 'onwards', movementDistance);
    }
    if (event.keyCode === 65) {
        movePlayerOne(playerOne, playerOnePosition, playerOneCanMoveOrAttack, 'backwards', movementDistance);
    }

    if (event.keyCode === 69) {
        if (playerOneCanMoveOrAttack === 'false') {
            playerOne.src = "/static/images/jin_punch.gif";
            playerOne.dataset.canMoveOrAttack = 'true';
        }
    }

    if (event.keyCode === 74) {
        movePlayerTwo(playerTwo, playerTwoPosition, playerTwoCanMoveOrAttack, 'onwards', movementDistance);
    }

    if (event.keyCode === 76) {
        movePlayerTwo(playerTwo, playerTwoPosition, playerTwoCanMoveOrAttack, 'backwards', movementDistance);
    }

    if (event.keyCode === 85) {
        if (playerTwoCanMoveOrAttack === 'false') {
            playerTwo.src = "/static/images/asuka_punch_new.gif";
            playerTwo.dataset.canMoveOrAttack = 'true';
        }
    }
};



function movePlayerOne(player, playerPosition, playerCanMoveOrAttack, direction, movementDistance) {
    if (direction === 'onwards') {
        playerPosition += movementDistance;
    } else if (direction === 'backwards') {
        playerPosition -= movementDistance;
    }

    player.style.left = playerPosition + "%";
    player.dataset.playerPosition = playerPosition;

    if (playerCanMoveOrAttack === 'false') {
        if (direction === 'onwards') {
            player.src = "/static/images/jin_walk.gif";
            player.dataset.canMoveOrAttack = 'true';
        } else if (direction === 'backwards') {
            player.src = "/static/images/jin_backwalk.gif";
            player.dataset.canMoveOrAttack = 'true';
        }
    }
}


function movePlayerTwo(player, playerPosition, playerCanMoveOrAttack, direction, movementDistance) {
    if (direction === 'onwards') {
        playerPosition -= movementDistance;
    } else if (direction === 'backwards') {
        playerPosition += movementDistance;
    }

    player.style.left = playerPosition + "%";
    player.dataset.playerPosition = playerPosition;

    if (playerCanMoveOrAttack === 'false') {
        if (direction === 'onwards') {
            player.src = "/static/images/asuka_walk.gif";
            player.dataset.canMoveOrAttack = 'true';
        } else if (direction === 'backwards') {
            player.src = "/static/images/asuka_backwalk.gif";
            player.dataset.canMoveOrAttack = 'true';
        }
    }
}


let playerOneBackToStance = function () {
    let playerOne = document.getElementById('player-one');
    playerOne.src = "/static/images/jin_stance.gif";
    playerOne.dataset.canMoveOrAttack = 'false';

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
