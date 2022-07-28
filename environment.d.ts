declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_CHAIN_ID: string;
        NEXT_PUBLIC_TOKEN_ADDRESS: string;
        NEXT_PUBLIC_POOL_ADDRESS: string;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}