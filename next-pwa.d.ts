declare module 'next-pwa' {
  import { NextConfig } from 'next';
  
  interface WithPWAConfig {
    dest?: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    [key: string]: any;
  }
  
  function withPWA(config: WithPWAConfig): (nextConfig: NextConfig) => NextConfig;
  
  export default withPWA;
}
