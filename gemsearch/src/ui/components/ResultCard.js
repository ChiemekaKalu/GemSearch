export const createResultCard = (result) => {
    const card = document.createElement('div');
    card.className = 'gem-result';

    card.innerHTML = `
    <div class="result-header">
      <span class="timestamp-badge">${result.timestamp}</span>
    </div>
    <div class="result-content">${result.text}</div>
  `;

    card.addEventListener('click', () => {
        jumpToTimestamp(result.timestamp);
    });

    return card;
};

const jumpToTimestamp = (timestamp) => {
    const seconds = parseTimestamp(timestamp);
    const video = document.querySelector('video');

    if (video) {
        video.currentTime = seconds;
        video.play();

        // Scroll to player
        video.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};

const parseTimestamp = (timestamp) => {
    const parts = timestamp.split(':').map(Number);

    if (parts.length === 2) {
        // MM:SS
        return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
        // HH:MM:SS
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }

    return 0;
};
