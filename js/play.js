class playState extends Phaser.State {
    create() {
        this.game.time.advancedTiming = true; // for fps display
        

        this.game.stage.backgroundColor = "#ff0000";

        // add background
        // this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height - 128, 'gameBackground');
        // this.background.autoScroll(-this.backgroundSpeed, 0);
        // this.floor = this.add.tileSprite(0, this.game.height - 128, 1024, 128, 'floor');
        // this.floor.autoScroll(-this.backgroundSpeed, 0);
        // this.game.physics.enable(this.floor);
        // this.floor.body.immovable = true;


        // create player and add
        // this.player = new Player(this.game, 20, 50);
        // this.add.existing(this.player);
        // this.player.events.onKilled.add(this.gameOver, this);


        // this.obstacles = this.add.group();
        // this.obstacles.enableBody = true;
        // this.addObstacle();



        this.score = 0;
        this.scoreLabel = this.add.text(50, 50, 'score:\n' + this.score, {
            font: '25px Indie Flower', fill: '#000000', align: 'center'
        });
        this.scoreLabel.anchor.setTo(0.5, 0.5);
        this.scoreLabel.alignTo(this.camera.world.bounds, Phaser.TOP_CENTER, 0, -85);


        this.pitchDisp = this.add.text(50, 50, `pitch: `, {
            font: '25px Indie Flower', fill: '#000000', align: 'center'
        });
        // this.pitchDisp.anchor.setTo(0.5, 0.5);
        this.pitchDisp.alignTo(this.camera.world.bounds, Phaser.TOP_LEFT, -85, -85);

        // TEEEEST
        
        // setTimeout(this.testAudio.getPitch, 5000);
    }

    update() {
        // // checks for collision with floor and makes the player run if landing from jump
        // this.physics.arcade.collide(this.player, this.floor, (player, floor) => {
        //     if (player.isJumping) player.run();
        // });

        // this.physics.arcade.overlap(this.player, this.obstacles, (player, obstacle) => {
        //     player.damage(1);
        //     obstacle.destroy();
        //     this.updateLifeDisp();
        // }, null, this);

        // console.log(this.testAudio);
        
        
        this.pitchDisp.text = 'pitch: ' + Math.round(this.game.pitchAnalyzer.getPitch());
        this.incrementScore();
    }

    //debug stuff
    render() {
        // this.game.debug.body(this.player);
        // this.game.debug.bodyInfo(this.player, 32, 32);
        // this.game.debug.text(`totalElapsedSeconds : ${this.game.time.totalElapsedSeconds().toFixed(5)}`, 32, 32);
        // this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
        // this.obstacles.forEachAlive((member) => {this.game.debug.body(member);}, this);
        // this.game.debug.text(this.player.health, 100, 14,"#ffffff");
    }

    menu() {
        this.game.paused = false; // needed to work
        // this.gameMusic.stop();
        this.game.state.start('menu');
    }

    restart() {
        this.game.paused = false; // needed to work
        // this.gameMusic.stop();
        this.game.state.start('play');
    }

    gameOver() {
        this.gameMusic.stop();
        this.game.state.start('gameOver', true, false, this.score);
    }

    incrementScore() {
        this.score += 1;
        this.scoreLabel.text = 'score:\n' + this.score;
    }

}