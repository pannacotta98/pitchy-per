// TODO remove old stuff!
class Player extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, game.selectedChar, 'jump.png'); // tappar ner spealren från toppen hehe!!!

        this.health = 1;

        this.game.physics.enable(this);
        this.body.gravity.y = 1500;
        this.body.allowGravity = true;
        this.body.collideWorldBounds = true;


        // this.jump = this.jump.bind(this);
    }


    damage(amount) {
        super.damage(amount);
        this.animations.play('damage');
        this.hurtSound.play();

        return this;
    }

}