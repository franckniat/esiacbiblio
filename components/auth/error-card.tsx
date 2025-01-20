import Header from "@/components/auth/header";
import BackButton from "@/components/auth/back-button";
import { Card, CardHeader, CardFooter, CardContent, CardTitle } from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";
export default function ErrorCard() {
  return (
    <Card className="w-[400px] shadow-md">
        <CardHeader className="text-lg" >
            <CardTitle className="flex justify-center">
                Une erreur s{"'"}est produite ! 
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-center">
                <TriangleAlert className="text-red-600" size={50}/>
            </div>
        </CardContent>
        <CardFooter>
            <BackButton backButtonHref="/auth/login" backButtonLabel="Retour à la page de connexion"/>
        </CardFooter>
    </Card>
  )
}
