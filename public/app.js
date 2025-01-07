document.getElementById('submitBtn').addEventListener('click', async () => {
    const points = parseInt(document.getElementById('experienceInput').value);
    if (points < -20 || points > 20) {
        alert('Please enter a value between -20 and 20.');
        return;
    }

    // Get current experience and level
    let experiencePoints = parseInt(document.getElementById('experiencePoints').textContent);
    let level = parseInt(document.getElementById('level').textContent);
    let nextLevelXP = parseInt(document.getElementById('nextLevelXP').textContent);

    // Update experience points
    experiencePoints += points;

    // Check if level up is needed
    if (experiencePoints >= nextLevelXP) {
        experiencePoints -= nextLevelXP;
        level++;
        nextLevelXP = Math.floor(nextLevelXP * 1.5);
        document.getElementById('level').textContent = level;
        document.getElementById('nextLevelXP').textContent = nextLevelXP;
    }

    // Update the displayed values
    document.getElementById('experiencePoints').textContent = experiencePoints;
    updateProgressBar(experiencePoints, nextLevelXP);

    // Save to the server
    await saveExperienceToDatabase(level, experiencePoints);
});

async function fetchExperienceData() {
    const response = await fetch('/api/experience');
    if (!response.ok) {
        console.error('Failed to fetch experience data');
        return { level: 1, experiencePoints: 0 };  // Default values if fetch fails
    }
    return await response.json();
}

// Function to update the progress bar
function updateProgressBar(experiencePoints, nextLevelXP) {
    const progressBar = document.getElementById('progressBar');
    const progress = (experiencePoints / nextLevelXP) * 100;
    progressBar.style.width = progress + '%';
    progressBar.textContent = Math.round(progress) + '%';
}

console.log('Sending data to server:', { level, experiencePoints });


// Function to save experience data to the datab