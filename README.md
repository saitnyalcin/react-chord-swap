# ChordSwap 🎸 🎶

ChordSwap is an open-source web application that performs real-time pitch detection using the Web Audio API and displays the detected pitch, clarity, and a corresponding guitar chord diagram. It allows musicians and learners to practice and play chords in real-time.

## Features

- Real-time pitch detection using the Web Audio API.
- Display of detected pitch and clarity values.
- Guitar chord diagrams for the detected chord.
- Easy-to-use interface for musicians and learners.

## Getting Started

Follow these steps to set up and run ChordSwap locally:

1. Clone the repository: `git clone https://github.com/saitnyalcin/react-chord-swap.git`
2. Navigate to the project directory: `cd react-chord-swap`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your browser and go to: `http://localhost:5173`

## Contributing

We welcome contributions from the community! To contribute to ChordSwap, follow the guidelines outlined in [CONTRIBUTING.md](CONTRIBUTING.md).

## Code of Conduct

ChordSwap is committed to fostering an inclusive and respectful community. We expect all contributors to adhere to the guidelines outlined in [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

ChordSwap is open-source software licensed under the [MIT License](LICENSE).

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
