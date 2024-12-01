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

        // Verificar se o campo "nomepablo" existe no PDF
        const form = pdfDoc.getForm();
        const nomeField = form.getTextField("nomepablo");

        if (nomeField) {
            // Preencher o campo "nomepablo" do PDF com o nome digitado
            nomeField.setText(nome);

            // Salvar o PDF preenchido
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "guia-sulamerica-preenchida.pdf";
            link.click();
        } else {
            alert("Campo 'nomepablo' não encontrado no PDF.");
        }

    } catch (error) {
        console.error("Erro ao gerar o PDF:", error);  
