// TODO remove old stuff!
class Player extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'character'); // tappar ner spealren från toppen hehe!!!

        this.health = 5;

        this.game.physics.enable(this);
        // this.body.gravity.y = 1500;
        // this.body.allowGravity = true;
        this.body.collideWorldBounds = true;

        this.body.setSize(100, 100, 5, 15);

        this.crashSound = this.game.add.sound('crash');

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
        boundedPitch = Math.max(this.game.minPitch, Math.min(this.game.maxPitch, boundedPitch));

        // smoothing the movement
        const finalDest = this.game.height - ((boundedPitch - this.game.minPitch)/(this.game.maxPitch-this.game.minPitch))
                        * this.game.height;
        const movement = (finalDest - this.y) / 10;

        this.y += movement;
    }


    damage(amount) {
        super.damage(amount);
        this.crashSound.play();
        return this;
    }
}