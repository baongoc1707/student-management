# Student Management

A project built with **TypeScript** and **TailwindCSS**.  
Project structure follows a framework-based convention.

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

## Getting Started

```bash
# Install dependencies
npm install

# Run development build
npm run dev
```
