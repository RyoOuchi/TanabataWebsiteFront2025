const teamNameMap = {
  0: "アポロ班",
  1: "ハリー班",
  2: "かめさん班",
  3: "りっちゃん班",
  4: "にとりん班",
  5: "もーりー班",
  6: "こーた班",
  7: "アンビ班",
  8: "りんちゃん班",
  9: "コンテナ班",
 10: "ピナ班"
};

let currentStage = 1;
const maxStage = 3;
let groupedData = {};

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await fetchData("https://tanabata-api-2025.fly.dev/get-all");

    if (!Array.isArray(data) || data.length === 0) {
      console.log("No data yet");
    }

    groupedData = filterTopScoresPerTeam(groupByStage(data));

    setupStageSwitching();
    renderStage(currentStage);

    setInterval(async () => {
      try {
        const data = await fetchData("https://tanabata-api-2025.fly.dev/get-all");

        if (!Array.isArray(data) || data.length === 0) {
          console.log("No data yet");
        }

        groupedData = filterTopScoresPerTeam(groupByStage(data));
        renderStage(currentStage);
        console.log("Scoreboard updated");
      } catch (error) {
        console.error("Failed to refresh scoreboard:", error);
      }
    }, 10000);
  } catch (error) {
    console.error("Error processing data:", error);
  }
});

async function fetchData(url) {
  const response = await fetch(url);
  const text = await response.text();
  return JSON.parse(text);
}

function groupByStage(data) {
  const grouped = {};
  data.forEach((entry) => {
    const stage = entry.stage;
    if (!grouped[stage]) grouped[stage] = [];
    grouped[stage].push(entry);
  });
  return grouped;
}

function filterTopScoresPerTeam(grouped) {
  const result = {};
  for (const [stage, entries] of Object.entries(grouped)) {
    const topByTeam = {};
    entries.forEach((entry) => {
      const { teamId, score } = entry;
      if (!topByTeam[teamId] || topByTeam[teamId].score < score) {
        topByTeam[teamId] = entry;
      }
    });
    result[`stage-${stage}`] = Object.values(topByTeam);
  }
  return result;
}

function sortByScore(entries) {
  return entries.sort((a, b) => b.score - a.score);
}

function renderStage(stage) {
  const label = document.getElementById("stage-label");
  label.textContent = `ステージ${stage}`;

  const key = `stage-${stage}`;
  const entries = groupedData[key] ? sortByScore(groupedData[key]) : [];

  const allRankSlots = document.querySelectorAll(
    ".left-ranking div, .right-ranking div"
  );
  allRankSlots.forEach((div) => {
    const ps = div.querySelectorAll("p");
    if (ps.length >= 3) {
      ps[0].textContent = "--";
      ps[1].textContent = "（なし）";
      ps[2].textContent = "- pt";
    }
  });

  entries.slice(0, allRankSlots.length).forEach((entry, i) => {
    const rankDiv = allRankSlots[i];
    const paragraphs = rankDiv.querySelectorAll("p");
    const teamName = teamNameMap[entry.teamId] || `チーム${entry.teamId}`;
    if (paragraphs.length >= 3) {
      paragraphs[0].textContent = (i + 1).toString().padStart(2, "0");
      paragraphs[1].textContent = teamName;
      paragraphs[2].textContent = `${entry.score}pt`;
    }
  });
}

function setupStageSwitching() {
  document.getElementById("prev-stage").addEventListener("click", (e) => {
    e.preventDefault();
    if (currentStage > 1) {
      currentStage--;
      renderStage(currentStage);
    }
  });

  document.getElementById("next-stage").addEventListener("click", (e) => {
    e.preventDefault();
    if (currentStage < maxStage) {
      currentStage++;
      renderStage(currentStage);
    }
  });
}

document.addEventListener("click", (e) => {
  const finalX = e.clientX;
  const finalY = e.clientY;
  const startX = finalX + 383;
  const startY = finalY - 115;
  const randomInt = Math.floor(Math.random() * 3) + 1;
  // Create the star
  const img = document.createElement("img");
  img.src = `img/star-${randomInt}.webp`
  img.className = "spawned-img";
  img.style.left = `${startX}px`;
  img.style.top = `${startY}px`;
  document.body.appendChild(img);

  // Animate star to the final position
  requestAnimationFrame(() => {
    img.style.left = `${finalX}px`;
    img.style.top = `${finalY}px`;
  });

  // Trail spawning logic with smaller position differences
  const steps = 30; // increased from 10 → smoother trail
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
    }, i * 10); // faster interval to keep timing similar
  }

  // Remove trails after delay — from LEFT to RIGHT
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

  // Shrink star after 300ms
  setTimeout(() => {
    img.classList.add("shrink");
  }, 300);

  // Remove star after 400ms
  setTimeout(() => {
    img.remove();
  }, 400);
});

