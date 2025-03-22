import { Platform } from 'react-native';

const ENV = {
  dev: {
    API_URL: 'http://192.168.1.xxx:3000',  // Your local dev server
  },
  staging: {
    API_URL: 'https://staging-api.your-domain.com',
  },
  prod: {
    API_URL: 'https://api.your-domain.com',
  },
};

const getEnvVars = () => {
  if (__DEV__) {
    return ENV.dev;
  }
  return ENV.prod;
};

export default getEnvVars();