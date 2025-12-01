import { injectGemSearch } from './core/inject.js';
import { initHotkeys } from './utils/hotkeys.js';
import { initStorage } from './core/storage.js';

let initialized = false;

const init = async () => {
    if (initialized) return;

    console.log('GemSearch initializing...');

    await initStorage();
    initHotkeys();

    const pageType = getPageType();
    if (pageType) {
        injectGemSearch(pageType);
    }

    initialized = true;
};

const getPageType = () => {
    const path = window.location.pathname;
    if (path === '/watch') return 'watch';
    if (path === '/results') return 'search';
    return null;
};

// Handle YouTube's SPA navigation
let lastUrl = location.href;
const urlObserver = new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        initialized = false;
        init();
    }
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

urlObserver.observe(document, { subtree: true, childList: true });
