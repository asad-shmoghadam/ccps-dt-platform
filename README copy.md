# CCPS Digital Twin

## Requirements

## Local

## Production

Please make sure you use the following version of `node` for deploying to production, otherwise you will encounter errors.

### server

> Make sure to move `shared` folder to `server` directory when deploying to production. This requires to update the imports in the following directories:
>
> - `server/router/App.js`
> - `server/router/Index.js`
> - `server/app.js`

```shell
Node version: lts/fermium -> v14.x
```

### client

> Make sure the `shared` folder is in root directory before you run the build script `npm run build` for deploying to production.
> Also make sure to move `dist` folder to `assets` directory after building the client. Then upload the `assets` folder to the static website container (Azure Storage).

```shell
Node version: lts/erbium -> v12.x
```

## Environments Variables

> Please follow the instruction on [Environment Template](./server/env_template.md) to setup the your production and development environment.
