import NextAuth from "next-auth"
import options from "@/utils/options";

// when you make use of this code below, it helps you to add more field to your sessions
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
      user: {
        password:string;
        maritalStatus: string;
        _id: string;
      }
    }
  }

/*
this should be noted, that when making use of both Oauth and credential providers,
it is important to leave the jwt as a default JWE,
this is because the credentail provider don't work with jwt encryption
*/   
const handler = NextAuth(options);

export  {handler as GET, handler as POST}