import jsPDF from "jspdf";

function toggleSection(sectionId: string) {
  const content = document.getElementById(sectionId);
  if (!content) return;
  content.style.display =
    content.style.display === "none" || content.style.display === ""
      ? "block"
      : "none";
}

function converHTMLFileToPDF() {
  var doc = new jsPDF("l", "mm", [1200, 1210]);

  var pdfjs = document.querySelector("body");

  if (!pdfjs) return;

  // Convert HTML to PDF in JavaScript
  doc.html(pdfjs, {
    callback: function (doc) {
      doc.save("output.pdf");
    },
    x: 10,
    y: 10,
  });
}

converHTMLFileToPDF();
