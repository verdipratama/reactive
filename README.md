# reactive

> React Starter Boilerplate with React 17 Fast Refresh and Webpack 5

## Features

- React 17
- React Fast Refresh
- React Router 5
- Webpack 5
- Semantic UI as the CSS Framework
- CSS Autoprefixer
- CSS Modules with SourceMap
- @babel/plugin-proposal-class-properties
- @babel/plugin-syntax-dynamic-import
- Code splitting by Route and Vendor
- Webpack Bundle Analyzer

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
