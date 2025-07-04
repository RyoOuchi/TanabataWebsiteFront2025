window.addEventListener('load', () => {
  document.body.classList.add('fade-in');

  const elements = document.querySelectorAll('.bg-image, h1, .play-game, .footer-img');

    elements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = 1;

      if (index === elements.length - 1) {
        showYouTubeVideo();
      }
    }, index * 500);
  });
});


function showYouTubeVideo() {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "999";

  const iframe = document.createElement("iframe");
  iframe.width = "1120";
  iframe.height = "630";
  iframe.src = "https://www.youtube.com/embed/vE5KWar4YMQ?autoplay=1";
  iframe.title = "YouTube video player";
  iframe.frameBorder = "0";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";
  iframe.style.borderRadius = "8px";

  overlay.appendChild(iframe);

  overlay.addEventListener("click", () => {
    overlay.remove();
  });

  iframe.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.body.appendChild(overlay);
}


const gameButton = document.querySelector(".play-game");

gameButton.addEventListener("click", (event) => {
  event.preventDefault();

  document.body.style.transition = "background-color 1s ease-in";
  document.body.style.backgroundColor = "#231816";

  const elements = document.querySelectorAll('.bg-image, h1, .play-game, .footer-img');
  elements.forEach((element) => {
    element.style.transition = "opacity 1s ease-in";
    element.style.opacity = 0;
  });

  setTimeout(() => {
    window.location.href = "/game.html";
  }, 1000);
});

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", () => {
        img.classList.add("loaded");
      });
    }
  });
});