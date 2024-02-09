 /**
  * YouTube Tutorial:
  * https://youtu.be/wG_5453Vq98
   */

 console.clear();

 // Select the circle element
 const circleElement = document.querySelector('.circle');

 // Create objects to track mouse position and custom cursor position
 const mouse = { x: 0, y: 0 }; // Track current mouse position
 const previousMouse = { x: 0, y: 0 } // Store the previous mouse position
 const circle = { x: 0, y: 0 }; // Track the circle position

 // Initialize variables to track scaling and rotation
 let currentScale = 0; // Track current scale value
 let currentAngle = 0; // Track current angle value

 // Update mouse position on the 'mousemove' event
 window.addEventListener('mousemove', (e) => {
   mouse.x = e.x;
   mouse.y = e.y;
 });

 // Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
 const speed = 0.17;

 // Start animation
 const tick = () => {
   // MOVE
   // Calculate circle movement based on mouse position and smoothing
   circle.x += (mouse.x - circle.x) * speed;
   circle.y += (mouse.y - circle.y) * speed;
   // Create a transformation string for cursor translation
   const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

   // SQUEEZE
   // 1. Calculate the change in mouse position (deltaMouse)
   const deltaMouseX = mouse.x - previousMouse.x;
   const deltaMouseY = mouse.y - previousMouse.y;
   // Update previous mouse position for the next frame
   previousMouse.x = mouse.x;
   previousMouse.y = mouse.y;
   // 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
   const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150); 
   // 3. Convert mouse velocity to a value in the range [0, 0.5]
   const scaleValue = (mouseVelocity / 150) * 0.5;
   // 4. Smoothly update the current scale
   currentScale += (scaleValue - currentScale) * speed;
   // 5. Create a transformation string for scaling
   const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

   // ROTATE
   // 1. Calculate the angle using the atan2 function
   const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
   // 2. Check for a threshold to reduce shakiness at low mouse velocity
   if (mouseVelocity > 20) {
     currentAngle = angle;
   }
   // 3. Create a transformation string for rotation
   const rotateTransform = `rotate(${currentAngle}deg)`;

//   // Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
   circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

   // Request the next frame to continue the animation
   window.requestAnimationFrame(tick);
 }

 // Start the animation loop
 tick();


//###############################


let sparkInterval;
function spark(event, opt_properties) {
	let mouseX, mouseY;
	if (event) {
		mouseX = event.clientX;
		mouseY = event.clientY;
	}
	const defaultProperties = {color: `random`, mouseX: mouseX, mouseY: mouseY, hw: 30, sparks: 8, sw: 8, time: 400};
	const randInt = (min, max) => {return Math.floor(Math.random() * (max - min + 1)) + min;}
  const c = Object.assign(defaultProperties, opt_properties);
	const col = c.color === 'random' ? `rgb(${randInt(0,255)}, ${randInt(0,255)}, ${randInt(0,255)})` : c.color;
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("viewBox", "0 0 100 100");
	svg.setAttribute("style", `width: 100%; height: 100%; position: absolute; height: ${c.hw}px; width: ${c.hw}px; transform: translate(-50%,-50%); left: ${c.mouseX}; top: ${c.mouseY}; z-index: 99999`);
	for (let i = 0; i < c.sparks; i++) {
		svg.insertAdjacentHTML('afterbegin', `<path d="M50 50 50 ${50 - c.sw/2}" stroke="${col}" stroke-linecap="round" stroke-width="${c.sw}" fill="none" transform="rotate(${((360 / c.sparks) * i) - (180 / c.sparks)} 50 50)"><animate attributeName="d" values="M50 50 50 ${50 - c.sw/2}; M50 ${50 - c.sw} 50 ${c.sw/2}; M50 ${c.sw/2} 50 ${c.sw/2}" dur="${c.time}ms" begin="0s" repeatCount="0" fill="freeze" /></path>`);
	}
	document.body.appendChild(svg);
	setTimeout(() => {svg?.remove();}, c.time);
}
document.addEventListener("click", (event) => {spark(event, {color: 'random', hw: 60}); clearInterval(sparkInterval);});
document.addEventListener("mousemove", (event) => {spark(event, {color: 'random'}); clearInterval(sparkInterval);});
document.addEventListener("touchmove", (event) => {spark(event, {color: 'random'}); clearInterval(sparkInterval);});

function infiniteSparkle() {
	sparkInterval = setInterval(()=> {
		const boundingBox = document.getElementById('getMe').getBoundingClientRect();
		spark(undefined, {color: 'random', mouseX: boundingBox.left + window.scrollX, mouseY: boundingBox.top + window.scrollY});
	}, 70);
}
infiniteSparkle();

//################# HEIMKINO ###################

const mediaUrls = [
  'data/EoH_2023-10-21_1.mp4',
  'data/moon_to_fibonacci_nummer12.mp4',
  'data/firstSketch23_1080.mp4',
  'https://res.cloudinary.com/djclvnzg1/video/upload/v1705002969/PlayStation_5_Startup_myclro.mp4',
  '',
];

let currentIndex = 0;

let preloadedVideos = {};
function preloadVideo(url) {
  if (!preloadedVideos[url]) {
      const video = document.createElement('video');
      video.src = url;
      video.type = 'video/mp4';
      video.preload = 'auto';
      video.style.display = 'none';
      document.body.appendChild(video);
      preloadedVideos[url] = true;
  }
}

function swapMedia() {
  const mediaContainer = document.getElementById('media-container');
  mediaContainer.innerHTML = '';
  const url = mediaUrls[currentIndex];
  const nextUrl = mediaUrls[(currentIndex + 1) % mediaUrls.length];
  const isImg = /\.(jpg|jpeg|png|gif)$/i.test(url);
  for (let i = 0; i < 4; i++) {
      if (isImg) {
          const img = document.createElement('img');
          img.src = url;
          mediaContainer.appendChild(img);
      } else {
          const video = document.createElement('video');
          const source = document.createElement('source');
          source.src = url;
          source.type = 'video/mp4';
          video.autoplay = true;
          video.muted = true;
          video.loop = true;
          ( i > 0 ) ? video.style.opacity = currentOpacity : '';
          video.appendChild(source);
          mediaContainer.appendChild(video);
          preloadVideo(nextUrl);
      }
  }
  currentIndex = (currentIndex + 1) % mediaUrls.length;
}
let ps5 = document.querySelector(".ps5");
document.querySelector("#media-container").addEventListener('click', (e)=>{
  e.preventDefault();
  if (ps5.classList.contains("on")) {
      ps5.classList.remove('on');
      currentIndex = 0;
  }
  (currentIndex == 3) ? currentIndex++ : '';
  swapMedia();
});
ps5.addEventListener('click', ()=>{
  if (ps5.classList.contains("on")) {
      ps5.classList.remove('on');
      currentIndex = 4;
      swapMedia();
  } else {
      ps5.classList.add('on');
      currentIndex = 3;
      swapMedia();
  }
});


let currentOpacity = 1;
document.querySelector("input#opacity").addEventListener("input", (e) => {
  currentOpacity = e.target.value;
  let bgTarget = document.querySelectorAll("video");
  for (let i = 1; i < bgTarget.length; i++) {
      bgTarget[i].style.opacity = currentOpacity;
  }
});


const d = new Date();
const hr = d.getHours() % 12 || 12;
const min = d.getMinutes().toString().padStart(2, '0');
document.querySelector(".display").innerHTML = `${hr}:${min}`;