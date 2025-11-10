# Interactive Product Card

A responsive and interactive product display card built with React, TypeScript, and Tailwind CSS. This project showcases a single product with a modern, dark-themed UI, customer reviews, and interactive elements.

![Project Screenshot](<https://i.imgur.com/rY5gE9p.png>)
*<p align="center">A modern, responsive product card with interactive elements.</p>*

---

## ✨ Features

- **Interactive UI**: Card details are revealed on hover (desktop) or on tap (mobile), with a clear call-to-action indicator.
- **Responsive Design**: A seamless experience on both desktop and mobile devices. It features a multi-column layout on desktop that cleanly transitions to a single-column layout on mobile.
- **Customer Reviews**: Displays social proof through customer reviews to build trust.
- **Modern Tech Stack**: Built with Vite, React, and TypeScript for a fast and type-safe development experience.
- **Styled with Tailwind CSS**: Utilizes a utility-first CSS framework for rapid and consistent styling.
- **SEO Optimized**: Includes meta tags and structured data (Schema.org) for better search engine visibility.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## 📂 Project Structure

The project source code is located in the `src/` directory and is organized as follows:

```
src/
├── assets/         # Static assets like images
├── components/     # Reusable React components
│   ├── ProductCard.tsx
│   ├── ReviewCard.tsx
│   └── StarRating.tsx
├── data/           # Static data for the application
│   ├── product.ts
│   └── reviews.ts
├── types.ts        # TypeScript type definitions
├── App.tsx         # Main application component and layout
└── index.tsx       # Entry point of the React application
```

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1.  Clone the repository to your local machine:
    ```sh
    git clone https://github.com/ViVaLaDaniel/Cards.git
    ```
2.  Navigate into the project directory:
    ```sh
    cd Cards
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

To run the application in development mode, use the following command. This will start a local development server.

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the address shown in your terminal) to view it in the browser.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run preview`: Serves the production build locally to preview it.

## 📄 License

This project is licensed under the MIT License.