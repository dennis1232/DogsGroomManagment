import { DefaultSession } from "next-auth";

// Extend the built-in session and token types
declare module "next-auth" {
  interface Session {
    user?: {
      username?: string;
      accessToken?: string;
    } & DefaultSession["user"];
  }

  interface User {
    username?: string;
    accessToken?: string;
  }

  interface JWT {
    username?: string;
    accessToken?: string;
  }
}
