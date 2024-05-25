# [Disney's palace animation]

IU000169 BSc Computer Science Spring '24

# Project Description
This project is based on generating an animation with two user interaction points.

#### Design Ideas and Inspirations

My inspiration originated from a Nintendo DS game I used to play in which Cinderella and other Disney princesses were donned up. I realised how much of our childhood and adulthood is spent loving Disney, so I wanted to recreate that nostalgic experience. As opposed to  the iconic Disney castle appearing at the beginning of every movie, we always see the introduction and wish it lasted a little bit longer so we could enjoy the fireworks. Thus, I came up with the idea to include fireworks as an interactive user point while you can play the intro theme song using special keys on the keyboard.

#### Design Criteria and Outcome

p5.js Functions;
createSlider():Creates a slider element in the HTML document.
createVector():Creates a 2D vector object.
map():Re-maps a number from one range to another.

Custom Functions and Methods;
displayImages():Custom function to display images on the canvas based on Perlin noise for positioning.
mouseReleased():Adds a new SliderFlower object to the sliders_array when the mouse is released.
SliderFlower class: Initializes the SliderFlower object, creates sliders, and positions them in a circular pattern.
update(): Updates the slider values based on a sine wave for dynamic visual effects.

These are an example of the key functions which work together to create an interactive sketch where images are displayed , sliders can be added by mouse clicks, and sound can be controlled via keyboard inputs. The input box allows for user interaction by displaying instructions on how to interact with the sketch.

#### Artifact Demo



#### Credits
- [pinterest images]
  https://www.pinterest.co.uk/tofuthetiger/disney-princesses/
- [Disney theme music]
  https://youtu.be/k9bUTfFF3_4?si=D20f5jz7sdRXOBKm
- [slider fireworks]
https://openprocessing.org/sketch/1983384
  

# Author(s) and License(s)
MIT License

Copyright (c) 2024 [Amishi Sharma]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

