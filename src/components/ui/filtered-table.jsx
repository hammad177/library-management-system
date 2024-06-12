"use client";
import { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { ChevronUp, ChevronDown } from "lucide-react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Spinner from "@/components/spinner/index";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "./table";

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  className,
  placeholder,
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="flex justify-start">
      <div className="flex items-center">
        <span className="mr-2">Search:</span>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={className}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};
const FilteredTable = ({
  columns = [],
  title = "",
  data = [],
  ButtonCmp = () => <></>,
  isLoading = false,
  pageSize = 10,
}) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
    state: {
      columnFilters,
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize]);

  const onPageChanged = (page) => {
    table.setPageIndex(page - 1);
  };

  // Handler for page size change
  const onPageSizeChange = (e) => {
    table.setPageSize(Number(e.target.value));
  };

  return (
    <>
      <div className="overflow-hidden">
        <h2 className="m-4 text-3xl capitalize">{title}</h2>
        {/* Search Input */}
        <div className="flex mx-4 items-center justify-between mb-6 mt-2">
          <DebouncedInput
            value={globalFilter ?? ""}
            className="p-2 font-lg shadow border border-block"
            placeholder="Search all columns..."
            onChange={(value) => setGlobalFilter(value)}
          />
          <ButtonCmp />
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <PerfectScrollbar className="max-h-[570px]">
            <div className="relative">
              <Table className="table-default">
                {/* Table Head */}
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id} colSpan={header.colSpan}>
                            {header.isPlaceholder ? null : (
                              <div
                                {...{
                                  className: header.column.getCanSort()
                                    ? "cursor-pointer select-none"
                                    : "",
                                  onClick:
                                    header.column.getToggleSortingHandler(),
                                }}
                              >
                                <div className="flex">
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                  {{
                                    asc: <ChevronUp className="ml-1" />,
                                    desc: <ChevronDown className="ml-1" />,
                                  }[header?.column?.getIsSorted()] ?? null}
                                </div>
                              </div>
                            )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>

                {/* Table Body */}
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        )}

        {/* <Pagination
            perPage={table.getState().pagination.pageSize}
            currentPage={table.getState().pagination.pageIndex + 1}
            totalData={data?.length}
            onPageChanged={onPageChanged}
            onPageSizeChange={onPageSizeChange}
          /> */}
      </div>
    </>
  );
};

export default FilteredTable;
