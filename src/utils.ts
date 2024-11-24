import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Print the content of a specified div as a PDF.
 *
 * @param divId - The ID of the div to print as a PDF.
 */
const printDivAsPDF = (divId: string): void => {
  // Find the div element by ID
  const input = document.getElementById(divId);

  if (!input) {
    console.error("Div not found!");
    return;
  }

  // Use html2canvas to capture the div content
  html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Create a jsPDF instance
      const pdf = new jsPDF({
        orientation: "portrait", // 'portrait' or 'landscape'
        unit: "px", // Measurement unit
        format: [canvas.width, canvas.height], // Auto-adjust PDF size to content
      });

      // Add the captured image to the PDF
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

      // Save the PDF with a default filename
      pdf.save("download.pdf");
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
    });
};

export const generatePDF = async () => {
  const element = document.getElementById("pdf-table");
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const imgWidth = 190; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;

  let position = 10; // Initial top margin
  pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight; // Adjust position
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save("table.pdf");
};
import * as XLSX from "xlsx";

/**
 * Export nested data to an Excel file with headers.
 *
 * @param data - The array of nested data records to export.
 * @param fileName - The name of the Excel file to save.
 */
export const exportNestedDataToExcel = (
  data: any[],
  fileName: string = "nested_data.xlsx"
): void => {
  // Flatten the nested data
  const flattenedData = data.map((item) => ({
    id: item.id,
    montant: item.montant,
    date_comission: item.date_comission,
    statut_comission: item.statut_comission,
    professeur_id: item.professeur?.id,
    professeur_nom: item.professeur?.nom,
    professeur_prenom: item.professeur?.prenom,
    professeur_telephone: item.professeur?.telephone,
    professeur_adresse: item.professeur?.adresse,
    professeur_specialite: item.professeur?.specialite,
    etudiant_id: item.etudiant?.id,
    etudiant_nom: item.etudiant?.nom,
    etudiant_prenom: item.etudiant?.prenom,
    etudiant_telephone: item.etudiant?.telephone,
    etudiant_adresse: item.etudiant?.adresse,
    groupe_id: item.groupe?.id,
    groupe_nom_groupe: item.groupe?.nom_groupe,
    groupe_niveau: item.groupe?.niveau,
    groupe_filiere: item.groupe?.filiere,
  }));

  // Create worksheet from flattened data
  const worksheet = XLSX.utils.json_to_sheet(flattenedData);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Save the Excel file
  XLSX.writeFile(workbook, fileName);
};

export default printDivAsPDF;
