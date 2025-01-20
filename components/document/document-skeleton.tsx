import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';

export default function DocumentSkeleton() {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle className="text-xl line-clamp-1">
                    <Skeleton className="rounded-sm w-full h-5"/>
                </CardTitle>
                <div className="flex flex-col gap-2">
                    <p className="text-sm">
                        <Skeleton className="rounded-sm w-1/2 h-3"/>
                    </p>
                    <p className="text-xs">
                        <Skeleton className="rounded-sm w-1/3 h-3"/>
                    </p>
                    <p className=" text-sm">
                        <Skeleton className="rounded-sm w-3/4 h-3"/>
                    </p>
                </div>
            </CardHeader>
            <CardContent className="-mt-2">
                <h2 className="space-y-1">
                    <Skeleton className="rounded-sm w-full h-3"/>
                    <Skeleton className="rounded-sm w-full h-3"/>
                    <Skeleton className="rounded-sm w-full h-3"/>
                </h2>
                <div className="flex gap-4 mt-3 ">
                    <Skeleton className="rounded-lg w-10 h-10"/>
                </div>
            </CardContent>
        </Card>
    )
}
