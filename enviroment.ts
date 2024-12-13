import Constants from "expo-constants";

const ENV: any = {
  dev: {
    apiUrl: "https://~",
  },
  staging: {
    apiUrl: "https://~",
  },
  prod: {
    apiUrl: "https://~",
  },
};

const getEnvVars = (env = Constants?.manifest?.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  } else if (env === "staging") {
    return ENV.staging;
  } else if (env === "prod") {
    return ENV.prod;
  } else {
    return ENV.prod;
  }
};

export default getEnvVars;
