import GithubProvider from "next-auth/providers/github"
import dbConnect from "./dbConnext"
import User from "./userModel"
import jwt from "jsonwebtoken"
import { JWT } from "next-auth/jwt"

const options = {

  // this is the place we provide all the necessary login method we want to use
    providers: [
        GithubProvider({
          clientId: process.env.GITHUB_ID!,
          clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],


    // this is for callbacks, its runs a async function which are of the following
    // signin, session, jwt, and redirect callbacks
    callbacks:{
      // we run our sigin callbacks here!!!
      // this session is used to populate the user information to the database
      // what you return here does not matter, it only require you to return true if everything went well
      // and to return false if it did not go well.
      async signIn(session:any){

        // here, we willcheck if the user already exist in our database,
        // if it exist we return 
        // and if it does not exist we will create one
        try {
          dbConnect()
        const getUser = await User.findOne({email: session?.user?.email})
        if(getUser) return true
          // here, we want to register our user manually to the database
          // lets create a new object that contain our new user here
          const newUser = {
            name: session?.user?.name,
            email: session?.user?.email,
            image: session?.user?.image
          }
        const addNewUser = await new User(newUser);
        const savedUser = addNewUser.save()
        return true
          } catch (error) {
            return false
          }
       
        
      },

      // here, we run our session callback 
      // this callback is used for adding more information to our session
      async session({session}:any) {
        /*
        NB: this session above is what we are updating here, once updated, it will automatically pass to the 
        session used in the frontend and also the backend.
        */ 
        // connect to database
        dbConnect()
        // get the user info from database,
        // this is the info you wanted to add more to your data base
        const getUser = await User.findOne({email: session?.user?.email})
        // here, we tap into the user aspect of the session and then add more property
        session.user  = {...session.user, ...getUser._doc}
        // then we return the session
        return session
      },

      /*
      Redirect callback which contains two parameter 1,baseurl and 2, url
      the baseurl is simple the domain url or the home url, 
      this is actually the url we defined in the env using NEXT_URI.

      then the url is actually the routing or page 
      for example when we navigate to the "/about"
      the /about is the url
      while the http://localhost:3000 or anything you used as your domain base.

      this callback is important if your want to manipulate the particlar place or route where nextauth takes
      unvarified user to, or where nextauth takes verifed user to, or you can still make more complex config
      accoring to how you wish

      */ 
      async redirect({ url, baseUrl }:{url:string, baseUrl:string}) {
        return baseUrl
      },
    },

    

    /*
    Another part of this option is the jwt setting
    from the documentation, next-auth automatically sets a jwt inform of JWE  as a cookie,
    thou it is advisible to still leave it that way and  not implement your own
    but you can still implement it using this method
    */
    jwt:{
      // here, the function params contains the secret and token
      // the secret is simply the NEXT_SECRET we set in the .env
      // why the token is the users session that we want to encrypt
      async encode(params:{secret:string, token:JWT}): Promise<string>{
        const condedtoken =  jwt.sign(
          {...params.token,
          iss: "gmodetech",
          exp: Math.floor(Date.now()/1000) + 60*60
          }, 
          params.secret)
        return condedtoken
      },
      // here the secret still remains the NEXT_SECRET 
      // why this token is our encrypted jwt string
      async decode(params:{secret:string, token:string}): Promise<JWT | null>{
        const decodedToken = jwt.verify(params.token, params.secret) as JWT;
        return decodedToken
      }
    }
}
export default options 