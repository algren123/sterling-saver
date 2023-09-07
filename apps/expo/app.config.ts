import { ConfigContext, ExpoConfig } from '@expo/config'
import dotenv from 'dotenv'

dotenv.config()

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  extra: {
    eas: {
      projectId: process.env.EAS_PROJECT_ID || 'f15cda53-fbc4-4f22-8cba-b00cb672a6aa',
    },
  },
  owner: process.env.EAS_OWNER || 'algren123',
  plugins: ['expo-router', '@react-native-google-signin/google-signin'],
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  platforms: ['ios', 'android'],
  name: 'sterling-saver',
  slug: 'sterling-saver',
  updates: {
    url: 'https://u.expo.dev/85fc6ccd-0ce1-4e4d-804c-b15df989f97e',
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
})
