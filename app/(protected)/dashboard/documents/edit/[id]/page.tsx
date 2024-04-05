import React from 'react'
import UpdateDocumentForm from '../../../_components/update-document'
import { getDocumentById } from '@/data/documents';

export default async function EditDocument({
    params }: { params: { id: string } }) {
    const id = params.id;
    const document = await getDocumentById(id);
    return (
        <>
            {document && (
                <UpdateDocumentForm
                    id={params.id}
                    title={document.title}
                    description={document.description}
                    sector={document.sector}
                    category={document.category}
                    fileURL={document.fileURL}
                />
            )}
        </>
    )
}
