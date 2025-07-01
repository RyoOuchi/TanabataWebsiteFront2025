window.addEventListener('load', () => {
  document.body.classList.add('fade-in');

  const elements = document.querySelectorAll('.bg-image, h1, .play-game, .footer-img');

  elements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = 1;
    }, index * 500);
  });
});

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
