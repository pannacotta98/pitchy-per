class gameOverState extends Phaser.State {
    init(score) {
        this.score = score;
    }

    create() {
        this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
        this.background.alpha = 0.3;

        let newHighScore = false;

        if (this.score > this.game.highScore) {
            newHighScore = true;
            this.game.highScore = this.score;

            this.add.sound('highScore', 0.8).play();

            // save highscore to next session if localStorage is supported
            if (window.localStorage) {
                localStorage.setItem('highScore', this.game.highScore.toString());
            }
        } else {
            this.add.sound('gameOver').play();
        }
        //set background
        this.game.stage.backgroundColor = "#000000";
        // this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height - 128, 'gameBackground');
        // this.background.alpha = 0.3;
        // this.floor = this.add.tileSprite(0, this.game.height - 128, 1024, 128, 'floor');
        // this.floor.alpha = 0.3;

        this.calibrateButton = this.add.button(450, 400, 'calibrateButton', this.calibrate, this, 1, 0, 2, 0);
        this.calibrateButton.alignIn(this.camera.bounds, Phaser.BOTTOM_CENTER, 0, -200);
        this.startButton = this.add.button(450, 400, 'startButton', this.restart, this, 1, 0, 2, 0);
        this.startButton.alignIn(this.camera.bounds, Phaser.BOTTOM_CENTER, 0, -100);

        // show score/highscore
        let nameLabel = this.add.text(20, 10, `Game Over \nScore: ${this.score}`, { // newline to fix text being cut off
            font: '70px Slackey', fill: '#ffffff', stroke: '#000000', strokeThickness: 6
        });
        let highScoreText = this.game.add.text(20, 100, `High score: ${this.game.highScore}`, { // newline to fix text being cut off
            font: '40px Slackey', fill: '#ffffff', stroke: '#000000', strokeThickness: 6
        });
        const keyGuide = this.add.text(0, 0, 'Press Enter to restart', {
            font: '25px Slackey', fill: '#ffffff', stroke: '#000000', strokeThickness: 6
        }).alignIn(this.camera.bounds, Phaser.BOTTOM_CENTER, 0, -50);

        highScoreText.anchor.setTo(0.5, 0.5)
        highScoreText.alignTo(nameLabel, Phaser.BOTTOM_LEFT);

        if (newHighScore) {
            highScoreText.setText(`New high score: ${this.game.highScore}`);
            highScoreText.alignTo(nameLabel, Phaser.BOTTOM_LEFT);
            highScoreText.fill = '#ffd700'
            let colorText = this.add.tween(highScoreText.scale).to({ x: 1.1, y: 1.1 }, 500, "Linear", true, 500, 2, true);
        }

        const enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.addOnce(this.restart, this);
    }

    restart() {
        this.game.state.start('play');
    }

    calibrate() {
        this.game.state.start('calibrate');
    }
}