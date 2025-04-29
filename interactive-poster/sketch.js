let imgSeq = [];
let imgIndex = 0;
let mousePressedOnCanvas = false; // track mouse press over the canvas
let textInput;
let correctPassword = "magic"; // set a correct password 
let accessGranted = false; // by default this should be access denied
let fireworks = [];
let gravity;
let textSizeSlider;
let nameInput;
let nameText = '';

function preload() {
  // Preload images into imgSeq array
  for (let i = 1; i <= 6; i++) {
    imgSeq.push(loadImage('data/image' + i + '.webp'));
  }
}

function setup() {
  // Create and style the password request text

    pwRequest = createElement('h2', '🧚🏻‍♀️✨Step in to the magical kingdom✨🧚🏽‍♀️, enter the password below🪄');
    pwRequest.position(windowWidth/6, windowHeight/4);
    pwRequest.style('color', 'white');
    pwRequest.style('text-shadow', '2px 3px 6px orange');
    pwRequest.style('font-family', 'cursive');
   // Create and position the password input field
    textInput = createInput('', 'password');
    textInput.position(windowWidth/3, windowHeight/2);
    textInput.size(200, 20);

    // hide the canvas container
    let canvasContainer = select('#canvas-container');
    canvasContainer.style('display', 'none');

    // hide the button container
    let buttonContainer = select('#button-container');
    buttonContainer.style('display', 'none');

    // select all elements with the class 'content' and use arrow function
    let content = selectAll('.content');
    content.forEach((item) => {
      item.style('display', 'none');
    });
  // Create the canvas and add it to the canvas container
  let canvas = createCanvas(windowWidth / 1.5, windowHeight / 1.5);
  canvas.parent('canvas-container');
  noCursor();

    // add mousePressed and mouseReleased event listeners to the canvas
    // event listener: a function that performs an action based on a certain event
    // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events
    canvas.mousePressed(() => {
        mousePressedOnCanvas = true;
    });

    canvas.mouseReleased(() => {
        mousePressedOnCanvas = false;
    });
// Set gravity for fireworks
 gravity = createVector(0, 0.2);

  textInput.changed(checkPassword);

  // create buttons but hide them until the correct password is entered
  let swapButton = createButton('Change Image');
  swapButton.addClass('button');
  swapButton.parent('button-container');
  swapButton.mousePressed(swapImage);

  let magicButton = createButton('reset Image');
  magicButton.addClass('button');
  magicButton.parent('button-container');
  magicButton.mousePressed(resetImage);

  let fireworksButton = createButton('pixie dust');
  fireworksButton.addClass('button');
  fireworksButton.parent('button-container');
  fireworksButton.mousePressed(triggerFireworks);

  // Create input field for name
  nameInput = createInput('');
  nameInput.position(20, 20);
  nameInput.size(200, 30);
  nameInput.input(updateName);
  nameInput.style('display', 'none');
// Create slider for text size
  textSizeSlider = createSlider(10, 100, 32);
  textSizeSlider.position(20, 20);
  textSizeSlider.style('display', 'none');
  

  background(0);
  
  
 }




function draw() {


    if (accessGranted) {

        pwRequest.hide(); // hide the password request
        
        image(imgSeq[imgIndex], 0, 0, width, height);// show one image

    }
   // Display fireworks
   for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
        fireworks.splice(i, 1);
    }
}
    //debug
    console.log(mouseIsPressed);

  let textSizeValue = textSizeSlider.value();

  textSize(textSizeValue);
 
  // Set the text alignment and color
  textAlign(CENTER, CENTER);
  fill(250, 0, 187);

  // Draw the name text in the center of the canvas
  text(nameText, width / 2, height / 2);

  
}

function checkPassword() {
  // Check if the entered password is correct
  let enteredPassword = textInput.value();
  if (enteredPassword === correctPassword) {
    accessGranted = true;
   // Hide the password input field
    textInput.hide();

    // Reveal the canvas and buttons container upon correct password entry
    let content = selectAll('.content');
    content.forEach((item) => {
      item.style('display', 'block');
    });
    select('#canvas-container').style('display', 'block');
    select('#button-container').style('display', 'block');
    // Reveal the name input and text size slider
    nameInput.style('display', 'block');
    textSizeSlider.style('display', 'block');
    } else {
    alert("Whoopsie daisy,try again!");}
}

function swapImage() {
  // Swap to the next image in the sequence
  imgIndex = (imgIndex + 1) % imgSeq.length;
}

function resetImage() {
  // Reset to the first image in the sequence
  imgIndex = 0;
}
// adding a firework activated display through buttons inspired by:
// https://gist.github.com/scottspace/fa9369288518febec8617e471a2af745

function triggerFireworks() {
   // Add a new firework to the fireworks array
  fireworks.push(new Firework());
}

// Function to update the name based on input
function updateName() {
  nameText = nameInput.value();
}
class Particle {
    constructor(x, y, hue, firework) {
      this.pos = createVector(x, y);// Initial position of the particle
      this.firework = firework;// Boolean to distinguish between initial firework and particles from explosion
      this.lifespan = 255;// Lifespan of the particle, decreases over time
      this.hue = hue;// Color of the particle
      // Set initial velocity
      if (this.firework) {
        this.vel = createVector(0, random(-12, -8));  
      } else {
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(2, 10));
      }
      this.acc = createVector(0, 0);
    }
    
    applyForce(force) {
      this.acc.add(force);
    }
    // Update the particle's position, velocity, and lifespan
    update() {
      if (!this.firework) {
        this.vel.mult(0.9);// Slow down explosion particles over time
        this.lifespan -= 4;// Reduce lifespan of explosion particles
      
      }
      this.vel.add(this.acc); // Update velocity based on acceleration
      this.pos.add(this.vel);// Update position based on velocity
      this.acc.mult(0);// Reset acceleration after each frame
    
    }
    // Check if the particle's lifespan is over
    done() {
      return this.lifespan < 0;
    }
    
    show() {
      colorMode(HSB);
      
      if (!this.firework) {
        strokeWeight(2);// Thinner stroke for explosion particles
        stroke(this.hue, 255, 255, this.lifespan);
      } else {
        strokeWeight(4);
        stroke(this.hue, 255, 255);
      }
      
      point(this.pos.x, this.pos.y);
    }
  }
  
  class Firework {
    constructor() {
      this.hue = random(360);// Random color for the firework
      this.firework = new Particle(random(width), height, this.hue, true);
      this.exploded = false;
      this.particles = [];
    }
    // Update the firework's state
    update() {
      if (!this.exploded) {
        this.firework.applyForce(gravity);
        this.firework.update();
         // Check if the firework should explode
        if (this.firework.vel.y >= 0) {
          this.exploded = true;
          this.explode();
        }
      }
       // Update particles from the explosion
      for (let i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].applyForce(gravity);// Apply gravity to particles
        this.particles[i].update();
         // Remove particle if its lifespan is over
        if (this.particles[i].done()) {
          this.particles.splice(i, 1);
        }
      }
    }
    // Create particles for the explosion
    explode() {
      for (let i = 0; i < 100; i++) {
        let p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hue, false);
        this.particles.push(p);
      }
    }
    // Check if the firework and all particles are done
    done() {
      return this.exploded && this.particles.length === 0;
    }
    // Display the firework and particles
    show() {
      if (!this.exploded) {
        this.firework.show();// Display the initial firewor
      }
      
      for (let p of this.particles) {
        p.show();// Display each particle from the explosion
      }
    }
  }