# LogLite

A minimalist event logging Progressive Web App that allows recording events with duration tracking and statistical analysis.

## Features

- Single-button event recording with duration tracking
- Daily, weekly, and monthly statistics visualization
- CSV data export functionality
- Works offline
- Cross-platform support (Android & iOS)

## Development

This project uses:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- PWA capabilities

### Prerequisites

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Local Development

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## PWA Installation

### Android
1. Visit the app URL in Chrome
2. Tap the "Add to Home Screen" prompt
3. Follow the installation instructions

### iOS
1. Visit the app URL in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Follow the installation instructions

## Data Storage

All event data is stored locally in the browser's IndexedDB storage. Export your data regularly using the CSV export feature for backup.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.