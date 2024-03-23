import React from "react"
import NextThemesProvider from "./theme-provider"

export default function Providers({children}:{children:React.ReactNode}){
    return(
        <NextThemesProvider enableSystem defaultTheme="system" attribute="class">
            {children}
        </NextThemesProvider>
    )
}