// 键盘函数
function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.key === key.value) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.key === key.value) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener(
        "keydown", downListener, false
    );
    window.addEventListener(
        "keyup", upListener, false
    );

    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };

    return key;
}

// 键盘控制移动
export function keyMove(person) {
    let left = keyboard('a'), up = keyboard('w'), right = keyboard('d'), down = keyboard('s');
    let lTimer, fTimer, uTimer, dTimer
    left.press = () => {
        // 按键按下使用动作状态
        lTimer = setInterval(() => {
            // person.playAnimation(person.states.walkLeft);
            person.moveLeft(80);
        }, 200)
    };
    left.release = () => {
        // 停止动作状态
        // person.stopAnimation();
        clearInterval(lTimer);
    };
    right.press = () => {
        fTimer = setInterval(() => {
            // person.playAnimation(person.states.walkRight);
            person.moveRight(80);
        }, 200)
    };
    right.release = () => {
        // person.stopAnimation();
        clearInterval(fTimer);
    };
    up.press = () => {
        uTimer = setInterval(() => {
            // person.playAnimation(person.states.walkUp);
            person.moveTop(80);
        }, 200)
    };
    up.release = () => {
        // person.stopAnimation();
        clearInterval(uTimer);
    };
    down.press = () => {
        dTimer = setInterval(() => {
            // person.playAnimation(person.states.walkDown);
            person.moveDown(80);
        }, 200)
    };
    down.release = () => {
        // person.stopAnimation();
        clearInterval(dTimer);
    };
}