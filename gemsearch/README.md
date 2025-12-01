# GemSearch

Semantic search for YouTube. Find videos and moments instantly.

## Development
```bash
# Install dependencies
npm install

# Development (with hot reload)
npm run dev

# Build for production
npm run build

# Create zip for Chrome Web Store
npm run zip
```

## Load Extension

1. Run `npm run build`
2. Open Chrome → `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `dist` folder

## Project Structure
```
src/
├── core/          # Core logic (search, storage, injection)
├── ui/            # Components and styles
├── utils/         # Helpers
├── content.js     # Entry point
└── background.js  # Service worker
```

## Built by Art1san

Tastefully crafted AI experiences.
