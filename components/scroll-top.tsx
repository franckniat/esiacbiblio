"use client";
import {Button} from "@/components/ui/button";
import {ChevronUp} from "lucide-react";

export default function ScrollTop(){
    return(
        <Button
            className={"hover:scale-110 transition-transform w-12 h-12 fixed bottom-4 right-4 z-50 will-change-transform rounded-full active:scale-90"}
            onClick={()=>{
                window.scrollTo({top: 0, behavior: 'smooth'});
            }}
            variant={"secondary"}
        >
            <ChevronUp size={18}/>
        </Button>
    )
}