export const initHotkeys = () => {
    document.addEventListener('keydown', handleKeydown);
};

const handleKeydown = (e) => {
    // Cmd/Ctrl + K
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        activateGemSearch();
    }

    // ESC to close
    if (e.key === 'Escape') {
        deactivateGemSearch();
    }
};

const activateGemSearch = () => {
    const input = document.querySelector('#gemsearch-input');
    if (input) {
        input.focus();

        // Add active state
        const section = document.querySelector('.gemsearch-card');
        if (section) {
            section.classList.add('active');
        }
    }
};

const deactivateGemSearch = () => {
    const section = document.querySelector('.gemsearch-card');
    if (section) {
        section.classList.remove('active');
    }

    // Clear focus
    document.activeElement?.blur();
};
