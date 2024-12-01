document.getElementById("gerar-pdf").addEventListener("click", async function () {
    const nome = document.getElementById("nome").value;

    if (!nome) {
        alert("Por favor, preencha o campo Nome!");
        return;
    }

    try {
        // Carregar o PDF existente
        const pdfUrl = "./guia-sulamerica.pdf";  // Caminho para o arquivo PDF
        const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());

        // Carregar o PDF com PDF-Lib
        const { PDFDocument } = PDFLib;
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Preencher o campo "Nome" do PDF
        const form = pdfDoc.getForm();
        form.getTextField("7 - Nome").setText(nome);  // Nome do campo no PDF

        // Salvar o PDF preenchido
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "guia-sulamerica-preenchida.pdf";
        link.click();

    } catch (error) {
        console.error("Erro ao gerar o PDF:", error);  // Exibe o erro no console
        alert("Ocorreu um erro ao gerar a guia. Tente novamente.");
    }
});
