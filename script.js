document.getElementById("gerar-pdf").addEventListener("click", async function () {
    // Obter os valores dos campos
    const nome = document.getElementById("nome").value;
    const dataNascimento = document.getElementById("data-nascimento").value;
    const cpf = document.getElementById("cpf").value;
    const numeroCarteirinha = document.getElementById("numero-carteirinha").value;
    const dataAtendimento = document.getElementById("data-atendimento").value;
    const dataValidade = document.getElementById("data-validade").value;
    const planoSaude = document.getElementById("plano-saude").value;

    // Verificar se todos os campos estão preenchidos
    if (!nome || !dataNascimento || !cpf || !numeroCarteirinha || !dataAtendimento || !dataValidade || !planoSaude) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    if (planoSaude !== "SulAmerica") {
        alert("Atualmente, apenas o plano SulAmérica é suportado.");
        return;
    }

    // Carregar o PDF existente
    const pdfUrl = "./guia-sulamerica.pdf";
    const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());

    // Carregar o PDF com PDF-Lib
    const { PDFDocument } = PDFLib;
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Preencher campos do PDF (ajuste os nomes dos campos conforme necessário)
    const form = pdfDoc.getForm();
    form.getTextField("7 - Nome").setText(nome);
    form.getTextField("data_nascimento").setText(dataNascimento);  // Substitua pelo nome exato
    form.getTextField("cpf").setText(cpf);  // Substitua pelo nome exato
    form.getTextField("numero_carteirinha").setText(numeroCarteirinha);  // Substitua pelo nome exato
    form.getTextField("data_atendimento").setText(dataAtendimento);  // Substitua pelo nome exato
    form.getTextField("data_validade").setText(dataValidade);  // Substitua pelo nome exato

    // Salvar o PDF preenchido
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "guia-sulamerica-preenchida.pdf";
    link.click();
});
