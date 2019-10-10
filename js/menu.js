class menuState extends Phaser.State {
    create() {
        //add background
        // this.game.stage.backgroundColor = "#000000";
        // this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height - 128, 'gameBackground');
        // this.background.alpha = 0.3;
        // this.floor = this.add.tileSprite(0, this.game.height - 128, 1024, 128, 'floor');
        // this.floor.alpha = 0.3;
        // this.game.physics.enable(this.floor);
        // this.floor.body.immovable = true;

        // //music
        // if (!this.game.menuMusic.isPlaying) {
        //     this.game.menuMusic.play();
        // }

        const calibrateButton = this.add.button(200, 200, 'calibrateButton', this.calibrate, this, 1, 0, 2, 0);

        this.logo = this.add.sprite(0, 0, 'character').alignIn(this.camera.bounds, Phaser.TOP_LEFT, 0, -50);


        // text
        let textText = this.add.text(0, 0, 'Pitchy Per', {
            font: '50px Slackey', fill: '#ffffff', stroke: '#000000', strokeThickness: 6
        }).alignTo(this.logo, Phaser.RIGHT_CENTER, 40, -30);

        const keyGuide = this.add.text(0, 0, 'Press Enter to start', {
            font: '25px Slackey', fill: '#ffffff', stroke: '#000000', strokeThickness: 6
        }).alignIn(this.camera.bounds, Phaser.BOTTOM_CENTER, 0, -50);

        this.add.text(0, 0, `Current High Score: ${this.game.highScore}`, {
            font: '25px Slackey', fill: '#ffffff', stroke: '#000000', strokeThickness: 6
        }).alignTo(textText, Phaser.BOTTOM_LEFT);

        // keyboard
        const enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.addOnce(this.start, this);


        this.add.sound('hej').play()
    }

    start() {
        this.game.state.start('play');
    }
    
    calibrate() {
        this.game.state.start('calibrate');
    }


    update() {
        // this.physics.arcade.collide(this.player, this.floor, (player, floor) => {
        //     if (player.isJumping) player.run();
        // });
    }

}