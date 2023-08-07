import MovableSprite from "../characters/movable-sprite";

// 键盘函数
function keyboard(value: string) {
    let key = {
        value: value,
        isDown: false,
        isUp: true,

        press: () => { },
        release: () => { },
        downHandler: (event: any) => {
            if (event.key === key.value) {
                if (key.isUp && key.press) key.press();
                key.isDown = true;
                key.isUp = false;
                event.preventDefault();
            }
        },
        upHandler: (event: any) => {
            if (event.key === key.value) {
                if (key.isDown && key.release) key.release();
                key.isDown = false;
                key.isUp = true;
                event.preventDefault();
            }
        },
        unsubscribe: () => {
            window.removeEventListener("keydown", downListener);
            window.removeEventListener("keyup", upListener);
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

    return key;
}

// 键盘控制移动
export function keyMove(person: MovableSprite) {
    let left = keyboard('a'), up = keyboard('w'), right = keyboard('d'), down = keyboard('s');
    let lTimer: number, fTimer: number, uTimer: number, dTimer: number
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