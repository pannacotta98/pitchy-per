class bootState extends Phaser.State {
    preload() {
        //load loading bar image
        this.game.load.image('loadingBar', './assets/loadingBar.png');
    }
    create() {
        this.game.sound.volume = 0.8;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.state.start('load');
    }
}

class loadState extends Phaser.State {
    preload() {
        this.loadingBar = this.add.sprite(112, 300, 'loadingBar');
        this.load.setPreloadSprite(this.loadingBar);

        // this.game.load.image('logo', './assets/images/Unilife.png');

        // // character sprites
        // this.game.load.atlasJSONHash('william', './assets/images/william.png', './assets/images/william.json');

        // // button textures
        // this.game.load.atlasJSONHash('pen', './assets/images/pen_sheet.png', './assets/images/pen_sheet.json');


        // //music
        // this.game.load.audio('gameMusic', './assets/sound/game_music.wav');
        // this.game.load.audio('menuMusic', './assets/sound/menu_music.mp3');
    }

    create() {
        this.game.menuMusic = this.game.sound.add('menuMusic', 1, true);
        this.loadingBar.cropEnabled = false;
        this.game.state.start('menu');
    }

}