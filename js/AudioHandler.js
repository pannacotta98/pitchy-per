// TODO experiemtn with hpsFactor and fftlength? zero padding
class AudioHandler {
    constructor() {
        this.hpsFactors = 5;

        // fftSize must be a power of 2 between 2^5 and 2^15,
        // so one of: 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, and 32768.
        // Defaults to 2048. // MDN
        this.fftSize = 4096;

        this.smoothingTimeConstant = 0.9; // default: 0.8
    }
    
    // makes the AudioHandler ready for use with the input stream 'stream'
    initialize(stream) {
        this.ctx = new AudioContext();
        this.mic = this.ctx.createMediaStreamSource(stream);
        this.analyzer = this.ctx.createAnalyser();

        // set parameters for the analyzer node
        this.analyzer.fftSize = this.fftSize;
        this.analyzer.smoothingTimeConstant = this.smoothingTimeConstant;
    
        this.mic.connect(this.analyzer);
    
        this.rawPitchData = new Uint8Array(this.analyzer.frequencyBinCount); // float vs byte?
    }

    // returns raw frequency data from fft (not int Hz!)
    getFrequencySpectrum() {
        this.analyzer.getByteFrequencyData(this.rawPitchData);
        return this.rawPitchData;
    }

    // returns the frequency spectrum formatted as an array with
    // pairs of the form [freq, level] (for graphing purposes)
    getFrequencySpectrumPairs() {
        this.analyzer.getByteFrequencyData(this.rawPitchData);
        const pairArray = [];

        for (let i = 0; i < this.rawPitchData.length; i++) {
            pairArray.push( [this.toHertz(i), this.rawPitchData[i]] );
        }
        return pairArray;
    }

    // returns the harmonic product spectrum formatted as an array with
    // pairs of the form [freq, level] (for graphing purposes)
    getHarmonicSpectrumPairs() {
        const harmonicProductSpectrum = this.getHarmonicProductSpectrum();
        const pairArray = [];
        
        for (let i = 0; i < harmonicProductSpectrum.length; i++) {
            pairArray.push([this.toHertz(i), harmonicProductSpectrum[i]]);
        }
        return pairArray;
    }
    
    // returns frequency of the biggest peak in frequency spectrum in Hz
    getStrongestFrequency() {
        this.analyzer.getByteFrequencyData(this.rawPitchData);
        
        let strongest = 0;
        for (let i = 0; i < this.analyzer.frequencyBinCount; i++) {
            if (this.rawPitchData[i] > this.rawPitchData[strongest]) {
                strongest = i;
            }
        }

        return this.toHertz(strongest);
    }
    
    // !(returns frequency of the biggest peak in HPS in Hz) changed maybe
    getPitch() {
        const harmonicProductSpectrum = this.getHarmonicProductSpectrum();
        
        // find stronges freq after HPS, and the strongest peak with a lower frequency
        let strongest = 0, strongestBelow = 0;
        for (let i = 0; i < this.analyzer.frequencyBinCount; i++) {
            if (harmonicProductSpectrum[i] > harmonicProductSpectrum[strongest]) {
                strongestBelow = strongest;
                strongest = i;
            }
        }

        // try to fix octave error
        // TODO fixa lite enligt mailet
        if (Math.abs(strongestBelow - strongest*0.5) < 10 // 10? 5 eller 6 kanske
            && harmonicProductSpectrum[strongestBelow] / harmonicProductSpectrum[strongest] > 0.2) {
                
            // console.log('corrected octave');
            return this.toHertz(strongestBelow)
        } else {
            return this.toHertz(strongest)
        }
        // return this.toHertz(strongest);



        // // try to fix octave error
        // let octaveBelowStrength = 0;
        // let octaveCorrection = 0;
        // [Math.floor(strongest/2) - 1, Math.floor(strongest/2), Math.floor(strongest/2) + 1].forEach((i) => {
        //     if (harmonicProductSpectrum[i] > octaveBelowStrength 
        //         && harmonicProductSpectrum[i] > 0.7*strongest) {
                
        //         octaveBelowStrength = harmonicProductSpectrum[i];
        //         octaveCorrection = i;
        //     }
        // })

        // return (octaveBelowStrength > 0) ? this.toHertz(octaveCorrection) : this.toHertz(strongest)

        

    }
    
    // returns raw harmonic product spectrum
    getHarmonicProductSpectrum() {
        this.analyzer.getByteFrequencyData(this.rawPitchData);
        let harmonicProductSpectrum = Array.from(this.rawPitchData);
        
        for (let i = 0; i < harmonicProductSpectrum.length / 5; i++) {
            for (let j = 2; j <= this.hpsFactors; j++) {
                harmonicProductSpectrum[i] *= this.rawPitchData[j*i];
            }
        }
        return harmonicProductSpectrum;
    }
    
    // transforms fft frequency value 'k' to frequency in Hz
    toHertz(k) {
        return k * this.ctx.sampleRate / this.analyzer.fftSize;
    }
    
    // downsamples array by removing samples
    // returns an array with every 'factor' item from 'inputArray' starting at 0
    simpleDownSample(inputArray, factor) {
        const newArray = [];
        
        for (let i = 0; i < inputArray.length; i++) {
            if (i % factor === 0) { 
                newArray.push(inputArray[i]);
            }
        }
        
        return newArray;
    }
}