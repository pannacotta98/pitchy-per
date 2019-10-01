class playState extends Phaser.State {
    create() {
        this.game.time.advancedTiming = true; // for fps display
        
        this.game.stage.backgroundColor = "#000000"; 

        // add background
        this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
        this.background.autoScroll(-1000, 0);
        // this.floor = this.add.tileSprite(0, this.game.height - 128, 1024, 128, 'floor');
        // this.floor.autoScroll(-this.backgroundSpeed, 0);
        // this.game.physics.enable(this.floor);
        // this.floor.body.immovable = true;

        // create player and add
        // this.player = new Player(this.game, 20, 50);
        // this.add.existing(this.player);
        // this.player.events.onKilled.add(this.gameOver, this);

        this.obstacleSpeed = 500;
        this.obstacles = this.add.group();
        this.obstacles.enableBody = true;
        this.addObstacle();
         // add obstacles and lives all the time
        this.obstacleTimer = this.time.events.loop(1500, this.addObstacle, this);

        // create player
        this.player = new Player(this.game, 0, 50);
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
        const yVariations = [50, 95, 120, 140, 280];
        const xVariations = [-100, -55, 0, 50, 80];

        let yPosition = yVariations[this.rnd.between(0, 4)]
        let xPosition1 = xVariations[this.rnd.between(0, 4)]
        let xPosition2 = xVariations[this.rnd.between(0, 4)]

        let upperObstacle = this.obstacles.create(
            this.game.width + 300 + xPosition1,
            yPosition, //position of ground - desired height of obstacle
            'obstacle'
        );

        upperObstacle.body.setSize(350, 85, 20, 30);
        upperObstacle.anchor.setTo(0.5, 0.5);
        upperObstacle.lifespan = 20000;
        upperObstacle.body.velocity.x = - this.obstacleSpeed;

        let lowerObstacle = this.obstacles.create(
            this.game.width + 300 + xPosition2,
            yPosition + 300, //position of ground - desired height of obstacle
            'obstacle'
        );

        lowerObstacle.body.setSize(350, 85, 20, 30);
        lowerObstacle.anchor.setTo(0.5, 0.5);
        lowerObstacle.lifespan = 20000;
        lowerObstacle.body.velocity.x = - this.obstacleSpeed;

        console.log('created obstacles');
        
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