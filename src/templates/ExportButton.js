import React from 'react';
import * as XLSX from 'xlsx';

const ExportButton = ({ jsonData, clientName }) => {
    function toUnderscore(string) {
        return string.toLowerCase().replace(/\s+/g, '_');
    }

    let fileName = toUnderscore(clientName) + '_streams_export'

    const handleDownload = () => {
        let data;

        // Check if jsonData is a string and needs parsing
        if (typeof jsonData === 'string') {
            try {
                data = JSON.parse(jsonData);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                return;
            }
        } else {
            // If jsonData is already an object, use it directly
            data = jsonData;
        }

        // Convert data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, clientName);


        // Create a temporary anchor tag to trigger download
        const tempDownloadUrl = document.createElement("a");
        document.body.appendChild(tempDownloadUrl);

        // Create a blob and trigger download
        const blob = new Blob([XLSX.write(workbook, { bookType: "xlsx", type: "array" })], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = URL.createObjectURL(blob);
        tempDownloadUrl.href = url;
        tempDownloadUrl.download = fileName+".xlsx";
        tempDownloadUrl.click();

        // Clean up
        document.body.removeChild(tempDownloadUrl);
        URL.revokeObjectURL(url);
    };

    return (
        <button onClick={handleDownload}>Export (.xlsx)</button>
    );
};

export default ExportButton;
