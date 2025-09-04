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
import autoTable from "jspdf-autotable";

interface DataTableExportProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  filename?: string;
}

export function DataTableExport<TData, TValue>({
  data,
  columns,
  filename = "export",
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
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
      return title;
    });

    // Create CSV rows
    const csvRows = [
      headers.join(","),
      ...data.map((row: TData) =>
        visibleColumns
          .map((col) => {
            const accessorKey = (col as { accessorKey: string }).accessorKey;
            const value = (row as Record<string, unknown>)[accessorKey];
            // Handle special formatting for currency
            if (typeof value === "number" && accessorKey === "amount") {
              return value.toFixed(2);
            }
            // Escape commas and quotes in string values
            if (typeof value === "string") {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          })
          .join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    downloadFile(csvContent, `${filename}.csv`, "text/csv");
  };

  const exportToExcel = () => {
    // For Excel export, we'll use a simple CSV format that Excel can open
    // In a real implementation, you might want to use a library like xlsx
    exportToCSV();
  };

  const exportToPDF = () => {
    // Get visible columns (excluding actions column)
    const visibleColumns = columns.filter(
      (col) => col.id !== "actions" && "accessorKey" in col
    );

    // Create PDF headers
    const headers = visibleColumns.map((col) => {
      const accessorKey = (col as { accessorKey: string }).accessorKey;
      // Convert accessorKey to readable title
      const title = accessorKey
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
      return title;
    });

    // Create PDF data rows
    const pdfData = data.map((row: TData) => {
      return visibleColumns.map((col) => {
        const accessorKey = (col as { accessorKey: string }).accessorKey;
        const value = (row as Record<string, unknown>)[accessorKey];
        
        // Handle special formatting for currency
        if (typeof value === "number" && accessorKey === "amount") {
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(value);
        }
        
        return value?.toString() || "";
      });
    });

    // Create PDF document
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text(filename.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), 14, 22);
    
    // Add table
    autoTable(doc, {
      head: [headers],
      body: pdfData,
      startY: 30,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [66, 139, 202],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { top: 30 },
    });

    // Save the PDF
    doc.save(`${filename}.pdf`);
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
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
        <DropdownMenuItem onClick={exportToCSV}>
          <FileText className="mr-2 h-4 w-4" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToExcel}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToPDF}>
          <FileDown className="mr-2 h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 