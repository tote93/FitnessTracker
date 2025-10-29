export default {
  "schemas-to-ts": {
    enabled: true,
    config: {
      acceptedNodeEnvs: ["development"],
      commonInterfacesFolderName: "schemas-to-ts",
      alwaysAddEnumSuffix: false,
      alwaysAddComponentSuffix: false,
      usePrettierIfAvailable: true,
      logLevel: 2,
      destinationFolder: undefined,
    },
  },
  email: {
    config: {
      provider: "sendmail",
      providerOptions: {},
      settings: {
        defaultFrom: "email@strapi.mydomain.com",
      },
    },
  },
};
