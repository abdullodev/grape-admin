import React, { useState, useMemo, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

// Types
interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  searchable?: boolean;
  height?: string;
}

type SortConfig<T> = {
  key: keyof T;
  direction: "asc" | "desc";
} | null;

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 100,
  searchable = true,
  height = "600px",
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(null);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  // Search and sort logic
  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Search
    if (searchQuery) {
      result = result.filter((row) =>
        columns.some((col) => {
          const value = row[col.key];
          return value
            ?.toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        })
      );
    }

    // Sort
    if (sortConfig) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (aVal === bVal) return 0;

        const comparison = aVal < bVal ? -1 : 1;
        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [data, searchQuery, sortConfig, columns]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredAndSortedData.slice(start, start + rowsPerPage);
  }, [filteredAndSortedData, currentPage, rowsPerPage]);

  const handleSort = useCallback((key: keyof T) => {
    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: "asc" };
      }
      if (current.direction === "asc") {
        return { key, direction: "desc" };
      }
      return null;
    });
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    },
    [totalPages]
  );

  const getSortIcon = (key: keyof T) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="w-4 h-4 opacity-40" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  return (
    <div className="w-full bg-[var(--card)] rounded-xl shadow-lg border border-[var(--border)] overflow-hidden">
      {/* Header with Search */}
      {searchable && (
        <div className="p-4 border-b border-[var(--border)] bg-[var(--accent)]">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder="Search across all columns..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] bg-[var(--accent)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-all"
            />
          </div>
        </div>
      )}

      {/* Table Container with Fixed Height */}
      <div style={{ height }} className="overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[var(--accent)] sticky top-0 z-10 shadow-sm">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  style={{ width: column.width }}
                  className="px-6 py-4 text-left text-sm font-semibold text-[var(--foreground)] border-b border-[var(--border)]"
                >
                  {column.sortable !== false ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="flex items-center gap-2 hover:text-[var(--primary)] transition-colors group"
                    >
                      {column.label}
                      {getSortIcon(column.key)}
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-[var(--border)] hover:bg-[var(--accent)] transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="px-6 py-4 text-sm text-[var(--foreground)]"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-[var(--border)] bg-[var(--accent)] flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="text-sm text-[var(--muted-foreground)]">
            Showing{" "}
            <span className="font-semibold text-[var(--foreground)]">
              {(currentPage - 1) * rowsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-[var(--foreground)]">
              {Math.min(
                currentPage * rowsPerPage,
                filteredAndSortedData.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[var(--foreground)]">
              {filteredAndSortedData.length}
            </span>{" "}
            results
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="rows-per-page"
              className="text-sm text-[var(--muted-foreground)]"
            >
              Rows per page:
            </label>
            <select
              id="rows-per-page"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] bg-[var(--accent)] text-[var(--foreground)] cursor-pointer hover:border-[var(--primary)] transition-colors"
            >
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={500}>500</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[var(--foreground)]"
          >
            <ChevronsLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[var(--foreground)]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    currentPage === pageNum
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]"
                      : "border-[var(--border)] hover:bg-[var(--muted)] text-[var(--foreground)]"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[var(--foreground)]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[var(--foreground)]"
          >
            <ChevronsRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
