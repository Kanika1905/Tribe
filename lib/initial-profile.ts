import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {db} from "@/lib/db";
export const initialProfile=async()=>{
    const user=await currentUser();
    if(!user){
        return redirect("/sign-in");
    }
//try to find existing profile with this clerk id
    const profile=await db.profile.findUnique({
        where:{
            userid:user.id
        }
    });
//if there is one we are going to return it
    if(profile){
        return profile;
    }
//if it isn't we are gonna create one
    const newProfile=await db.profile.create({
        data:{
            userid:user.id,
            name:`${user.firstName} ${user.lastName}`,
            imageUrl:user.imageUrl,
            email:user.emailAddresses[0].emailAddress
        }
    });
    return newProfile;
};