# Electron Boilerplate with React, TypeScript & Vite

A bare minimum react typescript vite boilerplate.

Note that this project does not include **Server-Side Rendering**,  **Testing Frameworks** and other stuffs that makes the package unnecessarily complicated.

#### See also:
- [vite-electron-builder](https://github.com/cawa-93/vite-electron-builder)
  
## Contains

- [x] [Electron](https://electronjs.org/) 15.3
- [x] [Typescript](https://www.typescriptlang.org/) 4.5
- [x] [React](https://facebook.github.io/react/) 17
- [x] [React Dev Tools](https://github.com/facebook/react)
- [x] [eslint](https://eslint.org/) 7.32
- [x] [source-map-explorer](https://github.com/danvk/source-map-explorer) 2.5
- [ ] [prettier](https://prettier.io/)

### Build tools

- [x] [Vite](https://vitejs.dev/) 2.7
- [x] [electron-rebuild]()
- [x] [electron-notarize](https://github.com/electron/electron-notarize)

### Package tools

- [x] [electron-builder](https://www.electron.build/) 22.13

## Setup

```
$ npm install
```

## Running

```
$ npm run build
$ npm start
```

## Dev

```
$ npm run dev
```

## Package

```
$ npm run package
```

## Mac notarize app
Befroe: Set teamId, appleId, appleIdPassword in ./scripts/afterSignHook .js
</br>
you can see: https://github.com/electron/electron-notarize 
```
export ALLOWNOTARIZE='true'
npm run package
```

### 

## Eslint

```
$ npm run lint
```

# License

MIT
