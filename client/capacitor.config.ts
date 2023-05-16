import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aayat.app',
  appName: 'Aayat Construction',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
        presentationOptions: ['badge', 'sound', 'alert']
    },
    SplashScreen: {
      "launchShowDuration": 3000,
      "launchAutoHide": true,
      "backgroundColor": "#ffffffff",
      "androidSplashResourceName": "splash",
      "androidScaleType": "CENTER_CROP",
      "showSpinner": false,
      "androidSpinnerStyle": "large",
      "iosSpinnerStyle": "small",
      "spinnerColor": "#999999",
      "splashFullScreen": true,
      "splashImmersive": true,
      "layoutName": "launch_screen",
      "useDialog": true
    }
    
}
};

export default config;
