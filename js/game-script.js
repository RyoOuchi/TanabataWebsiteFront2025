window.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await fetchData("https://a0ab-1-21-49-121.ngrok-free.app/get-all");

    const grouped = groupByStage(data);
    const filtered = filterTopScoresPerTeam(grouped);

    console.log("Grouped and Filtered Data:", filtered);
  } catch (error) {
    console.error("Error processing data:", error);
  }
});

async function fetchData(url) {
  console.log("Trying to fetch...");
  const response = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true"
    }
  });

  const contentType = response.headers.get("content-type");
  console.log("Content-Type:", contentType);

  const text = await response.text();
  console.log("Raw response text:", text);

  return JSON.parse(text);
}

function groupByStage(data) {
  const grouped = {};
  data.forEach(entry => {
    const stage = entry.stage;
    if (!grouped[stage]) {
      grouped[stage] = [];
    }
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
