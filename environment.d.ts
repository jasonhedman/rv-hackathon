declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_CHAIN_ID: string;
        NEXT_PUBLIC_TOKEN_ADDRESS: string;
        NEXT_PUBLIC_POOL_ADDRESS: string;
        ALPHA_VANTAGE_API_KEY: string;
        NEXT_PUBLIC_SERVER_URL: string;
        NEXT_PUBLIC_APP_ID: string;
        NEXT_PUBLIC_IEX_API_KEY: string;
        NEXT_PUBLIC_SWAPPER_ADDRESS: string;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}