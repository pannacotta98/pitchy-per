const config = {
    width: 1024,
    height: 576,
    parent: "game", // id of DOM container
    render: Phaser.AUTO,
    antialiasing: true,
}

class Game extends Phaser.Game {
    constructor() {
        super(config);

        this.highScore = 0;

        this.state.add('boot', bootState);
        this.state.add('load', loadState);
        this.state.add('menu', menuState);
        this.state.add('play', playState);
        this.state.add('gameOver', gameOverState);
        this.state.add('calibrate', calibrateState);

        if (window.localStorage) {
            if (!localStorage.getItem('highScore')) {
                localStorage.setItem('highScore', '0');
            } else {
                // console.log(localStorage.getItem('highScore'));
                this.highScore = parseInt(localStorage.getItem('highScore'));
            }
        }

        this.minPitch = 50; // Hz
        this.maxPitch = 300; // Hz

        this.state.start('boot');
    }
}

function startGame() {
    new Game();
}

// load webfont, script included in html, seems to not aways work...
WebFont.load({
    active: startGame(), // start game when font is loaded
    google: {
        families: ['Slackey']
    }
});