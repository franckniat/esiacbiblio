"use client";

import { signIn } from "@/auth";
import { Button } from "@/components/ui/button"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


export default function SocialButtons() {
  return (
    <div className="flex gap-x-3 w-full items-center">
        <Button 
          variant={"danger"} 
          className="w-full"  
          onClick={()=>
            signIn("google")
          }>
            Connectez vous avec Google
        </Button>
    </div>
  )
}
