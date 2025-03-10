
import React from 'react'
import { getArticleBySlug } from '@/data/article'
import { notFound } from 'next/navigation';
import UpdateArticle from '@/components/article/update-article';
import { getSectors, getTags } from '@/data/items';

export default async function EditArticlePage({params}:{params:Promise<{slug:string}>}) {
  const {slug} = await params;
  const article = await getArticleBySlug(slug);
  const sectors = await getSectors();
  const tags = await getTags();
  if (!article) {
    notFound();
  }
  return (
    <div>
        <UpdateArticle
            article={article}
            sectors={sectors}
            tags={tags}
        />
    </div>
  )
}
