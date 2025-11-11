# ATS Resume Builder

A lightweight resume builder built with React and Vite. It helps you collect personal details, work experience, education, skills, and certificates, then renders the data as a clean resume preview. Form entries are saved to `localStorage` so you can refresh the page without losing progress.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the link printed in the terminal (usually <http://localhost:5173>) to use the app.

## Available Scripts

- `npm run dev` – launches Vite in development mode with hot reloading.
- `npm run build` – builds the production assets.
- `npm run preview` – serves the production build locally for inspection.

## Features

- Guided forms for personal information, experience, education, skills, and certificates.
- Automatic persistence via browser `localStorage`.
- Live resume preview that updates as you type.

## Tech Stack

- React
- Vite
- CSS Modules