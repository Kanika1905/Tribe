import {initialProfile} from "@/lib/initial-profile";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";
import { InitialModal } from "@/components/Modals/initial-modal";

const SetupPage = async() => {
const profile=await initialProfile();
//attempt to find any server that this user is a membr of 
//so wwe are gonna search through all the servers and find the 1st one that has profile id in one of the members of that server
const server=await db.server.findFirst({
    where:{
        members:{
            some:{
                profileId:profile.id
            }
        }
    }
})

    if(server){
        return redirect(`/server/${server.id}`)
    }
//if user is not part of any server we are gonna show this
    return <InitialModal />
}
 
export default SetupPage;

//assume that this profile is a member of that server and let's immediately load that server for the user, in let's say general channel
