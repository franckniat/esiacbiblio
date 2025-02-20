import AddArticle from "@/components/article/add-article";
import {getSectors, getTags} from "@/data/items";

export default async function NewArticle() {
    const tags = await getTags()
    const sectors = await getSectors()
    return (
        <AddArticle tags={tags} sectors={sectors} />
    );
}