"use client"
import { Document } from '@prisma/client';
import {addDocumentPerMonth} from "@/components/charts/lib";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    "Nombre de documents": {
        label: "Nombre de documents",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export  default  function DocsPerMonth({documents}: { documents: Document[] }){
    const data = addDocumentPerMonth(documents as Document[]);
    return (
        <Card className={"w-full"}>
            <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>
                    Nombre de documents créés par mois
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className={"max-h-[500px]"}>
                    <BarChart accessibilityLayer data={data} >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="mois"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar dataKey="Nombre de documents" fill="#16a34a" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
