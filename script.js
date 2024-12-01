document.getElementById("gerar-pdf").addEventListener("click", function () {
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

    // Criar o PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Adicionar texto ao PDF
    doc.setFont("Arial");
    doc.setFontSize(12);
    doc.text("Guia de Plano de Saúde", 10, 10);
    doc.text(`Nome: ${nome}`, 10, 20);
    doc.text(`Data de Nascimento: ${dataNascimento}`, 10, 30);
    doc.text(`CPF: ${cpf}`, 10, 40);
    doc.text(`Número da Carteirinha: ${numeroCarteirinha}`, 10, 50);
    doc.text(`Data do Atendimento: ${dataAtendimento}`, 10, 60);
    doc.text(`Data de Validade da Carteira: ${dataValidade}`, 10, 70);
    doc.text(`Plano de Saúde: ${planoSaude}`, 10, 80);

    // Salvar o PDF
    doc.save("guia.pdf");
});
