const messages = [
    "You've used all your gems today!",
    "Out of magic for today",
    "Come back tomorrow for more gems!",
    "Your gems have been exhausted",
    "No more searches today, friend"
];

export const createOutOfCredits = () => {
    const container = document.createElement('div');
    container.className = 'out-of-credits';

    const message = messages[Math.floor(Math.random() * messages.length)];

    container.innerHTML = `
    <div class="icon">Gem</div>
    <div class="message">${message}</div>
    <div class="submessage">Free gems refresh daily</div>
  `;

    return container;
};
