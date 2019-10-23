const sabor = [
    "Sabor",
    "Escolha o sabor",
    "Frango Teriyaki",
    "BBQ Chiken",
    "BBQ Subway Club",
    "Steak & Cheese",
    "Tuna",
    "Almondegas",
    "B.M.T",
    "Vegetariano",
];

const tamanho = [
    "Tamnho",
    "Escolha o tamanho",
    "15cm",
    "30cm"
];

const pao = [
    "Pão",
    "Escolha o seu pão",
    "Parmesão e Oregano",
    "Natural",
    "Italiano",
    "Tres Queijos",
    "Tres Australiano",
];

const queijo = [
    "Queijo",
    "Escolha o queijo",
    "Prato",
    "Cheedar",
    "Cabra",
];

const ingrediente = [
    "Ingredientes",
    "Escolha os ingredientes (separados por virgula)",
    "Nenhum",
    "Alface",
    "Tomate",
    "Pepino",
    "Pementão",
    "Aveitona",
    "Cebola",
    "Picles",
];

const molhos = [
    "Molhos",
    "Escolha os molhos (separados por virgula)",
    "Nenhum",
    "Mostarda",
    "Ketchup",
    "Pimenta",
    "Alho",
    "Azeite",
    "Vinagre",
];

const escolhas = [];

const ordemPedido = [
    sabor,
    tamanho,
    pao,
    queijo,
    ingrediente,
    molhos
] 

const prompText = (escolha) => escolha
    .filter((_, idx) => idx > 0)
    .map((texto, idx) =>  idx > 0 ? `${idx} - ${texto}` : texto)
    .join("\n");

const getPedidoNoMomento = () => {
    if (!escolhas.length) {
        return "";
    }

    let resultado = "Pedido: \n";

    for (const [idx, escolha] of escolhas.entries()) {
        const nomeDaEscolha = ordemPedido[idx][0];

        resultado += `${nomeDaEscolha}: ${escolha}\n`
    }

    return resultado += "\n";
}

for (const [idx, escolha] of ordemPedido.entries()) {
    const pedidoNoMomento = getPedidoNoMomento();

    const text = pedidoNoMomento + prompText(escolha);

    let resposta = parseInt(prompt(text));

    if (!resposta) {
        break;
    }

    if (escolha[1].includes('virgula')) {
        if (resposta+1 == 2) {
            escolhas[idx] =         
            escolhas[idx] = escolha[resposta+1];
            continue;
        }

        // todo implementar a escolha multipla
    }

    while (resposta >= escolha.length || resposta < 1) {
        alert("Valor inválido");
        resposta = prompt(prompText(escolha));
    }

    escolhas[idx] = escolha[resposta+1];
}

debugger