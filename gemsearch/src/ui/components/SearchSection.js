import { getCredits, useCredit } from '../../core/storage.js';
import { createResultCard } from './ResultCard.js';
import { createLoadingState } from './LoadingState.js';
import { createOutOfCredits } from './OutOfCredits.js';

export const createSearchSection = () => {
    const section = document.createElement('div');
    section.className = 'gemsearch-section';
    section.id = 'gemsearch-root';

    section.innerHTML = `
    <div class="gemsearch-card">
      <div class="gemsearch-header">
        <div class="gem-icon">Gem</div>
        <input 
          type="text" 
          id="gemsearch-input"
          placeholder="Jump to any moment (Cmd+K)"
          class="gemsearch-input"
          autocomplete="off"
        />
        <div class="gems-remaining" id="gem-counter">
          <span class="count">10</span> left
        </div>
      </div>
      <div id="gemsearch-results" class="gemsearch-results"></div>
    </div>
  `;

    setupSearch(section);
    updateCreditDisplay(section);

    return section;
};

const setupSearch = (section) => {
    const input = section.querySelector('#gemsearch-input');
    const resultsContainer = section.querySelector('#gemsearch-results');

    input.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            await handleSearch(input.value, resultsContainer, section);
        }
    });
};

const handleSearch = async (query, resultsContainer, section) => {
    if (!query.trim()) return;

    // Check credits
    const credits = await getCredits();
    if (credits <= 0) {
        showOutOfCredits(resultsContainer);
        return;
    }

    // Show loading
    showLoading(resultsContainer);

    // Use credit
    await useCredit();
    updateCreditDisplay(section);

    // Get video ID
    const videoId = new URLSearchParams(window.location.search).get('v');

    // Call background script to search
    chrome.runtime.sendMessage(
        { type: 'SEARCH', query, mode: 'in-video', videoId },
        (response) => {
            if (response.success) {
                showResults(resultsContainer, response.results);
            } else {
                showError(resultsContainer, response.error);
            }
        }
    );
};

const showLoading = (container) => {
    container.innerHTML = '';
    container.appendChild(createLoadingState());
};

const showResults = (container, results) => {
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = '<div class="no-results">No moments found</div>';
        return;
    }

    results.forEach(result => {
        container.appendChild(createResultCard(result));
    });
};

const showOutOfCredits = (container) => {
    container.innerHTML = '';
    container.appendChild(createOutOfCredits());
};

const showError = (container, error) => {
    container.innerHTML = `<div class="error">Something went wrong: ${error}</div>`;
};

const updateCreditDisplay = async (section) => {
    const credits = await getCredits();
    const counter = section.querySelector('#gem-counter .count');
    if (counter) {
        counter.textContent = credits;
    }
};
