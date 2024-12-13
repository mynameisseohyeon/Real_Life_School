import Constants from "expo-constants";

// dev : 개발모드
// staging : 실제 운영 환경과 동일한 환경, 운영 이전에 기능 이외의 부분(성능, 보안 등)을 테스트하기 위한 환경
// production : 실제 배포

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
