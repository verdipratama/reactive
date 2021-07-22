# reactive

> React Starter Boilerplate with React 17 Fast Refresh and Webpack 5

## Features

- React 17
- React Fast Refresh
- React Router 5
- Webpack 5
- CSS Autoprefixer
- CSS Modules with SourceMap
- @babel/plugin-proposal-class-properties
- @babel/plugin-syntax-dynamic-import
- Code splitting by Route and Vendor
- Webpack Bundle Analyzer
- CSS in JS with @emotion.js
- Testing with Jest and Enzyme

### Usage

Install dependencies

```
$ yarn
```

Run development server

```
$ yarn dev
```

### Building

```
$ yarn build
```

Will create a `dist` directory containing your compiled code.

Depending on your needs, you might want to do more optimization to the production build.

## Webpack Bundle Analyzer

Run in development

```
$ yarn dev:bundleanalyzer
```

Run on the production oprimized build

```
$ yarn build:bundleanalyzer
```

## Unit testing with Jest and Enzyme

Run testing watch mode

```
$ yarn test
```

Will create a `coverage` directory containing your testing compiled code.
