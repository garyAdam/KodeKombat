// let playerMovement = function (event) {
//     let movementDistance = 0.7;
//
//     let playerOne = document.getElementById('player-one');
//     let playerOnePosition = parseFloat(playerOne.dataset.playerPosition);
//     let playerOneCanMoveOrAttack = playerOne.dataset.canMoveOrAttack;
//
//     let playerTwo = document.getElementById('player-two');
//     let playerTwoPosition = parseFloat(playerTwo.dataset.playerPosition);
//     let playerTwoCanMoveOrAttack = playerTwo.dataset.canMoveOrAttack;
//
//     /*
//     KEY CODES:
//
//     65 - a
//     68 - d
//     69 - e
//     74 - j
//     76 - l
//     85 - u
//
//      */
//
//     if (event.keyCode === 68) {
//         movePlayer(playerOne, 'right', movementDistance);
//     }
//     if (event.keyCode === 65) {
//         movePlayer(playerOne, 'left', movementDistance);
//     }
//
//     if (event.keyCode === 69) {
//         if (playerOneCanMoveOrAttack === 'false') {
//             playerOne.src = "/static/images/jin_punch.gif";
//             playerOne.dataset.canMoveOrAttack = 'true';
//             if (playerTwoPosition - playerOnePosition < 17){
//                 playerTwo.dataset.hp -= 10;
//                 updateHPBar('player-two');
//         }
//         }
//     }
//
//     if (event.keyCode === 74) {
//         movePlayer(playerTwo, 'left', movementDistance);
//     }
//
//     if (event.keyCode === 76) {
//         movePlayer(playerTwo, 'right', movementDistance);
//     }
//
//     if (event.keyCode === 85) {
//         if (playerTwoCanMoveOrAttack === 'false') {
//             playerTwo.src = "/static/images/asuka_punch_new.gif";
//             playerTwo.dataset.canMoveOrAttack = 'true';
//             if (playerTwoPosition - playerOnePosition < 12){
//                 playerOne.dataset.hp -= 10;
//                 updateHPBar('player-one');
//         }
//     }}
//
//     function movePlayer(player, direction, movementDistance) {
//         if (player === playerOne) {
//             if (direction === 'right' && playerOnePosition < playerTwoPosition - 10) {
//                 playerOnePosition += movementDistance;
//             } else if (direction === 'left' && playerOnePosition > 3) {
//                 playerOnePosition -= movementDistance;
//             }
//
//             player.style.left = playerOnePosition + "%";
//             player.dataset.playerPosition = playerOnePosition;
//
//             if (playerOneCanMoveOrAttack === 'false') {
//                 if (direction === 'right') {
//                     player.src = "/static/images/jin_walk.gif";
//                     player.dataset.canMoveOrAttack = 'true';
//                 } else if (direction === 'left') {
//                     player.src = "/static/images/jin_backwalk.gif";
//                     player.dataset.canMoveOrAttack = 'true';
//                 }
//             }
//         } else {
//             if (direction === 'right' && playerTwoPosition < 87) {
//                 playerTwoPosition += movementDistance;
//             } else if (direction === 'left' && playerOnePosition +10 < playerTwoPosition) {
//                 playerTwoPosition -= movementDistance;
//             }
//
//
//             player.style.left = playerTwoPosition + "%";
//             player.dataset.playerPosition = playerTwoPosition;
//
//             if (playerTwoCanMoveOrAttack === 'false') {
//                 if (direction === 'left') {
//                     player.src = "/static/images/asuka_walk.gif";
//                     player.dataset.canMoveOrAttack = 'true';
//                 } else if (direction === 'right') {
//                     player.src = "/static/images/asuka_backwalk.gif";
//                     player.dataset.canMoveOrAttack = 'true';
//                 }
//
//             }
//         }
//
//     }
//
// };
//
//
//
//
// let playerOneBackToStance = function () {
//     let playerOne = document.getElementById('player-one');
//     setTimeout(function () {
//         playerOne.src = "/static/images/jin_stance.gif";
//         playerOne.dataset.canMoveOrAttack = 'false';
//
//     }, 500);
//
//
// };
//
//
// let playerTwoBackToStance = function () {
//     let playerTwo = document.getElementById('player-two');
//     playerTwo.src = "/static/images/asuka_stance.gif";
//     playerTwo.dataset.canMoveOrAttack = 'false';
//
// };
//
//
// let init = function () {
//     addEventListener('keydown', playerMovement, false);
//     addEventListener('keyup', playerOneBackToStance, false);
//     addEventListener('keyup', playerTwoBackToStance, false);
// };
//
//
// let updateHPBar = function(playerID) {
//     let player = document.getElementById(playerID);
//     let playerActualHP = player.dataset.hp;
//
//     let playerHPbar = document.getElementById(`${playerID}-HP`).firstElementChild;
//     playerHPbar.style.width = (parseInt(playerActualHP) * 0.3) + 'vw';
// };
//
//
// init();
//
//

let playerBackToStance = function (player, stanceAnimation) {
    let playerElement = document.getElementById(player);
    playerElement.src = stanceAnimation;
    playerElement.dataset.canMoveOrAttack = 'false';
};



let init = function () {
    let movementDistance = 0.7;

    let playerOne = document.getElementById('player-one');
    let playerOnePosition = parseFloat(playerOne.dataset.playerPosition);
    let playerOneCanMoveOrAttack = playerOne.dataset.canMoveOrAttack;

    let playerTwo = document.getElementById('player-two');
    let playerTwoPosition = parseFloat(playerTwo.dataset.playerPosition);
    let playerTwoCanMoveOrAttack = playerTwo.dataset.canMoveOrAttack;

    let keysDown = {};

    const aKey = 65;
    const dKey = 68;
    const eKey = 69;
    const jKey = 74;
    const lKey = 76;
    const uKey = 85;

    let keyAnimationsP1 = new Map();

    keyAnimationsP1.set(aKey, "/static/images/jin_backwalk.gif");
    keyAnimationsP1.set(dKey, "/static/images/jin_walk.gif");
    keyAnimationsP1.set(eKey, "/static/images/jin_punch.gif");

    let keyAnimationsP2 = new Map();

    keyAnimationsP2.set(lKey, "/static/images/asuka_backwalk.gif");
    keyAnimationsP2.set(jKey, "/static/images/asuka_walk.gif");
    keyAnimationsP2.set(uKey, "/static/images/asuka_punch_new.gif");

    const p1StanceAnimation = "/static/images/jin_stance.gif";
    const p2StanceAnimation = "/static/images/asuka_stance.gif";


    addEventListener("keydown", function (event) {
        let pressedKey = event.keyCode;
        for (const key of keyAnimationsP1.keys()) {
            if (pressedKey === key && !keysDown[key]) {
                if (playerOneCanMoveOrAttack === 'false') {
                    playerOne.src = keyAnimationsP1.get(key);
                    playerOne.dataset.canMoveOrAttack = 'true';
                }
            }
        }

        for (const key of keyAnimationsP2.keys()) {
            if (pressedKey === key && !keysDown[key]) {
                if (playerTwoCanMoveOrAttack === 'false') {
                    playerTwo.src = keyAnimationsP2.get(key);
                    playerTwo.dataset.canMoveOrAttack = 'true';
                }
            }
        }

        keysDown[pressedKey] = true;

        if (dKey in keysDown) { // P1 pressed walk to the right (key: d), key code: 68
            playerOnePosition += movementDistance;
            playerOne.dataset.playerPosition = playerOnePosition;
            playerOne.style.left = playerOnePosition + "%";
        }

        if (aKey in keysDown) { // P1 pressed walk to the left (key: a), key code: 65
            playerOnePosition += -(movementDistance);
            playerOne.dataset.playerPosition = playerOnePosition;
            playerOne.style.left = playerOnePosition + "%";
        }

        if (eKey in keysDown) { // P1 pressed punch (key: e), key code: 69
            playerOne.dataset.canMoveOrAttack = 'true';
        }

        if (jKey in keysDown) { // P2 pressed walk to the left (key: j), key code: 74
            playerTwoPosition += -(movementDistance);
            playerTwo.dataset.playerPosition = playerTwoPosition;
            playerTwo.style.left = playerTwoPosition + "%";
        }

        if (lKey in keysDown) { // P2 pressed walk to the right (key: l), key code 76
            playerTwoPosition += movementDistance;
            playerTwo.dataset.playerPosition = playerTwoPosition;
            playerTwo.style.left = playerTwoPosition + "%";
        }

        if (uKey in keysDown) { // P2 pressed punch (key: u), key code: 85
            playerTwo.dataset.canMoveOrAttack = 'true';
        }
    }, false);


    addEventListener("keyup", function (event) {
        let pressedKey = event.keyCode;
        if (pressedKey === dKey || pressedKey === eKey || pressedKey === aKey) {
            playerBackToStance('player-one', p1StanceAnimation)
        }

        if (pressedKey === jKey || pressedKey === lKey || pressedKey === uKey) {
            playerBackToStance('player-two', p2StanceAnimation)
        }
        delete keysDown[pressedKey];
    }, false);
};


init();
