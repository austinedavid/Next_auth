import {getServerSession} from "next-auth/next"
import options from "@/utils/options"
// here, we make use of get server section to get our user sessions
const getSessions = async()=>{
    const seesion = await getServerSession(options)
    return seesion
}

export default getSessions