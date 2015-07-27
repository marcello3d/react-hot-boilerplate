react-hot-boilerplate
=====================

This is a fork of https://github.com/gaearon/react-hot-boilerplate

The intention of this fork is to use webpack-dev-middleware and webpack-hot-middleware to demonstrate how you could 
integrate this project into a normal express server.

### Dev-server Usage

```
npm install
npm start
open http://localhost:3200
```

Now edit `src/App.js`.  
Your changes will appear without reloading the browser like in [this video](http://vimeo.com/100010922).

### Building

```
npm run build
```

This will eslint and build JavaScript bundles in `./dist/`. 

This webpack config is designed to name the files based on a hash. A filename map is generated in 
`./dist/webpack-assets.json` and can be used to generate the appropriate html links.

