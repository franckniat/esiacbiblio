import React from 'react'
import { DashboardWrapper } from '../_components/dashboard-wrapper'
import DocumentsTable from '../_components/documents-table'

export default function DocumentsDashboard() {
  return (
    <DashboardWrapper
        title="Vos documents"
        headerMessage='Gérer vos documents ici.'
        path={[{ name: 'Documents', href: '/dashboard/documents' }]}
    >
        <DocumentsTable/>
    </DashboardWrapper>
  )
}
