// Generate 100 players for WDB and Sniper Spot
const defaultWdbData = Array.from({ length: 100 }, (_, i) => `WDB Player ${i + 1}`);
const defaultSniperData = Array.from({ length: 100 }, (_, i) => `Sniper Player ${i + 1}`);

// Load saved player names from localStorage or use defaults
let wdbData = JSON.parse(localStorage.getItem('wdbData')) || defaultWdbData;
let sniperData = JSON.parse(localStorage.getItem('sniperData')) || defaultSniperData;

// Current state
let currentView = "wdb"; // Default view

// Initialize leaderboard data
function updateLeaderboard() {
  const leaderboardTitle = document.getElementById('leaderboard-title');
  const leaderboardBody = document.getElementById('leaderboard-body');
  leaderboardBody.innerHTML = '';

  const data = currentView === "wdb" ? wdbData : sniperData;
  leaderboardTitle.textContent = currentView === "wdb" ? "WDB Rankings" : "Sniper Spot Rankings";

  data.forEach((player, index) => {
    const row = document.createElement('div');
    row.className = `player-row ${index < 3 ? 'rank-' + (index + 1) : ''}`;

    if (currentView === "wdb" || currentView === "sniper") {
      // Editable input field for both WDB and Sniper players
      row.innerHTML = `
        <div class="rank-number">#${index + 1}</div>
        <div>
          <input 
            type="text" 
            class="player-input" 
            value="${player}" 
            data-index="${index}" 
            oninput="updatePlayerName(event)"
          />
        </div>
      `;
    } else {
      // Static display for other cases (not applicable here but can be customized)
      row.innerHTML = `
        <div class="rank-number">#${index + 1}</div>
        <div>${player}</div>
      `;
    }

    leaderboardBody.appendChild(row);
  });
}

// Update the player name and save to localStorage for both WDB and Sniper
function updatePlayerName(event) {
  const index = event.target.dataset.index;
  const newValue = event.target.value;

  if (currentView === "wdb") {
    wdbData[index] = newValue;
    localStorage.setItem('wdbData', JSON.stringify(wdbData));
  } else if (currentView === "sniper") {
    sniperData[index] = newValue;
    localStorage.setItem('sniperData', JSON.stringify(sniperData));
  }
}

// Toggle between Sniper Spot and WDB
function toggleView() {
  const actionBtn = document.getElementById('action-btn');
  currentView = currentView === "wdb" ? "sniper" : "wdb";
  actionBtn.textContent = currentView === "wdb" ? "Sniper Spot" : "WDB";
  updateLeaderboard();
}

// Initial render
updateLeaderboard();
