// TODO remove old stuff!
class Player extends Phaser.Sprite {
    constructor(game, x, y) {
<<<<<<< HEAD
        super(game, x, y, game.selectedChar, 'char'); // tappar ner spealren från toppen hehe!!!
=======
        super(game, x, y, 'character'); // tappar ner spealren från toppen hehe!!!
>>>>>>> 0ace5fea86d7291c9bab7ec1528df42f600d7b9e

        this.health = 1;

        this.game.physics.enable(this);
        // this.body.gravity.y = 1500;
        // this.body.allowGravity = true;
        this.body.collideWorldBounds = true;

        this.minPitch = 50; // Hz
        this.maxPitch = 300; // Hz

        // this.jump = this.jump.bind(this);
    }

    update() {
        let boundedPitch = this.game.pitchAnalyzer.getPitch();

        // probably temporary
        if (boundedPitch === 0) {
            return;
            // this.y = (this.y >= 1) ? this.y - 0.001 : 0; 
        }

        // make sure boundedPitch is in the range [minPitch, maxPitch]
        boundedPitch = Math.max(this.minPitch, Math.min(this.maxPitch, boundedPitch));

        // smoothing the movement
        const finalDest = this.game.height - ((boundedPitch - this.minPitch)/(this.maxPitch-this.minPitch))
                        * this.game.height;
        const movement = (finalDest - this.y) / 10;

        this.y += movement;
    }


    damage(amount) {
        super.damage(amount);
        // this.animations.play('damage');

        return this;
    }

}