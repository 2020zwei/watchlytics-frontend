import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ExportPDFProps {
    data: any,
    label: string
}

export const exportToPDF = ({ data, label = "" }: ExportPDFProps) => {
    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "A4" });
    const keys = Object.keys(data[0] || {});
    const headers = keys.map((key) => ({
        header: key.replace(/_/g, " ").toUpperCase(),
        dataKey: key,
    }));

    const rows = data.map((row: any) => {
        const newRow: any = {};
        keys.forEach((key) => {
            newRow[key] = row[key] ?? "";
        });
        return newRow;
    });

    autoTable(doc, {
        columns: headers,
        body: rows,
        styles: {
            fontSize: 8,
            cellPadding: 4,
        },
        margin: { top: 20 },
        headStyles: {
            fillColor: [41, 128, 185],
            fontSize: 10,
        },
    });


    doc.save(`${label}.pdf`);
}

