"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileDown, FileSpreadsheet, FileText } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import autoTable from "jspdf-autotable";
import { ExtendedColumnDef } from "@/types/downloadFiles.types";

interface DataTableExportProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  filename?: string;
  title?: string;
}

const getCellValue = <TData,>(
  col: ExtendedColumnDef<TData>,
  row: TData,
  forCSV: boolean = false
): string => {
  if (col.exportFormatter) {
    return col.exportFormatter(row);
  }

  if ("accessorKey" in col && col.accessorKey) {
    const accessorKey = col.accessorKey as keyof TData;
    const value = row[accessorKey];

    if (forCSV && typeof value === "string") {
      return `"${value.replace(/"/g, '""')}"`;
    }

    return value?.toString() ?? "-";
  }

  return "-";
};

export function DataTableExport<TData, TValue>({
  data,
  columns,
  filename = "data-table",
  title,
}: DataTableExportProps<TData, TValue>) {
  const exportToCSV = () => {
    // Get visible columns (excluding actions column)
    const visibleColumns = columns.filter(
      (col) => col.id !== "actions" && "accessorKey" in col
    );

    // Create CSV headers - use accessorKey as fallback for title
    const headers = visibleColumns.map((col) => {
      const accessorKey = (col as { accessorKey: string }).accessorKey;
      // Convert accessorKey to readable title (e.g., "dealerName" -> "Dealer Name")
      const title = accessorKey
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
      return title;
    });

    // Create CSV rows
    const csvRows = [
      headers.join(","),
      ...data.map((row: TData) =>
        visibleColumns
          .map((col) =>
            getCellValue(col as ExtendedColumnDef<TData>, row, true)
          )
          .join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    downloadFile(csvContent, `${filename}.csv`, "text/csv");
  };

  const exportToExcel = () => {
    const visibleColumns = columns.filter(
      (col) => col.id !== "actions" && "accessorKey" in col
    );

    const headers = visibleColumns.map((col) => {
      const accessorKey = (col as { accessorKey: string }).accessorKey;
      const title = accessorKey
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
      return title;
    });

    const excelData = data.map((row: TData) =>
      visibleColumns.map((col) => {
        const val = getCellValue(col as ExtendedColumnDef<TData>, row, false);
        if (/\d{2}\/\d{2}\/\d{4}/.test(val)) {
          return val;
        }
        return val;
      })
    );

    // Add headers as first row
    const worksheetData = [headers, ...excelData];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Auto-fit column widths
    const colWidths = headers.map(() => ({ wch: 20 }));
    worksheet["!cols"] = colWidths;

    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const exportToPDF = () => {
    const visibleColumns = columns.filter(
      (col) => col.id !== "actions" && "accessorKey" in col
    );

    const headers = visibleColumns.map((col) => {
      const accessorKey = (col as { accessorKey: string }).accessorKey;
      if (accessorKey === "time") return "Validity";
      const title = accessorKey
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
      return title;
    });

    const pdfData = data.map((row: TData) =>
      visibleColumns.map((col) =>
        getCellValue(col as ExtendedColumnDef<TData>, row)
      )
    );

    const doc = new jsPDF();

    const logo = "/logo.png";
    const logoY = 20;
    doc.addImage(logo, "PNG", 14, logoY, 25, 10);

    const pdfTitle =
      title ||
      filename.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    const titleY = logoY + 20;
    doc.text(pdfTitle, 14, titleY);

    autoTable(doc, {
      head: [headers],
      body: pdfData,
      startY: titleY + 6,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [0, 142, 124],
        textColor: 255,
        fontStyle: "bold",
      },
      columnStyles: {
        3: { cellWidth: 20 },
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { top: 30 },
    });

    doc.save(`${filename}.pdf`);
  };

  const downloadFile = (
    content: string,
    filename: string,
    mimeType: string
  ) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToPDF}>
          <FileDown className="mr-2 h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToExcel}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToCSV}>
          <FileText className="mr-2 h-4 w-4" />
          Export as CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
