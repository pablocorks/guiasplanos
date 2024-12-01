document.getElementById("hoje").addEventListener("click", function () {
    const hoje = new Date();
    const dataFormatada = hoje.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    document.getElementById("data-atendimento").value = dataFormatada;
});

document.getElementById("gerar-pdf").addEventListener("click", async function () {
    const nome = document.getElementById("nome").value;
    const plano = document.getElementById("plano").value;
    const numeroGuia = document.getElementById("numero-guia").value;
    const cpf = document.getElementById("cpf").value;
    const dataNascimento = document.getElementById("data-nascimento").value;
    const dataAtendimento = document.getElementById("data-atendimento").value;
    const numeroCarteirinha = document.getElementById("numero-carteirinha").value;
    const dataVencimento = document.getElementById("data-vencimento").value;
    const numeroCns = document.getElementById("numero-cns").value;
    const observacoes = document.getElementById("observacoes").value;

    // Validar CPF (apenas uma validação simples para verificar se tem 11 dígitos)
    const cpfValido = cpf.length === 14; // CPF deve ter 14 caracteres (incluindo os pontos e o traço)

    if (!cpfValido) {
        alert("CPF inválido. Certifique-se de que o CPF está no formato correto.");
        return;
    }

    try {
        // Carregar o PDF existente
        const pdfUrl = "./guia-sulamerica.pdf";  // Caminho para o arquivo PDF
        const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());

        // Carregar o PDF com PDF-Lib
        const { PDFDocument } = PDFLib;
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Preencher os campos do PDF
        const form = pdfDoc.getForm();

        // Nome
        const nomeField = form.getTextField("nomepablo");
        if (nome) nomeField.setText(nome);

        // Nome do plano
        const planoField = form.getTextField("nomeplano");
        if (plano) planoField.setText(plano);

        // Número da Guia
        const numeroGuiaField = form.getTextField("numeroguia");
        if (numeroGuia) numeroGuiaField.setText(numeroGuia);

        // CPF
        const cpfField = form.getTextField("cpfpaciente");
        if (cpf) cpfField.setText(cpf);

        // Data de Nascimento
        const dataNascimentoField = form.getTextField("datanascimento");
        if (dataNascimento) dataNascimentoField.setText(dataNascimento);

        // Data de Atendimento
        const dataAtendimentoField = form.getTextField("dataatendimento");
        if (dataAtendimento) dataAtendimentoField.setText(dataAtendimento);

        // Número da Carteirinha
        const numeroCarteirinhaField = form.getTextField("numerocarteirinha");
        if (numeroCarteirinha) numeroCarteirinhaField.setText(numeroCarteirinha);

        // Data de Vencimento
        const dataVencimentoField = form.getTextField("datavencimento");
        if (dataVencimento) dataVencimentoField.setText(dataVencimento);

        // Número do CNS
        const numeroCnsField = form.getTextField("cnspaciente");
        if (numeroCns) numeroCnsField.setText(numeroCns);

        // Observações
        const observacoesField = form.getTextField("observacoes");
        if (observacoes) observacoesField.setText(observacoes);

        // Salvar o PDF preenchido
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "guia-sulamerica-preenchida.pdf";
        link.click();

    } catch (error) {
        console.error("Erro ao gerar o PDF:", error);
        alert("Ocorreu um erro ao gerar a guia. Tente novamente.");
    }
});
