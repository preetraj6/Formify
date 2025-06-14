
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.9b20da758c7848ba9a57c1ee5a9db464',
  appName: 'Formify',
  webDir: 'dist',
  server: {
    url: 'https://9b20da75-8c78-48ba-9a57-c1ee5a9db464.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#6366f1',
      showSpinner: false
    }
  }
};

export default config;
