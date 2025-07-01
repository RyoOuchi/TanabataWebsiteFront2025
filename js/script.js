const canvas = document.getElementById("hero-canvas");
const context = canvas.getContext("2d");
const frameCount = 120;
const images = [];
let currentFrame = 0;

function getFrameSrc(index) {
  return `/img/frames/ko-ta_to_ricchan_${index.toString().padStart(5, "0")}.png`;
}

for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = getFrameSrc(i);
  images.push(img);
}

function resizeCanvasToDisplaySize(canvas, context) {
  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.scale(dpr, dpr);
}

function render() {
  const img = images[currentFrame];
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  if (img.complete) {
    context.clearRect(0, 0, width, height);
    context.drawImage(img, 0, 0, width, height);
  } else {
    img.onload = () => {
      context.clearRect(0, 0, width, height);
      context.drawImage(img, 0, 0, width, height);
    };
  }
}

function updateImage() {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScroll;
  const newFrame = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  if (newFrame !== currentFrame) {
    currentFrame = newFrame;
    render();
  }

  if (currentFrame === frameCount - 1) {
    setTimeout(() => {
      window.location.href = "/story.html";
    }, 100);
  }
}

window.addEventListener("scroll", updateImage);

window.onload = () => {
  resizeCanvasToDisplaySize(canvas, context);
  render();
};
