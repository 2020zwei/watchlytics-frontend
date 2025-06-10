import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (data: any[], title = 'Report') => {
    const doc = new jsPDF();

    doc.text(title, 14, 10);

    if (!data.length) return;

    const columns = Object.keys(data[0]);
    const rows = data.map(row => columns.map(col => row[col]));

    autoTable(doc, {
        head: [columns],
        body: rows,
        startY: 20,
    });

    doc.save(`${title}.pdf`);
};
