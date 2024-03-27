"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {Google, Github, Facebook} from "react-bootstrap-icons";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


export default function SocialButtons() {
  const onClick = async (provider: string) => {
    await signIn(provider,{
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  }
  return (
    <div className="flex gap-x-3 w-full items-center">
        <Button 
          variant={"danger"} 
          className="w-full"  
          onClick={()=>
            onClick("google")
          }>
            <Google size={20}/>
        </Button>
        <Button 
          variant={"outline"} 
          className="w-full"  
          onClick={()=>
            onClick("github")
          }>
            <Github size={20}/>
        </Button>
        <Button 
          variant={"sky"} 
          className="w-full"  
          onClick={()=>
            onClick("facebook")
          }>
            <Facebook size={20}/>
        </Button>
    </div>
  )
}
