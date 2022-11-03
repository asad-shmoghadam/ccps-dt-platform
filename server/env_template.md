# Environmental Variables

## Local

Use the following template to create `.env` file for local development.

> There are multiple ways to set the environmental variables in the development environment. You can find the documentation to setup these variables (depending on your platform and IDE) on the web.

```shell
ENV=local
```

## Production

For production use case you should set the following environmental variables in your app configuration.

> You can find the documentation to setup these variables (depending on your cloud provider) on the web.

```shell
ENV=prod
ASSET_ROOT=<STATIC_WEBSITE_URL>
ASSET_URL_PREFIX=<STATIC_WEBSITE_URL>/assets
CORS=* # or a list of domains
```

## Autodesk Forge APIs

> Make sure to create an application on the [Forge Developer Portal](https://forge.autodesk.com/en/docs/oauth/v2/tutorials/create-app/) and replace the following values with your own.

```shell
FORGE_CLIENT_ID=<YOUR_CLIENT_ID>
FORGE_CLIENT_SECRET=<YOUR_CLIENT_ID>
FORGE_CALLBACK_URL=<YOUR_SERVER_URL>/oauth/callback
FORGE_ENV=AutodeskProduction
FORGE_API_URL=https://developer.api.autodesk.com
FORGE_DOC_URN=<YOUR_DOC_URN>

FORGE_BUCKET=
```

## Built-in data adapter

### Azure adapter

Please uncomment the following part if you want to connect to Azure IoTHub and Time Series Insights

```shell
## Connect to Azure IoTHub and Time Series Insights
ADAPTER_TYPE=azure
AZURE_IOT_HUB_CONNECTION_STRING=
AZURE_TSI_ENV=

## Azure Service Principle
AZURE_CLIENT_ID=
AZURE_APPLICATION_SECRET=
AZURE_TENANT_ID=
AZURE_SUBSCRIPTION_ID=

## Path to Device Model configuration File
DEVICE_MODEL_JSON=

## End - Connect to Azure IoTHub and Time Series Insights
```

### CSV adapter

Please uncomment the following part if you want to use a CSV file as the time series provider

```shell
ADAPTER_TYPE=csv
CSV_MODEL_JSON=
CSV_DEVICE_JSON=
CSV_FOLDER=
CSV_DATA_START=  #Format: YYYY-MM-DDTHH:MM:SS.000Z
CSV_DATA_END=  #Format: YYYY-MM-DDTHH:MM:SS.000Z
CSV_DELIMITER="\t"
CSV_LINE_BREAK="\n"
CSV_TIMESTAMP_COLUMN="time"
CSV_FILE_EXTENSION=".csv"

## End - Please uncomment the following part if you want to use a CSV file as the time series provider
```

### Local adapter

```shell
ADAPTER_TYPE=local
```
