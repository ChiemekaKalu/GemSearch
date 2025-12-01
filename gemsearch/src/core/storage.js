import { get, set, del, clear } from 'idb-keyval';

const CREDITS_KEY = 'gemsearch_credits';
const SETTINGS_KEY = 'gemsearch_settings';
const THEME_KEY = 'gemsearch_theme';

export const initStorage = async () => {
    // Ensure defaults exist
    const credits = await get(CREDITS_KEY);
    if (credits === undefined) {
        await set(CREDITS_KEY, 10);
    }

    const settings = await get(SETTINGS_KEY);
    if (!settings) {
        await set(SETTINGS_KEY, {
            theme: 'dark',
            hotkey: 'mod+k',
            resultsPerPage: 5
        });
    }
};

export const getCredits = async () => {
    return (await get(CREDITS_KEY)) || 0;
};

export const useCredit = async () => {
    const current = await getCredits();
    if (current <= 0) return false;

    await set(CREDITS_KEY, current - 1);
    return true;
};

export const refreshCredits = async () => {
    await set(CREDITS_KEY, 10);
};

export const getSettings = async () => {
    return (await get(SETTINGS_KEY)) || {};
};

export const updateSettings = async (updates) => {
    const current = await getSettings();
    await set(SETTINGS_KEY, { ...current, ...updates });
};

export const getTheme = async () => {
    return (await get(THEME_KEY)) || 'dark';
};

export const setTheme = async (theme) => {
    await set(THEME_KEY, theme);
};
