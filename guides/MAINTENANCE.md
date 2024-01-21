# Library Maintenance

Before releasing a new version, make sure to build the project with `npm run build` and to test it in both frontend and node environments.

## Testing in Node

`node ./examples/node/index.js`

## Testing in NextJS

```bash
cd examples/nextjs
npm run dev
```

Then on the UI, test the read / write operations.

## Modifying the config / settings

All settings are located in [vite.config.ts](../vite.config.ts).

### Change project name

Inside the vite config, navigate to the following part:

```js
    {...   
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "mem-sdk", // <- change this 
        fileName: (format) => `index.${format}.js`,
        formats: ["cjs", "umd", "es"],
    }
```

### Add more formats

```js
    {...   
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "mem-sdk",
        fileName: (format) => `index.${format}.js`,
        formats: ["cjs", "umd", "es"], // <- change this 
    }
```

## Changing global settings and versions
Inside the [tsconfig.json](../tsconfig.json) file, you can locate several parameters:

```js
"compilerOptions": {
    ...
    "module": "CommonJS",
    "declaration": true,
    "removeComments": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2017", // <- change this to support later versions. Fetch feature might break if older versions are selected.
    "sourceMap": false,
    "outDir": "mem-sdk/dist",
    ...
}
```
