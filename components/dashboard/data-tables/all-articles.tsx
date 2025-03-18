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
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ScanEye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import DeleteButton from "@/components/delete-button";
import { ArticleWithIncludes } from "@/types";
import { deleteArticle, hideArticle, publishArticle } from "@/actions/article";

export function AllArticles({ data }: { data: ArticleWithIncludes[] }) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const columns: ColumnDef<ArticleWithIncludes>[] = [
		{
			accessorKey: "title",
			header: () => {
				return <div>Titre de l&#039;article</div>;
			},
			cell: ({ row }) => (
				<div className="cursor-pointer hover:text-primary font-bold">
					<Link href={`/dashboard/article/${row.original.slug}`}>
						{row.original.title}
					</Link>
				</div>
			),
		},
		{
			accessorKey: "description",
			header: () => {
				return <div>Tags</div>;
			},
			cell: ({ row }) => (
				<div className="flex gap-2">
					{row.original.tags.map((tag) => (
						<span
							key={tag.id}
							className="text-sm text-foreground/60"
						>
							{tag.label}
						</span>
					))}
				</div>
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
							{!row.original.isVisible && (
								<Button
									variant={"outline"}
									onClick={() => {
										publishArticle(row.original.id).then(
											(res) => {
												if (res?.success) {
													toast.success(res.success);
												} else {
													toast.error(res?.error);
												}
											}
										);
									}}
								>
									Publier
								</Button>
							)}
							{row.original.isVisible && (
								<Button
									variant={"outline"}
									onClick={() => {
										hideArticle(row.original.id).then(
											(res) => {
												if (res?.success) {
													toast.success(res.success);
												} else {
													toast.error(res?.error);
												}
											}
										);
									}}
								>
									Masquer
								</Button>
							)}

							<Link
								href={`/dashboard/articles/${row.original.slug}`}
								title="Aperçu de l'article"
							>
								<Button size={"icon"} variant={"secondary"}>
									<ScanEye size={18} />
								</Button>
							</Link>
							<DeleteButton
								header={"Supprimer l'article"}
								message={
									"Cette action est irréversible. Voulez vous vraiment supprimer cet article ?"
								}
								contentButton={<Trash2 size={16} />}
								handleDeleteAction={() =>
									deleteArticle(row.original.id).then(
										(res) => {
											if (res?.success) {
												toast.success(res.success);
											} else {
												toast.error(res?.error);
											}
										}
									)
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
					placeholder="Recherchez un article ..."
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
				<Link href={"/dashboard/articles/new"}>
					<Button>Nouvel article</Button>
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
									Aucun article trouvé.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4 gap-2">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} sur{" "}
					{table.getFilteredRowModel().rows.length} articles
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
