"use client";

import { ReactNode } from "react";

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  // Visibility at different container sizes
  // 'always' = show at all sizes, 'medium' = hide on compact, 'wide' = only show on wide
  visibility?: "always" | "medium" | "wide";
  render?: (item: T) => ReactNode;
}

export interface WidgetTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  /** Optional key extractor, defaults to index */
  keyExtractor?: (item: T, index: number) => string;
  /** Show row hover effect */
  hoverable?: boolean;
}

/**
 * Container-responsive table component for widgets.
 * Uses CSS container queries to adapt layout based on widget width.
 *
 * Breakpoints:
 * - < 20rem (320px): Compact stacked list
 * - 20rem - 32rem: Narrow table (primary + 1 column)
 * - 32rem - 44rem: Medium table (primary + 2 columns)
 * - > 44rem: Full table (all columns)
 */
export function WidgetTable<T>({
  data,
  columns,
  keyExtractor = (_, index) => String(index),
  hoverable = true,
}: WidgetTableProps<T>) {
  // Separate columns by visibility
  const primaryColumn = columns[0];
  const mediumColumns = columns.filter((c, i) => i > 0 && c.visibility !== "wide");
  const wideColumns = columns.filter((c) => c.visibility === "wide");

  const getCellValue = (item: T, column: TableColumn<T>): ReactNode => {
    if (column.render) {
      return column.render(item);
    }
    const value = item[column.key as keyof T];
    return value as ReactNode;
  };

  return (
    <div className="@container h-full w-full overflow-hidden">
      {/* Compact stacked list for very small containers */}
      <div className="block @[20rem]:hidden h-full overflow-y-auto">
        <ul className="divide-y divide-stone-200 dark:divide-stone-700">
          {data.map((item, index) => (
            <li
              key={keyExtractor(item, index)}
              className={`px-3 py-3 ${hoverable ? "hover:bg-stone-50 dark:hover:bg-stone-800/50" : ""}`}
            >
              <div className="font-medium text-sm text-stone-900 dark:text-stone-100">
                {getCellValue(item, primaryColumn)}
              </div>
              {mediumColumns[0] && (
                <div className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                  {getCellValue(item, mediumColumns[0])}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Table for larger containers */}
      <div className="hidden @[20rem]:block h-full overflow-auto">
        <table className="min-w-full divide-y divide-stone-200 dark:divide-stone-700">
          <thead className="bg-stone-50 dark:bg-stone-800/50">
            <tr>
              {/* Primary column - always visible */}
              <th
                scope="col"
                className="py-2.5 pl-4 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400"
              >
                {primaryColumn.header}
              </th>

              {/* Medium columns - visible at @[20rem] */}
              {mediumColumns.map((column, idx) => (
                <th
                  key={String(column.key)}
                  scope="col"
                  className={`hidden px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 ${
                    idx === 0 ? "@[20rem]:table-cell" : "@[32rem]:table-cell"
                  }`}
                >
                  {column.header}
                </th>
              ))}

              {/* Wide columns - visible at @[44rem] */}
              {wideColumns.map((column) => (
                <th
                  key={String(column.key)}
                  scope="col"
                  className="hidden @[44rem]:table-cell px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
            {data.map((item, index) => (
              <tr
                key={keyExtractor(item, index)}
                className={hoverable ? "hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors" : ""}
              >
                {/* Primary column */}
                <td className="py-3 pl-4 pr-3 text-sm whitespace-nowrap">
                  {getCellValue(item, primaryColumn)}
                </td>

                {/* Medium columns */}
                {mediumColumns.map((column, idx) => (
                  <td
                    key={String(column.key)}
                    className={`hidden px-3 py-3 text-sm whitespace-nowrap text-stone-600 dark:text-stone-400 ${
                      idx === 0 ? "@[20rem]:table-cell" : "@[32rem]:table-cell"
                    }`}
                  >
                    {getCellValue(item, column)}
                  </td>
                ))}

                {/* Wide columns */}
                {wideColumns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="hidden @[44rem]:table-cell px-3 py-3 text-sm whitespace-nowrap text-stone-600 dark:text-stone-400"
                  >
                    {getCellValue(item, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
