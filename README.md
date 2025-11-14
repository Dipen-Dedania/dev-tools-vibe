# DevFlow 🚀

**All-in-One Developer Utilities Platform**

DevFlow is a beautiful, fast, and privacy-focused web application that consolidates 50+ essential developer tools into a single, unified platform. Built with Next.js 14, TypeScript, and Tailwind CSS, it works 100% offline with zero data collection.

[![CI](https://github.com/Dipen-Dedania/dev-tools-vibe/actions/workflows/ci.yml/badge.svg)](https://github.com/Dipen-Dedania/dev-tools-vibe/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

## ✨ Features

- 🔒 **10+ Encoders/Decoders** - Base64, URL, HTML, Hex, Binary, and more
- 🔄 **12+ Converters** - JSON ↔ YAML, CSV, XML transformations
- 🎨 **15+ Formatters** - Beautify JSON, SQL, HTML, CSS, JavaScript
- 🎲 **13+ Generators** - UUID, QR codes, hashes, random data
- ✅ **8+ Validators** - RegEx tester, JSON, YAML, Cron parser
- ⚡ **Lightning Fast** - Sub-500ms response time
- 🔒 **100% Offline** - Zero data collection or tracking
- 🎯 **Smart Detection** - Auto-detect and suggest tools
- 🌙 **Dark/Light Mode** - Beautiful themes with persistence
- 📱 **Responsive Design** - Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Dipen-Dedania/dev-tools-vibe.git
cd dev-tools-vibe

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Code Quality:** ESLint, Prettier
- **Testing:** Vitest
- **Deployment:** Vercel

## 📁 Project Structure

```
dev-tools-vibe/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   │   ├── ui/             # UI components
│   │   ├── tools/          # Tool-specific components
│   │   └── layouts/        # Layout components
│   ├── lib/                # Utility functions and tools
│   │   ├── tools/          # Tool logic (encoders, formatters, etc.)
│   │   ├── constants.ts    # App constants
│   │   ├── toolRegistry.ts # Central tool registry
│   │   └── utils.ts        # Helper functions
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global styles
├── public/                 # Static assets
└── tests/                  # Test files
```

## 🎯 Available Tools

### Encoders/Decoders

- Base64 Encoder/Decoder ✅
- URL Encoder/Decoder
- HTML Entities Encoder/Decoder
- Hex Encoder/Decoder
- Binary Encoder/Decoder
- And more...

### Formatters & Validators

- JSON Formatter & Validator ✅
- XML Formatter
- HTML Formatter
- SQL Formatter
- And more...

### Generators

- UUID/GUID Generator ✅
- Nano ID Generator
- Hash Generator (SHA-256, SHA-512, MD5)
- Lorem Ipsum Generator
- And more...

✅ = Currently implemented

## 🚢 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dipen-Dedania/dev-tools-vibe)

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-tool`)
3. Commit your changes (`git commit -m 'Add some amazing tool'`)
4. Push to the branch (`git push origin feature/amazing-tool`)
5. Open a Pull Request

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Inspired by:

- [DevUtils](https://devutils.com/) - macOS native polish
- [DevToys](https://devtoys.app/) - Windows breadth
- [TrueDevTools](https://truedevtools.com/) - Web accessibility
- [Dev-Tool-Hub](https://github.com/topics/developer-tools) - Community-driven

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Made with ❤️ for developers, by developers**
