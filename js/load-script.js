window.addEventListener('load', () => {
  document.body.classList.add('fade-in');

  const elements = document.querySelectorAll('.bg-image, h1, .play-game, .footer-img');

    elements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = 1;

      // After the last element appears, show the video
      if (index === elements.length - 1) {
        showYouTubeVideo();
      }
    }, index * 500);
  });
});


function showYouTubeVideo() {
  // Create a fullscreen overlay
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

  // Create the iframe
  const iframe = document.createElement("iframe");
  iframe.width = "1120";
  iframe.height = "630";
  iframe.src = "https://www.youtube.com/embed/Q4a6hhi5M08?autoplay=1";
  iframe.title = "YouTube video player";
  iframe.frameBorder = "0";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";
  iframe.style.borderRadius = "8px";

  // Append iframe to overlay
  overlay.appendChild(iframe);

  // Clicking outside iframe (on overlay) closes it
  overlay.addEventListener("click", () => {
    overlay.remove();
  });

  // Prevent closing when clicking *inside* the iframe
  iframe.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Add overlay to document
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
