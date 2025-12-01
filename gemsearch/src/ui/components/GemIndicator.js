export const createGemIndicator = () => {
    const indicator = document.createElement('div');
    indicator.className = 'gem-indicator';
    indicator.innerHTML = 'Gem';
    indicator.title = 'GemSearch (Cmd+K)';

    indicator.addEventListener('click', () => {
        // Focus YouTube search and activate GemSearch mode
        const input = document.querySelector('#search-input input');
        if (input) {
            input.focus();
            // TODO: Trigger GemSearch overlay
        }
    });

    return indicator;
};
