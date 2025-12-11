# Student Management

A project built with **TypeScript** and **TailwindCSS**.  
Project structure follows a framework-based convention.
Goal-standardization: DRY (Don't Repeat Yourself).

## Tag-line Standardization

- Use LF instead of CRLF for line endings.
- Configure `.gitattributes` for automatic translation.

## Folder Structure

### ./build

Acts as the main entry point for outputs, similar to `App.tsx` in ReactJS or `layout.tsx` in Next.js.

### ./public

Stores project assets such as images, fonts, icons, etc.

### ./src

Contains source code.  
`main.ts` serves as the intermediary linking sources in the `src` folder with `index.html`.

### ./utils

Contains utilities or helpers code

#### ../generateMaSV

- Some string methods have not been match with the version of EcmaScript (e.g. ES5, ES6, etc.) -> Checks the "target" in tsconfig.json to prevent the tackle
- Initialize a common generator used for overall system -> Prevent the meet to duplicate errors once loading page.

### ./ui

Contains rendering source code based on components

## Getting Started

```bash
# Install dependencies
npm install

# Run development build
npm run dev
```
