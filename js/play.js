class playState extends Phaser.State {
    create() {
        this.game.time.advancedTiming = true; // for fps display
        

        this.game.stage.backgroundColor = "#000000"; 

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


        this.obstacleSpeed = 90;
        this.obstacles = this.add.group();
        this.obstacles.enableBody = true;
        this.addObstacle();
         // add obstacles and lives all the time
        this.obstacleTimer = this.time.events.loop(2000, this.addObstacle, this);


        // create player
        this.player = new Player(this.game, 20, 50);
        this.add.existing(this.player);
        this.player.events.onKilled.add(this.gameOver, this);


        // setup score label
        this.score = 0;
        this.scoreLabel = this.add.text(50, 50, 'score:\n' + this.score, {
            font: '25px Slackey', fill: '#ffffff', align: 'center'
        });
        this.scoreLabel.anchor.setTo(0.5, 0.5);
        this.scoreLabel.alignTo(this.camera.world.bounds, Phaser.TOP_CENTER, 0, -85);


        // display pitch (for testing)
        this.pitchDisp = this.add.text(50, 50, `pitch: `, {
            font: '25px Slackey', fill: '#ffffff', align: 'center'
        });
        this.pitchDisp.alignTo(this.camera.world.bounds, Phaser.TOP_LEFT, -85, -85);
    }

    update() {
        // // checks for collision with floor and makes the player run if landing from jump
        // this.physics.arcade.collide(this.player, this.floor, (player, floor) => {
        //     if (player.isJumping) player.run();
        // });

        this.physics.arcade.overlap(this.player, this.obstacles, (player, obstacle) => {
            player.damage(1);
            obstacle.destroy();
        }, null, this);

        
        // update pitch display (for testing)
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

    addObstacle() {
        const obstaclePosition = [30, 45, 200, 230];

        let newObstacle = this.obstacles.create(
            this.game.width + 50,
            obstaclePosition[this.rnd.between(0, 3)], //position of ground - desired height of obstacle
            'obstacle'
        );
        // newObstacle.body.setSize(24, 24, -10, 4); // verkar funka med 24x32-bild
        newObstacle.anchor.setTo(0.5, 0.5);
        newObstacle.lifespan = 20000;
        newObstacle.body.velocity.x = - this.obstacleSpeed;

        console.log('created obstacle');
        
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
        this.game.state.start('gameOver', true, false, this.score);
    }

    incrementScore() {
        this.score += 1;
        this.scoreLabel.text = 'score:\n' + this.score;
    }

}