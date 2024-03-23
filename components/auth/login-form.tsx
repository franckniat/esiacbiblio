"use client";
import CardWrapper from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription} from "@/components/ui/form";
import { BackButton } from "@/components/ui/back-button";
import {useForm} from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { Button } from "@/components/ui/button";

export const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
          email:"",
          password:"",
        }
      });
    return(
        <CardWrapper
        headerLabel="Connectez vous"
        backButtonLabel="Vous n'avez pas de compte ?"
        backButtonHref="/auth/register"
        messageLabel="Accéder à votre compte"
        showSocials
        >
            <BackButton />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(()=>{})} className="space-y-6">
                    <div className="space-y-4">
                    <FormField control={form.control} name="email" render={({field})=>(
                        <FormItem>
                        <FormLabel>Email : </FormLabel>
                        <FormControl>
                            <Input {...field}  placeholder="exemple@esiac.cm" type="email"/>
                        </FormControl>
                        <FormMessage className="text-sm"/>
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="password" render={({field})=>(
                        <FormItem>
                        <FormLabel>Mot de passe : </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="********" type="password"/>
                        </FormControl>
                        <FormMessage className="text-sm"/>
                        </FormItem>
                    )}/>
                    </div>
                    {/* <FormError message={error}/>
                    <FormSuccess message={success}/> */}
                    <Button type="submit"   className="w-full">Se connecter</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}