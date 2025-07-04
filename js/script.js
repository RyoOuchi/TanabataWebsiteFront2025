let virtualScrollY = 0;
const baseLightningScale = 1;
let pulseTime = 0;

const bg = document.querySelector(".bg-img-scroll");
const star = document.querySelector(".star-scroll");
const lightningLeft = document.querySelector(".lightning-left");
const lightningRight = document.querySelector(".lightning-right");
const logo = document.querySelector(".logo");

window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    virtualScrollY += e.deltaY;
    virtualScrollY = Math.max(0, virtualScrollY);

    const scaleFactor = Math.min(Math.pow(1.0005, virtualScrollY), 50);

    if (scaleFactor >= 50) {
      window.location.href = "story.html";
    }

    if (bg) {
      bg.style.transform = `translate(-50%, 0) scale(${scaleFactor})`;
    }
    if (star) {
      star.style.transform = `translate(-50%, -50%) scale(${scaleFactor})`;
    }

    const overlay = document.getElementById("white-overlay");

    const maxScrollForFade = 10000; 
    const opacity = Math.min(virtualScrollY / maxScrollForFade, 1);

    if (overlay) {
      overlay.style.opacity = opacity;
    }
  },
  { passive: false }
);

function animate() {
  pulseTime += 0.05;
  const pulseScale = 1 + 0.1 * Math.sin(pulseTime);

  const scrollScale = Math.min(Math.pow(1.005, virtualScrollY / 20), 3);
  const totalScale = baseLightningScale * scrollScale * pulseScale;

  if (lightningLeft) {
    lightningLeft.style.transform = `scale(${totalScale})`;
  }
  if (lightningRight) {
    lightningRight.style.transform = `scale(${totalScale})`;
  }
  if (logo) {
    logo.style.transform = `scale(${scrollScale})`;
  }

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("white-overlay");
  if (overlay) {
    setTimeout(() => {
      overlay.style.opacity = "0";
    }, 100);
  }


  const container = document.getElementById("cherry-blossoms-container");
  const numberOfBlossoms = 10;
  let spawnedBlossoms = 0;

  const spawnBlossom = () => {
    if (spawnedBlossoms >= numberOfBlossoms) {
      clearInterval(interval);
      return;
    }

    const blossom = document.createElement("div");
    blossom.classList.add("cherry-blossom");
    const variant = Math.floor(Math.random() * 4) + 1;
    blossom.style.backgroundImage = `url('img/assets/tanzaku-${variant}.webp')`;

    blossom.style.left = `${Math.random() * 100}vw`;
    blossom.style.top = `-10px`;

    const fallDuration = Math.random() * 7 + 8;
    blossom.style.animationDuration = `${fallDuration}s`;

    const flutterSpeed = Math.random() * 3 + 2;

    const size = Math.random() * 20 + 20;
    blossom.style.width = `${size}px`;
    blossom.style.height = `${size}px`;

    const rotateSpeed = Math.random() * 360 + 90;
    blossom.style.setProperty("--rotate-speed", `${rotateSpeed}deg`);

    blossom.style.animation = `
            fallAndFlutter ${fallDuration}s linear infinite, 
            flutterX ${flutterSpeed}s ease-in-out infinite
        `;

    container.appendChild(blossom);
    spawnedBlossoms++;
  };

  const interval = setInterval(spawnBlossom, 200);
});

function spawnStarAtRandomPosition() {
  const finalX = Math.random() * window.innerWidth;
  const finalY = Math.random() * window.innerHeight;
  const startX = finalX + 383;
  const startY = finalY - 115;
  const randomInt = Math.floor(Math.random() * 3) + 1;

  const img = document.createElement("img");
  img.src = `img/star-${randomInt}.webp`;
  img.className = "spawned-img";
  img.style.left = `${startX}px`;
  img.style.top = `${startY}px`;
  document.body.appendChild(img);
  img.offsetWidth;
  requestAnimationFrame(() => {
    img.style.left = `${finalX}px`;
    img.style.top = `${finalY}px`;
  });

  const steps = 30;
  const trailImages = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const trailX = startX + (finalX - startX) * t;
    const trailY = startY + (finalY - startY) * t;

    setTimeout(() => {
      const trail = document.createElement("img");
      trail.src = `img/star-trail-${randomInt}.webp`;
      trail.className = "trail-img";
      trail.style.left = `${trailX + 30}px`;
      trail.style.top = `${trailY - 40}px`;
      document.body.appendChild(trail);

      trailImages.push(trail);
    }, i * 10);
  }

  setTimeout(() => {
    for (let i = 0; i < trailImages.length; i++) {
      setTimeout(() => {
        const trail = trailImages[i];
        if (trail) {
          trail.style.opacity = "0";
          setTimeout(() => trail.remove(), 200);
        }
      }, i * 10);
    }
  }, 300);

  setTimeout(() => {
    img.classList.add("shrink");
  }, 300);

  setTimeout(() => {
    img.remove();
  }, 500);
}

setInterval(spawnStarAtRandomPosition, 500);
