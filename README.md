react-hotplate
==============

react-hotplate is a boilerplate for React + Webpack + Express with hot reloading.

It provides both a development mode (`npm run dev`) and production mode (`npm run build && npm start`).

It was originally based on (gaearon/react-hot-boilerplate)[https://github.com/gaearon/react-hot-boilerplate] and has 
been updated using (gaearon/react-transform-boilerplate)[https://github.com/gaearon/react-transform-boilerplate].

### Development server

```
npm install
npm run dev
open http://localhost:3200
```

Now edit `src/App.js`.  
Your changes will appear without reloading the browser like in [this video](http://vimeo.com/100010922).

### Production server usage

```
npm run build
```

This will eslint and build JavaScript bundles in `./dist/`. 

This webpack config is designed to name the files based on a hash. A filename map is generated in 
`./dist/webpack-assets.json` and can be used to generate the appropriate html links.

Start the production server with:

```
npm start
```

### Notable Modules

* [webpack](https://www.npmjs.com/package/webpack) - efficiently builds common js modules as a browser-compatible js bundle  
* [webpack-dev-middleware](https://www.npmjs.com/package/webpack-dev-middleware) - runs webpack as middleware
* [webpack-hot-middleware](https://www.npmjs.com/package/webpack-hot-middleware) - allows hot swapping node modules without a page refresh
* [react-transform-webpack-hmr](https://www.npmjs.com/package/react-transform-webpack-hmr) - hot swapping react components without a page refresh
* [react-transform-catch-errors](https://www.npmjs.com/package/react-transform-catch-errors) - catch exceptions in component renders
* [babel](https://www.npmjs.com/package/babel) - transpiles ES6/JSX as ES5
* [babel-runtime](https://www.npmjs.com/package/babel-runtime) - used to export babel helper code to the vendor file
* [babel-eslint](https://www.npmjs.com/package/babel-eslint) - lints ES6 code
* [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) - lints React/JSX code
* [node-dev](https://www.npmjs.com/package/node-dev) - automatically restarts node server when any required files change

### Folder structure

The meat of the hotplate code is in `server.js` and `webpack.config.js`. Both files look at the `NODE_ENV` environment
variable to determine if it should run in `development` or `production` mode.

The files for the app are in `src/`.

## License

The original code this was based on was released under the MIT license. 
My changes are released under public domain.