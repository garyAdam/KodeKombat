let updateHPBar = function (playerID) {
    let player = document.getElementById(playerID);
    let playerActualHP = player.dataset.hp;

    let playerHPbar = document.getElementById(`${playerID}-HP`).childNodes[3];
    playerHPbar.style.width = (parseInt(playerActualHP) * 0.3) + 'vw';

    let playerDelayedHPbar = document.getElementById(`${playerID}-HP`).childNodes[1];
    setTimeout(() => {
        playerDelayedHPbar.style.width = (parseInt(playerActualHP) * 0.3) + 'vw'
    }, 500);
};


let playerBackToStance = function (player, stanceAnimation) {
    let playerElement = document.getElementById(player);
    playerElement.src = stanceAnimation;
    playerElement.dataset.canMoveOrAttack = 'false';

};

let showEntirePunch = function(playerID) {
    let gifSource = playerID === 'player-one' ? '/static/images/jin_punch.gif' : '/static/images/asuka_punch_new.gif';
    let attackDelay = playerID === 'player-one' ? 800 : 900;

    let player = document.getElementById(playerID);
    let playerClone = document.createElement('img');
    playerClone.src = gifSource;
    playerClone.classList.add(playerID);
    playerClone.style.left = player.dataset.playerPosition + 'vw';
    playerClone.style.transform = playerID === 'player-one' ? 'translate(-22%,0)' : 'translate(-32%,0)';

    document.body.appendChild(playerClone);
    player.setAttribute('hidden', '');
    setTimeout(() => {playerClone.remove();
                      player.removeAttribute('hidden');
                     }, attackDelay);
    setTimeout(() => {player.dataset.canAttack = 'false'}, 1000)
};


let init = function () {
    function endGame(losingPlayer, winningPlayer, playerLoseAnimationWithoutExt, playerStanceAnimation) {

        removeEventListener("keydown", onKeyDown, false);
        removeEventListener("keyup", onKeyUp, false);
        losingPlayer.src = playerLoseAnimationWithoutExt + ".gif";
        winningPlayer.src = playerStanceAnimation;
        setTimeout(function () {
            losingPlayer.src = playerLoseAnimationWithoutExt + ".png";
        },2000)
    }

    let movementDistance = 0.7;
    let knockbackDistance = 9;

    let playerOne = document.getElementById('player-one');
    let playerOnePosition = parseFloat(playerOne.dataset.playerPosition);
    let playerOneCanMoveOrAttack = playerOne.dataset.canMoveOrAttack; //need refactoring

    let playerTwo = document.getElementById('player-two');
    let playerTwoPosition = parseFloat(playerTwo.dataset.playerPosition);
    let playerTwoCanMoveOrAttack = playerTwo.dataset.canMoveOrAttack; //need refactoring

    let playerOneStartPosition = 3;
    let playerTwoStartPosition = 82;

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

    let keyAnimationsP2 = new Map();

    keyAnimationsP2.set(lKey, "/static/images/asuka_backwalk.gif");
    keyAnimationsP2.set(jKey, "/static/images/asuka_walk.gif");

    const p1StanceAnimation = "/static/images/jin_stance.gif";
    const p2StanceAnimation = "/static/images/asuka_stance.gif";
    const p1LoseAnimationWithoutExt = "/static/images/jin_lose";
    const p2LoseAnimationWithoutExt = "/static/images/asuka_lose";

    addEventListener("keydown", onKeyDown, false);

    function onKeyDown(event) {
        let playerOneCanAttack = playerOne.dataset.canAttack;
        let playerTwoCanAttack = playerTwo.dataset.canAttack;

        let playersNotCrossing = playerOnePosition + 10 < playerTwoPosition;
        let playerOneStayInWindow = playerOnePosition > playerOneStartPosition;
        let playerTwoStayInWindow = playerTwoPosition < playerTwoStartPosition;
        let playerTwoInPunchRange = playerTwoPosition - playerOnePosition < 17;
        let playerOneInPunchRange = playerTwoPosition - playerOnePosition < 12;

        let pressedKey = event.keyCode;
        for (const key of keyAnimationsP1.keys()) {
            if (pressedKey === key && !keysDown[key]) {
                if (playerOneCanMoveOrAttack === 'false') {
                    playerOne.src = keyAnimationsP1.get(key);
                    playerOne.dataset.canMoveOrAttack = 'true';
                }
            }
        }

        if (pressedKey === eKey && !keysDown[eKey]) { // P1 pressed punch (key: e), key code: 69
            if (playerOneCanAttack === 'false') {
                playerOne.dataset.canAttack = 'true';
                showEntirePunch('player-one');
                if (playerTwoInPunchRange) {
                    playerTwo.dataset.hp -= 10;
                    updateHPBar('player-two');
                    if (playerTwoStayInWindow) { //NEED CHANGE
                        playerTwoPosition += knockbackDistance;
                        playerTwo.dataset.playerPosition = playerTwoPosition;
                        playerTwo.style.left = playerTwoPosition + "%";
                    }
                    if (playerTwo.dataset.hp <= 0) {
                        endGame(playerTwo, playerOne, p2LoseAnimationWithoutExt, p1StanceAnimation);
                    }
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

        if (pressedKey === uKey && !keysDown[uKey]) { // P2 pressed punch (key: u), key code: 85
            if (playerTwoCanAttack === 'false') {
                playerTwo.dataset.canAttack = 'true';
                showEntirePunch('player-two');
                if (playerOneInPunchRange) {
                    playerOne.dataset.hp -= 10;
                    updateHPBar('player-one');
                    if (playerOneStayInWindow) { // NEED CHANGE
                        playerOnePosition += -(knockbackDistance);
                        playerOne.dataset.playerPosition = playerOnePosition;
                        playerOne.style.left = playerOnePosition + "%";
                    }
                    if (playerOne.dataset.hp <= 0) {
                        endGame(playerOne, playerTwo, p1LoseAnimationWithoutExt, p2StanceAnimation);
                    }
                }
            }
        }

        keysDown[pressedKey] = true;

        if (dKey in keysDown && playersNotCrossing) { // P1 pressed walk to the right (key: d), key code: 68
            playerOnePosition += movementDistance;
            playerOne.dataset.playerPosition = playerOnePosition;
            playerOne.style.left = playerOnePosition + "%";

        }

        if (aKey in keysDown && playerOneStayInWindow) { // P1 pressed walk to the left (key: a), key code: 65
            playerOnePosition += -(movementDistance);
            playerOne.dataset.playerPosition = playerOnePosition;
            playerOne.style.left = playerOnePosition + "%";
        }

        if (jKey in keysDown && playersNotCrossing) { // P2 pressed walk to the left (key: j), key code: 74
            playerTwoPosition += -(movementDistance);
            playerTwo.dataset.playerPosition = playerTwoPosition;
            playerTwo.style.left = playerTwoPosition + "%";
        }

        if (lKey in keysDown && playerTwoStayInWindow) { // P2 pressed walk to the right (key: l), key code 76
            playerTwoPosition += movementDistance;
            playerTwo.dataset.playerPosition = playerTwoPosition;
            playerTwo.style.left = playerTwoPosition + "%";
        }

    };


    addEventListener("keyup", onKeyUp, false);

    function onKeyUp(event) {
        let pressedKey = event.keyCode;
        if (pressedKey === dKey || pressedKey === eKey || pressedKey === aKey) {
            playerBackToStance('player-one', p1StanceAnimation)
        }

        if (pressedKey === jKey || pressedKey === lKey || pressedKey === uKey) {
            playerBackToStance('player-two', p2StanceAnimation)
        }
        delete keysDown[pressedKey];
    }
};


init();
