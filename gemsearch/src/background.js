// Background service worker for API calls and caching

chrome.runtime.onInstalled.addListener(() => {
    console.log('GemSearch installed');

    // Set initial credits
    chrome.storage.local.set({
        credits: 10,
        lastRefresh: new Date().toDateString()
    });
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'SEARCH') {
        handleSearch(request.query, request.mode, request.videoId)
            .then(sendResponse);
        return true; // Keep channel open for async response
    }

    if (request.type === 'GET_CREDITS') {
        getCredits().then(sendResponse);
        return true;
    }

    if (request.type === 'USE_CREDIT') {
        useCredit().then(sendResponse);
        return true;
    }
});

const handleSearch = async (query, mode, videoId) => {
    try {
        // Check cache first
        const cacheKey = `${mode}_${videoId || 'global'}_${query}`;
        const cached = await getFromCache(cacheKey);

        if (cached) {
            return { success: true, results: cached, fromCache: true };
        }

        // Call Gemini API
        const results = await searchWithGemini(query, mode, videoId);

        // Cache results
        await saveToCache(cacheKey, results);

        return { success: true, results, fromCache: false };
    } catch (error) {
        console.error('Search error:', error);
        return { success: false, error: error.message };
    }
};

const searchWithGemini = async (query, mode, videoId) => {
    // TODO: Implement Gemini API call
    // This will be built out in Phase 1

    // Placeholder for now
    return [
        { timestamp: '2:34', text: 'Example result for: ' + query },
        { timestamp: '5:12', text: 'Another relevant moment' }
    ];
};

const getFromCache = async (key) => {
    const result = await chrome.storage.local.get(key);
    return result[key];
};

const saveToCache = async (key, value) => {
    await chrome.storage.local.set({ [key]: value });
};

const getCredits = async () => {
    // Check if we need to refresh credits (daily)
    const { credits, lastRefresh } = await chrome.storage.local.get(['credits', 'lastRefresh']);
    const today = new Date().toDateString();

    if (lastRefresh !== today) {
        // Refresh credits
        await chrome.storage.local.set({
            credits: 10,
            lastRefresh: today
        });
        return 10;
    }

    return credits || 0;
};

const useCredit = async () => {
    const credits = await getCredits();

    if (credits <= 0) {
        return { success: false, credits: 0 };
    }

    const newCredits = credits - 1;
    await chrome.storage.local.set({ credits: newCredits });

    return { success: true, credits: newCredits };
};
