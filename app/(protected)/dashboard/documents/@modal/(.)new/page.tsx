import AddDocument from "@/components/document/add-document";
import { getCategories, getSectors } from "@/data/items";
import React from "react";

export default async function Documents() {
    const categories = await getCategories();
    const sectors = await getSectors();
    return (
        <AddDocument categories={categories} sectors={sectors} />
    );
}