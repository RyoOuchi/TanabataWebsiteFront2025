const teamNameMap = {
  0: "アポロ班",
  1: "アンビ班",
  2: "コンテナ班",
  3: "モーリー班",
  4: "りんちゃん班",
  5: "かめさん班",
  10: "ハリー班",
  123: "にとりん班"
};

let currentStage = 1;
const maxStage = 3;
let groupedData = {};

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await fetchData("https://a0ab-1-21-49-121.ngrok-free.app/get-all");
    groupedData = filterTopScoresPerTeam(groupByStage(data));

    setupStageSwitching();
    renderStage(currentStage);
  } catch (error) {
    console.error("Error processing data:", error);
  }
});

async function fetchData(url) {
  const response = await fetch(url, {
    headers: { "ngrok-skip-browser-warning": "true" }
  });
  const text = await response.text();
  return JSON.parse(text);
}

function groupByStage(data) {
  const grouped = {};
  data.forEach(entry => {
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
    entries.forEach(entry => {
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

  const allRankSlots = document.querySelectorAll(".left-ranking div, .right-ranking div");
  allRankSlots.forEach(div => {
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
      paragraphs[0].textContent = (i + 1).toString().padStart(2, '0');
      paragraphs[1].textContent = teamName;
      paragraphs[2].textContent = `${entry.score}pt`;
    }
  });
}

function setupStageSwitching() {
  document.getElementById("prev-stage").addEventListener("click", e => {
    e.preventDefault();
    if (currentStage > 1) {
      currentStage--;
      renderStage(currentStage);
    }
  });

  document.getElementById("next-stage").addEventListener("click", e => {
    e.preventDefault();
    if (currentStage < maxStage) {
      currentStage++;
      renderStage(currentStage);
    }
  });
}
