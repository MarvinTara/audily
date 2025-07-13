# Audily

Audily is a modern web application designed to provide users with an immersive audio experience. It features a collection of songs and posters, allowing users to explore and enjoy music visually and audibly.

## Features

- **Music Library**: A curated collection of songs available for playback.
- **Posters**: Visual representations of songs to enhance the user experience.
- **Modern UI**: Built with React and styled for a seamless user experience.

## Project Structure

The project is organized as follows:

```
.gitignore
components.json
eslint.config.js
index.html
package.json
pnpm-lock.yaml
README.md
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
public/
	vite.svg
src/
	App.jsx
	index.css
	main.tsx
	vite-env.d.ts
	assets/
	components/
		ui/
	lib/
		utils.ts
	posters/
		apologize.jpg
		battle_field.jpg
		blessed_is_the_hand_that_giveth.jpg
		breathless.jpg
		oceans.jpg
		piano_man.jpg
		rolling_in_the_deep.jpg
		thinking_out_loud.jpg
	songs/
		apologize_justin_timberlake.mp3
		...
```

### Key Files

- **`src/App.jsx`**: The main React component that serves as the entry point for the application UI. It includes the following features:
  - **Poster Display**: Dynamically renders posters associated with songs.
  - **Audio Playback**: Integrates audio controls for playing songs.
  - **UI Components**: Utilizes reusable components for a modular design.
  - **State Management**: Manages application state using React hooks.

- **`package.json`**: Contains project metadata and dependencies.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```sh
   cd audily
   ```

3. Install dependencies using `pnpm`:
   ```sh
   pnpm install
   ```

## Usage

To start the development server, run:

```sh
pnpm dev
```

This will launch the application in your default web browser.

## Scripts

The following scripts are available in the `package.json`:

- **`pnpm dev`**: Starts the development server.
- **`pnpm build`**: Builds the project for production.
- **`pnpm preview`**: Previews the production build locally.

## Technologies Used

- **React**: For building the user interface.
- **Vite**: As the build tool and development server.
- **pnpm**: For dependency management.

## Assets

The project includes a collection of posters and songs located in the `src/posters` and `src/songs` directories, respectively.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For inquiries or support, please contact tarelmarvin@gmail.com.