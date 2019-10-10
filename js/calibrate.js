class calibrateState extends Phaser.State {
    preload() {
        
    }
    create() {
        this.game.minPitch = this.game.maxPitch = 0;
        
        this.hpsData = [];
        this.calibrating ='no'; //great stuff
        this.timeConstant = 120;

        const textStyle = { font: '50px Slackey', fill: '#ffffff', stroke: '#000000', strokeThickness: 6, align: 'center' };

        this.minDisp = this.add.text(0, 0, '', textStyle);
        this.minDisp.anchor.x = 0.5;
        this.minDisp.alignIn(this.camera.bounds, Phaser.TOP_LEFT, -250, -50);

        this.maxDisp = this.add.text(500, 0, '', textStyle).alignIn(this.camera.bounds, Phaser.TOP_RIGHT, -250, -50);
        this.maxDisp.anchor.x = 0.5;


        this.updatePitchDisp();

        this.calibrateLowButton = this.add.button(200, 200, 'calibrateButton', () => {
            this.calibrating='low'
            this.deactivateButtons([this.calibrateLowButton, this.calibrateHighButton]);
        }, this, 1, 0, 2, 0);
        // this.calibrateLowButton.anchor.y = this.calibrateHighButton.anchor.x = 0.5;
        this.calibrateLowButton.alignTo(this.minDisp, Phaser.BOTTOM_CENTER, 0, 50);

        this.calibrateHighButton = this.add.button(450, 200, 'calibrateButton', () => {
            this.calibrating='high';
            this.deactivateButtons([this.calibrateLowButton, this.calibrateHighButton]);
        }, this, 1, 0, 2, 0);
        // this.calibrateHighButton.anchor.y = this.calibrateHighButton.anchor.x = 0.5;
        this.calibrateHighButton.alignTo(this.maxDisp, Phaser.BOTTOM_CENTER, 0, 50);

        this.startButton = this.add.button(
            450, 400, 'calibrateButton', this.start, this, 1, 0, 2, 0);
        this.startButton.anchor.x = 0.5;
        this.startButton.alignIn(this.camera.bounds, Phaser.BOTTOM_CENTER, 0, -50);
        this.deactivateButtons([this.startButton]);


        const enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.addOnce(this.start, this);
    }

    update() {
        if (this.calibrating !== 'no') {
            if (this.hpsData.length < this.timeConstant) {
                const pitch = this.game.pitchAnalyzer.getPitch();
                if (pitch !== 0) this.hpsData.push(pitch);

            } else {
                const freq = this.mostFrequent(this.hpsData);
                this.hpsData = [];
                
                if (this.calibrating === 'low') {
                    if (this.game.maxPitch === 0 || freq < this.game.maxPitch) this.game.minPitch = freq;
                    else alert('Min pitch must be smaller than max pitch!');//SKRIK OM FEL
                } else if (this.calibrating === 'high') {
                    if (freq > this.game.minPitch) this.game.maxPitch = freq;
                    else alert('Max pitch must be bigger than min pitch!'); //KDFJKLDJKLFSJKLJKL
                }
               
                // reset calibration state
                this.calibrating = 'no';
                // reset buttons idk
                this.updatePitchDisp();

                this.activateButtons([this.calibrateLowButton, this.calibrateHighButton]);
                if (this.game.maxPitch > 0) this.activateButtons([this.startButton]);
            }
        }
    }

    mostFrequent(arr) {
        var mf = 1;
        var m = 0;
        var item;
        for (var i = 0; i < arr.length; i++) {
            for (var j = i; j < arr.length; j++) {
                if (arr[i] == arr[j])
                    m++;
                if (mf < m) {
                    mf = m;
                    item = arr[i];
                }
            }
            m = 0;
        }

        return item;
    }

    // deactivates the buttons referenced i arr
    deactivateButtons(arr) {
        arr.forEach((b) => {
            b.setFrames(2,2,2,2);
            b.input.enabled = false;
        });
    }

    activateButtons(arr) {
        arr.forEach((b) => {
            b.setFrames(1, 0, 2, 0);
            b.input.enabled = true;
        });
    }

    updatePitchDisp() {
        console.log('updated pitch');
        
        this.minDisp.setText(`min:\n${ Math.round(this.game.minPitch) } Hz`);
        this.maxDisp.setText(`max:\n${ Math.round(this.game.maxPitch) } Hz`);
    }

    start() {
        this.game.state.start('play');
    }

}