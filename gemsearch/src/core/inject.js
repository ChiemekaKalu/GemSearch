import { createSearchSection } from '../ui/components/SearchSection.js';
import { createGemIndicator } from '../ui/components/GemIndicator.js';

let injected = false;

export const injectGemSearch = (pageType) => {
    if (injected) return;

    if (pageType === 'watch') {
        injectWatchPage();
    } else if (pageType === 'search') {
        injectSearchPage();
    }

    injected = true;
};

const injectWatchPage = () => {
    const interval = setInterval(() => {
        const target = document.querySelector('#below');

        if (target && !document.querySelector('#gemsearch-root')) {
            clearInterval(interval);

            const searchSection = createSearchSection();
            target.insertBefore(searchSection, target.firstChild);

            console.log('GemSearch injected on watch page');
        }
    }, 100);

    // Give up after 5 seconds
    setTimeout(() => clearInterval(interval), 5000);
};

const injectSearchPage = () => {
    const interval = setInterval(() => {
        const searchInput = document.querySelector('#search-input input');

        if (searchInput && !document.querySelector('.gem-indicator')) {
            clearInterval(interval);

            const indicator = createGemIndicator();
            searchInput.parentElement.style.position = 'relative';
            searchInput.parentElement.appendChild(indicator);

            console.log('Gem indicator added');
        }
    }, 100);

    setTimeout(() => clearInterval(interval), 5000);
};
