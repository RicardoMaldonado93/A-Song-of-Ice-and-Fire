# An interface of Ice and Fire

![An interface of Ice and Fire](https://github.com/RicardoMaldonado93/An-Interface-of-Ice-and-Fire/blob/main/src/app/twitter-image.png)


Welcome to **An interface of Ice and Fire** — an application built to help fans of _A Song of Ice and Fire_ keep track of the series' extensive roster of characters and their fates. In a world where allegiances shift and heads roll, this app provides a simple interface to stay updated on the life (or death) status of the sworn members of Westeros' most prominent houses.

## 📜 Project Overview

"As an avid fan of the epic series _A Song of Ice and Fire_, I have a hard time keeping up with all of the characters who lose their heads. As such, I would like to have an application that can help me track which characters from the series are alive or dead."

**Data Source:** [An API of Ice and Fire](https://anapioficeandfire.com/)  
**Built With:** Next.js (App Router), with support for pagination, dynamic rendering, and intuitive UI components.

---

## ⚙️ Features

- **House List with Sworn Members:** Displays information on each of the first 10 houses in the _An API of Ice and Fire_, with details on their sworn members.
- **Alive/Dead Status of Characters:** Easily see which characters are still breathing and which have met an untimely end.
- **Death Details:** For deceased characters, a brief description of their demise (as provided by the API).
- **Error Handling for Empty Houses:** If a house has no sworn members, a friendly message will display ("This house has no sworn members").
- **Character Details Page:** Each character can be selected to view more detailed information, including their Aliases, affiliations, and any notable events they’ve been part of.

## 🛠️ Technologies Used

This application is built using:

- **Next.js (with App Router)**: For modern routing, efficient data fetching, and server-side rendering.
- **Tailwind CSS**: For utility-first styling, making it easy to achieve a responsive and consistent design.
- **Shadcn/ui**: A component library that provides high-quality and customizable components to build a visually cohesive UI.
- **TypeScript**: For type safety and maintainability.

---

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RicardoMaldonado93/An-Interface-of-Ice-and-Fire
   cd an-interface-of-ice-and-fire
   ```
2. **Install the dependencies:**
   ```bash
   pnpm install
   ```
3. **Create and set the URL into the environment file (you can use the env.template file for guidance):**
   ```bash
   API_URL=https://anapioficeandfire.com/api
   ```
4. ***Run the app:**
   ```bash
   pnpm dev #this will open as default the port 3000
   ```
