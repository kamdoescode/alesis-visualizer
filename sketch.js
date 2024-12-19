let song;
let button;
let fft;
let volhistory = [];
let w;


function preload() {
  song = loadSound("AlesisLive.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  button = createButton("play");
  button.position(10, windowHeight - 50);
  button.mousePressed(togglePlaying);
  fft = new p5.FFT(0.9, 128);
  w = width/64
}


function draw() {
  background(0);
  let spectrum = fft.analyze();
  for(let i = 0; i < spectrum.length; i++){
    var amp = spectrum[i];
    var y = map(amp, 0, 256, height, 0);
    fill(i, 255, 255);
    noStroke();
    rect(i*w, y, w, height - y);
  }
  console.log(spectrum);
 
}

function togglePlaying() {
  if (!song.isPlaying()) {
    getAudioContext().resume();
    song.play();
    button.html('pause');
  } else {
    song.stop();
    button.html('play');
  }
}
