let width = 0;

function startProgress() {
  const progressBar = document.querySelector(".progress-bar");

  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        window.location.href = "/start.html";
      }, 1000);
    } else {
      width++;
      progressBar.style.width = width + "%";
    }
  }, 10);
}

window.onload = startProgress;
