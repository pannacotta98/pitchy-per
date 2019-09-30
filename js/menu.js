class menuState extends Phaser.State {
    create() {
        //add background
        this.game.stage.backgroundColor = "#000000";
        this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height - 128, 'gameBackground');
        this.background.alpha = 0.3;
        this.floor = this.add.tileSprite(0, this.game.height - 128, 1024, 128, 'floor');
        this.floor.alpha = 0.3;
        this.game.physics.enable(this.floor);
        this.floor.body.immovable = true;

        // //music
        // if (!this.game.menuMusic.isPlaying) {
        //     this.game.menuMusic.play();
        // }


        this.logo = this.add.sprite(0, 0, 'logo').alignIn(this.camera.bounds, Phaser.TOP_LEFT, -50, -50);


        // text
        let textText = this.add.text(0, 0, 'Pitchy Per', {
            font: '50px Indie Flower', fill: '#ffffff', stroke: '#000000', strokeThickness: 6
        }).alignTo(this.logo, Phaser.RIGHT_CENTER, 10, 0);

        this.add.text(0, 0, `Current High Score: ${this.game.highScore}`, {
            font: '25px Indie Flower', fill: '#ffffff', stroke: '#000000', strokeThickness: 6
        }).alignTo(textText, Phaser.BOTTOM_LEFT, -15);

        // keyboard
        const enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.addOnce(this.start, this);
    }

    start() {
        this.game.state.start('play');
    }


    update() {
        this.physics.arcade.collide(this.player, this.floor, (player, floor) => {
            if (player.isJumping) player.run();
        });
    }

}