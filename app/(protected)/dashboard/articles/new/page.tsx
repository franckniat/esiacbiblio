import AddArticle from "@/components/article/add-article";
import {getTags} from "@/data/items";

export default async function NewArticle() {
    const tags = await getTags()
    return (
        <AddArticle tags={tags} />
    );
}