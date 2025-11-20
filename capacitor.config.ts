import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.swift.donation',
  appName: 'swift-donation-app',
  webDir: 'dist',
  server: {
    url: 'https://63851349-5e40-4dba-9775-bf4cdb4c6e5f.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;
