class audioAnalyzer {
    constructor() {
        navigator.getUserMedia = navigator.getUserMedia
                              || navigator.webkitGetUserMedia
                              || navigator.mozGetUserMedia;

        // ask for permission to use mic, if successfull setup audio
        navigator.getUserMedia({ video : false, audio : true }, (stream) => {
            this.ctx = new AudioContext();
            this.mic = this.ctx.createMediaStreamSource(stream);
            this.analyzer = this.ctx.createAnalyser();

            this.mic.connect(this.analyzer);

            this.rawPitchData = new Uint8Array(this.analyzer.frequencyBinCount); // float vs byte?

        }, console.log);
        
        console.log('audioAnalyzer created', this);
        
    }
    
    getPitch = () => {
        
        console.log(this.analyzer);
        this.analyzer.getByteFrequencyData(this.rawPitchData);
        


        let harmonicProductSpectrum = Array.from(this.rawPitchData);

        // tots great code
        const half   = this.simpleDownSample(this.rawPitchData, 2);
        const third  = this.simpleDownSample(this.rawPitchData, 3);
        const fourth = this.simpleDownSample(this.rawPitchData, 4);
        const fifth  = this.simpleDownSample(this.rawPitchData, 5);
        
        for (let i = 0; i < fifth.length; i++) {
            harmonicProductSpectrum[i] *= half[i] * third[i] * fourth[i] * fifth[i];
        }

        console.log(harmonicProductSpectrum);
        

        // find stronges freq after HPS
        let strongest = 0;
        for (let i = 0; i < this.analyzer.frequencyBinCount; i++) {
            if (harmonicProductSpectrum[i] > harmonicProductSpectrum[strongest]) {
                strongest = i;
            }
        }

        return (strongest * this.ctx.sampleRate / this.analyzer.fftSize);
    }


    // downsamples array by removing samples 
    simpleDownSample(array, factor) {
        const newArray = [];

        for (let i = 0; i < array.length; i++) {
            if (i % factor == 0) { 
                newArray.push(array[i]);
            }
        }
        return newArray;
    }
}