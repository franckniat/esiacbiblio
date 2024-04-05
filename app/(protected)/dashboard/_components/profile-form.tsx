"use client";
import DashboardFormWrapper from "./dashboard-form-wrapper";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProfileUpdateSchema } from "@/schemas";
import React, { useTransition, useState } from "react";
import { z } from "zod";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import { Label } from "@/components/ui/label";
import { updateUser } from "@/actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { getStringOfFile } from "@/firebase/functions";


export function ProfileForm() {
  const { data, update } = useSession();
  const form = useForm<z.infer<typeof ProfileUpdateSchema>>({
    resolver: zodResolver(ProfileUpdateSchema),
    defaultValues: {
      name: data?.user.name,
      bio: data?.user.bio || "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [file, setFile] = useState<File>();
  const [success, setSuccess] = useState<string | undefined>();

  const [imageUser, setImageUser] = useState<string>(data?.user.image);

  const isAdmin = data?.user?.role === "ADMIN" || data?.user?.role === "SUPERADMIN";

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file?.size > 5242880) {
        return setError("La taille du fichier ne doit pas dépasser 5 Mo.");
      }
      const newImg = URL.createObjectURL(file);
      setImageUser(newImg);
      setFile(file);
    }
  };
  const onSubmit = async (profileData: z.infer<typeof ProfileUpdateSchema>) => {
    startTransition(async() => {
      setError("");
      setSuccess("");
      if(file){
        const fileURL = await getStringOfFile(file, `images/users/${data?.user.id}`);
        profileData.image = fileURL;
      }
      updateUser(profileData).then((res) => {
        update();
        setError(res?.error);
        setSuccess(res?.success);
      });
    });
  };
  return (
    <DashboardFormWrapper
      title="Modifier votre profil"
      headerMessage="Modifiez vos informations personnelles."
      className="mt-3"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl pb-8">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom : </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Franck NIAT"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio : </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      placeholder="Développeur web et mobile, passionné par la technologie et l'innovation."
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <div className="space-y-2 w-fit">
              <Label className="w-fit cursor-pointer" htmlFor="user_image">
                Changer votre photo de profil :
                <Avatar
                  className={`hover:bg-opacity-80 flex items-center justify-center my-3 w-[100px] h-[100px] ${
                    isAdmin ? "border-2 border-amber-600" : "border-none"
                  }`}
                >
                  {(data?.user && imageUser === "") ||
                  imageUser === undefined ||
                  imageUser === null ? (
                    <AvatarFallback className="font-bold">
                      {data?.user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  ) : (
                    <AvatarImage className="object-cover" src={imageUser} />
                  )}
                </Avatar>
              </Label>
              <Input
                id="user_image"
                className="hidden"
                onChange={handlePhotoUpload}
                disabled={isPending}
                placeholder="Donnez un titre à votre document"
                type="file"
                accept="image/*"
              />
            </div>
          </div>
          <div className="my-2">
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-fit mt-4"
          >
            Modifier votre profil
          </Button>
        </form>
      </Form>
    </DashboardFormWrapper>
  );
}
