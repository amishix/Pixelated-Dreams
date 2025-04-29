// Declare variables
let imgSet = []; // Array to store images
let pos; // Position vector for image movement
let lastUpdate = 0; // Last update timestamp
let updateInterval = 250; // Update interval for image movement
let imgIndex = 0; // Index of the current image
let sliders_array = []; // Array to store SliderFlower objects
let back; // Background image variable
let soundFile; // Sound file variable
let inputBox; // Input box for user instructions

// Preload function to load assets before setup
function preload() { 
  // Load sound file and images
  soundFile = loadSound('disneytheme.mp3');
  for (let i = 1; i <= 6; i++) {
    if (i <= 5) {
      imgSet.push(loadImage('data/image' + i + '.png'));
    } else {
      back = loadImage('data/image' + i + '.jpg'); // The sixth image is the background
    }
  }
}

// Setup function to initialize canvas and elements
function setup() {
  // Create main canvas
  let mainCanvas = createCanvas(windowWidth, windowHeight);
  mainCanvas.position(0, 0); // Position canvas at (0, 0)

  // Resize images
  imgSet.forEach(img => img.resize(250, 250));

  // Set background and initialize position vector
  background(0);
  pos = createVector(10, 15);

  // Set color mode
  colorMode(RGB);

  // Create a text input field for user instructions
  inputBox = createInput('press d to play and p to pause');
  inputBox.position(5, 10); // Position the input box at (5, 10)
  inputBox.size(200, 40); // Set size of input box
  inputBox.style('background-color', 'pink'); // Set background color to pink
  inputBox.style('border', '2px solid black'); // Set border style
  inputBox.style('font-size', '12px'); // Set font size
}

// Draw function to update canvas elements
function draw() {
  var currentTIME = millis();
  // Update images at fixed intervals
  if (currentTIME - lastUpdate > updateInterval) {
    background(back); // Draw background image
    displayImages(); // Display images
    lastUpdate = currentTIME; // Update last update timestamp
  }
  // Update sliders
  sliders_array.forEach(slider => slider.update());
}

// Function to display images
function displayImages() {
  // Calculate image position using Perlin noise
  let x = map(noise(pos.x), 0, 1, 0, width - imgSet[imgIndex].width);
  let y = map(noise(pos.y), 0, 1, 0, height - imgSet[imgIndex].height);
  // Draw image at calculated position
  image(imgSet[imgIndex], x, y);
  pos.add(0.5, 0.5); // Update position vector
  imgIndex = (imgIndex + 1) % imgSet.length; // Update image index
}

// Function to handle mouse release event
function mouseReleased() {
  // Add new SliderFlower object at mouse position
  sliders_array.push(new SliderFlower(mouseX, mouseY));
}

// SliderFlower class definition
class SliderFlower {
  constructor(x, y) {
    // Initialize properties
    this.x0 = x;
    this.y0 = y;
    this.sliders = [];
    this.sin_ang = 0;
    this.r = random(40, 80);
    // Create sliders in a circular pattern
    let skip = 30; // Step between sliders
    for (let i = 0; i < 360; i += skip) {
      let ang = radians(i);
      let x1 = cos(ang) * this.r;
      let y1 = sin(ang) * this.r;
      // Create slider and set position and style
      let slider = createSlider(0, 255, 50);
      slider.position(this.x0 + x1, this.y0 + y1);
      slider.style('width', this.r + 'px');
      slider.style('transform', `rotate(${i}deg)`);
      this.sliders.push(slider); // Add slider to array
    }
  }

  // Function to update sliders
  update() {
    let offset = 0;
    this.sliders.forEach(slider => {
      // Update slider value using sine wave
      slider.value(map(sin(this.sin_ang + offset), -1, 1, 0, 255));
      offset += 0.050; // Increment offset
    });
    this.sin_ang += 0.1; // Increment angle
  }
}

// Function to handle key presses
function keyPressed() {
  // Save canvas as image
  if (key === 's' || key === 'S') {
    saveCanvas('myCanvas', 'jpg');
  } 
  // Play sound
  else if (key === 'd' || key === 'D') {
    soundFile.play();
  } 
  // Pause sound
  else if (key === "p" || key === "P") {
    soundFile.pause();
  }
}
