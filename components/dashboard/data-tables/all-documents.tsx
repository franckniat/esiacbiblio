"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Download, Trash2} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Document, User } from "@prisma/client";
import DeleteButton from "@/components/delete-button";
import {deleteDocument, publishDocument} from "@/actions/document";

export type DocumentWithIncludes = Document & {
    user: User;
}


export function AllDocuments({ data }: { data: DocumentWithIncludes[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const columns: ColumnDef<DocumentWithIncludes>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "title",
            header: () => {
                return <div>Intitulé du document</div>;
            },
            cell: ({ row }) => (
                <div className="cursor-pointer hover:text-primary font-bold">
                    <h1>
                        {row.original.title}
                    </h1>
                </div>
            ),
        },
        {
            accessorKey: "description",
            header: () => {
                return <div>Description</div>;
            },
            cell: ({ row }) => (
                <p className="line-clamp-1 max-w-sm">
                    {row.original.description}
                </p>
            ),
        },
        {
            accessorKey: "start",
            header: () => <div>Date de création</div>,
            cell: ({ row }) => (
                <>
                    {row.original.createdAt.toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                        }) +
                        " - " +
                        row.original.createdAt.toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                </>
            ),
        },
        {
            accessorKey: "end",
            header: () => <div>Date de modification</div>,
            cell: ({ row }) => (
                <>
                    {row.original.updatedAt.toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                        }) +
                        " - " +
                        row.original.updatedAt.toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                </>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <>
                        <div className="flex gap-2">
                            {!row.original.isVisible &&
                                <Button
                                    onClick={()=>{
                                        publishDocument(row.original.id).then((res) => {
                                            if (res?.success) {
                                                toast.success(res.success)
                                            } else {
                                                toast.error(res?.error)
                                            }
                                        })
                                    }}
                                >
                                    Publier
                                </Button>
                            }
                            <Button variant={"outline"} onClick={()=>{
                                window.open(row.original.fileURL, "_blank")
                            }}>
                                <Download size={18}/>
                            </Button>
                            <DeleteButton
                                header={"Supprimer le document"}
                                message={"Cette action est irréversible. Voulez vous vraiment supprimer ce document ?"}
                                contentButton={<Trash2 size={16} />}
                                handleDeleteAction={()=> deleteDocument(row.original.id).then((res) => {
                                    if (res?.success) {
                                        toast.success(res.success)
                                    } else {
                                        toast.error(res?.error)
                                    }
                                })
                                }
                            />
                        </div>
                    </>
                );
            },
        },
    ];

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    table.getState().pagination.pageSize = 10;
    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4 gap-3">
                <Input
                    placeholder="Recherchez un document ..."
                    value={
                        (table
                            .getColumn("title")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("title")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <Link href={"/dashboard/documents/new"}>
                    <Button>Nouveau document</Button>
                </Link>
            </div>
            <div className="rounded-md border border-foreground/10">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-foreground/60"
                                >
                                    Aucun client trouvé.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4 gap-2">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} sur{" "}
                    {table.getFilteredRowModel().rows.length} clients
                    sélectionnées.
                </div>
                <div className="text-sm text-foreground/20">
                    Page {table.getState().pagination.pageIndex + 1} sur{" "}
                    {table.getPageCount()}
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Précedent
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Suivant
                    </Button>
                </div>
            </div>
        </div>
    );
}
