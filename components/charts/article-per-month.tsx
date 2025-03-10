"use client"
import { Article } from '@prisma/client';
import {addArticlePerMonth} from "@/components/charts/lib";
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
    "Nombre d'articles": {
        label: "Nombre d'articles",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export  default  function ArticlesPerMonth({articles}: { articles: Article[] }){
    const data = addArticlePerMonth(articles as Article[]);
    return (
        <Card className={"w-full"}>
            <CardHeader>
                <CardTitle>Articles</CardTitle>
                <CardDescription>
                    Nombre d&apos;articles créés par mois
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
                        <Bar dataKey="Nombre d'articles" fill="#34d399" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
