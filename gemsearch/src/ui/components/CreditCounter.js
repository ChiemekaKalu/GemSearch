// Placeholder for credit counter component
export const createCreditCounter = (credits) => {
    const div = document.createElement('div');
    div.textContent = `Credits: ${credits}`;
    return div;
};
