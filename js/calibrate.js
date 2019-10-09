class calibrateState extends Phaser.State {
    preload() {
        
    }
    create() {
        this.game.minPitch = this.game.maxPitch = 0;
        
        this.hpsData = [];
        this.calibrating ='no';
        this.timeConstant = 120;

    }

    update() {
        if (this.calibrating !== 'no') {
            if (this.hpsData.length < this.timeConstant) {
                const pitch = this.game.pitchAnalyzer.getPitch();
                if (pitch !== 0) this.hpsData.push(pitch);
            } else {
                console.log(this.hpsData);
                
                const freq = this.mostFrequent(this.hpsData);
                console.log(freq);
                this.calibrating = 'no';
                this.hpsData = [];

                if (this.calibrating === 'low') {
                    if (this.game.maxPitch === 0 || freq < this.maxPitch) this.game.minPitch = freq;
                    else ;//SKRIK OM FEL
                } else if (this.calibrating === 'high') {
                    if (freq > this.minPitch) this.game.maxPitch = freq;
                    else ; //KDFJKLDJKLFSJKLJKL
                }

                // reset calibration state
                this.calibrating = 'no';
                // reset buttons idk
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
}