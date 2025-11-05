# 🧮 Calculator App

A modern, production-grade calculator application built with React, TypeScript, and Tailwind CSS. Features a clean separation between UI and a deterministic math engine with high-precision arithmetic, scientific functions, memory operations, and a beautiful dark-themed interface.

![Calculator App](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)

## ✨ Features

### Core Functionality
- **Basic Operations**: Addition, subtraction, multiplication, division
- **Advanced Operations**: Percentage, exponentiation, parentheses
- **Scientific Functions**: 
  - Trigonometric: sin, cos, tan (with DEG/RAD mode)
  - Logarithmic: ln (natural log), log (base 10)
  - Power Functions: square root, exponentiation
- **Memory Operations**: MC (Memory Clear), MR (Memory Recall), M+ (Memory Add), M- (Memory Subtract)
- **History Panel**: View and reuse previous calculations
- **High Precision**: Uses `decimal.js` for accurate calculations without floating-point errors

### User Experience
- 🎨 **Dark Theme**: Modern, eye-friendly dark interface
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- ⌨️ **Keyboard Support**: Full keyboard shortcuts for all operations
- ♿ **Accessible**: ARIA labels, keyboard navigation, and screen reader support
- 💾 **PWA Ready**: Progressive Web App support with offline capabilities
- 🌐 **Internationalization**: Ready for multi-language support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/jemsheena/calculator_app.git
cd calculator_app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production

# Testing
npm run test         # Run unit tests
npm run test:ui      # Run tests with UI
npm run test:e2e     # Run end-to-end tests

# Linting
npm run lint         # Run ESLint

# Preview
npm run preview      # Preview production build
```

## 🏗️ Architecture

### Project Structure

```
calculator_app/
├── public/                  # Static assets
│   ├── favicon.svg
│   └── manifest.webmanifest
├── src/
│   ├── app/                # App-level components
│   │   └── App.tsx
│   ├── components/         # Reusable UI components
│   │   ├── Display.tsx
│   │   ├── Key.tsx
│   │   ├── Keypad.tsx
│   │   ├── ModeToggle.tsx
│   │   ├── AngleToggle.tsx
│   │   ├── MemoryBar.tsx
│   │   └── HistoryPanel.tsx
│   ├── engine/             # Pure math engine (framework-agnostic)
│   │   ├── big/            # BigDecimal adapter
│   │   ├── tokens.ts       # Token types
│   │   ├── tokenizer.ts    # String → Tokens
│   │   ├── shuntingYard.ts # Infix → RPN parser
│   │   ├── evaluator.ts    # RPN → Result
│   │   ├── functions.ts    # Math functions
│   │   └── index.ts        # Public API
│   ├── features/
│   │   └── calculator/
│   │       ├── hooks/
│   │       │   └── useCalculator.ts  # Main calculator logic
│   │       └── constants/
│   │           └── keys.ts            # Keyboard mappings
│   ├── pages/
│   │   └── CalculatorPage.tsx
│   ├── styles/
│   │   └── index.css       # Global styles + Tailwind
│   ├── tests/              # Test files
│   └── main.tsx            # Entry point
├── .github/
│   └── workflows/
│       └── ci.yml          # CI/CD pipeline
└── package.json
```

### State Management

The calculator uses a **Finite State Machine (FSM)** with the following states:

- **Idle**: Initial state, display shows "0"
- **Entering**: User is inputting numbers
- **Operated**: An operator has been selected
- **Evaluating**: Calculation is being performed

### Math Engine

The math engine is a pure TypeScript implementation with:

1. **Tokenizer**: Converts input string into tokens (numbers, operators, functions, parentheses)
2. **Shunting-Yard Parser**: Converts infix notation to Reverse Polish Notation (RPN)
3. **RPN Evaluator**: Evaluates the RPN expression with high precision using `decimal.js`

This architecture ensures:
- ✅ No floating-point errors
- ✅ Correct operator precedence
- ✅ Support for complex expressions
- ✅ Easy to test and maintain

## 🎯 Usage

### Basic Operations

1. Enter a number
2. Select an operator (+, -, ×, ÷)
3. Enter another number
4. Press `=` to calculate

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0-9` | Enter digits |
| `.` | Decimal point |
| `+`, `-`, `*`, `/` | Basic operators |
| `Enter` or `=` | Calculate |
| `Backspace` | Delete last digit |
| `Escape` | Clear all |
| `%` | Percentage |
| `^` | Exponentiation |
| `(` `)` | Parentheses |
| `s` | Toggle scientific mode |

### Scientific Functions

Switch to **Scientific Mode** to access:
- Trigonometric functions: `sin`, `cos`, `tan`
- Logarithmic functions: `ln`, `log`
- Power functions: `√` (square root), `^` (exponentiation)

Toggle between **DEG** and **RAD** modes for trigonometric calculations.

### Memory Operations

- **MC**: Clear memory
- **MR**: Recall memory value
- **M+**: Add current display to memory
- **M-**: Subtract current display from memory

### History

Click any calculation in the history panel to reuse its result in a new calculation.

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

Tests cover:
- Math engine tokenization
- Shunting-Yard parser
- RPN evaluation
- Mathematical functions (trig, log, etc.)
- Edge cases (division by zero, large numbers, etc.)

### Component Tests
```bash
npm run test:ui
```

Tests verify:
- User interactions
- State transitions
- UI rendering
- Keyboard events

### End-to-End Tests
```bash
npm run test:e2e
```

E2E tests validate complete user workflows across different viewports.

## 🚢 Deployment

### GitHub Actions CI/CD

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:
1. Runs linting and tests
2. Builds the production bundle
3. Deploys to Cloudflare Pages (on main branch)

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains the production-ready files
# Deploy to your preferred hosting service:
# - Vercel
# - Netlify
# - GitHub Pages
# - Cloudflare Pages
```

## 🛠️ Tech Stack

- **React 18.2.0** - UI framework
- **TypeScript 5.2.2** - Type safety
- **Tailwind CSS 3.3.6** - Utility-first CSS
- **Vite 5.0.8** - Build tool and dev server
- **decimal.js 10.4.3** - High-precision arithmetic
- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **React Testing Library** - Component testing

## 📝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with modern web technologies for optimal performance
- Inspired by calculator apps with clean, intuitive interfaces
- Uses `decimal.js` for precise mathematical calculations

---

Made with ❤️ using React, TypeScript, and Tailwind CSS