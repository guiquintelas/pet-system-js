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
    molhos,
]

// cria o prompt com o texto desejado 
// ja formatando o param "escolha"
// e retorna o input do user
function prompText(escolha) {
    return escolha.filter((_, idx) => idx > 0)
        .map((texto, idx) => idx > 0 ? `${idx} - ${texto}` : texto)
        .join("\n");
}

// formata o pedido ate o momento
// de maneira que o prompt consiga exibir
// de forma amigavel
function getPedidoAtual() {
    if (!escolhas.length) {
        return "";
    }

    let resultado = "Pedido: \n";

    for (const [idx, escolha] of escolhas.entries()) {
        const nomeDaEscolha = ordemPedido[idx][0];

        resultado += `${nomeDaEscolha}: ${escolha}\n`;
    }

    return resultado += "\n";
}

// checa se a escolha do user foi o "Nenhum"
function temOptNenhum(resposta) {
    return resposta.includes(1);
}

// checa se a escolha atual suporta
// multiplas escolhas
function isEscolhaMultipla(escolha) {
    return escolha[1].includes('virgula');
}

// valida se a(s) resposta(s) são validas
function validaResposta(resposta, escolha) {
    if (!reposta) {
        return false;
    }

    if (resposta.length) {
        if (!isEscolhaMultipla(escolha)) {
            alert("Valor inválido");
            return false;
        }

        // checa se existe algum dos valores passados invalido
        return !!resposta.filter(el => el < escolha.length && el >= 1).length;
    }

    // checa se a resposta dada é alguma das opcoes validas
    return resposta < escolha.length && resposta >= 1;
}

// limpa e formata a resposta do usuario
function getResposta(escolha, pedido) {
    const text = pedido + prompText(escolha);
    let resposta = prompt(text);

    if (!resposta) {
        return false;
    }

    reposta = resposta.replace(" ", "");


    if (resposta.includes(",")) {
        return resposta.split(",").map(el => parseInt(el))
    }

    return parseInt(resposta);
}


function run() {
    for (const [idx, escolha] of ordemPedido.entries()) {
        const pedido = getPedidoAtual();

        let resposta = getResposta(escolha, pedido);

        // caso o usuario aperte o "cancelar" queremos
        // parar o loop
        if (!resposta) {
            break;
        }

        // enquanto a resposta não for válida
        // sera pedido uma nova resposta
        while (!validaResposta(resposta, escolha)) {
            alert("Valor inválido");
            resposta = getResposta(escolha, pedido);
        }

        // novamente se o usuario apertar 
        // "cancelar" queremos parar o loop
        if (!resposta) {
            break;
        }

        // caso a escolha atual suporte reposta multipla
        // é necessario validar o usuario escolheu a opçãp "Nenhum"
        if (isEscolhaMultipla(escolha)) {
            if (resposta.length) {
                if (temOptNenhum(resposta)) {
                    escolhas[idx] = "Nehum";
                    continue;
                }

                // converte o vetor da reposta em uma string
                // com uma virgula de separador e define a escolha 
                // no vetor de escolhas
                // [1,2,2] => "Mostarda, Ketchup, Ketchup"
                escolhas[idx] = resposta
                    .map(el => escolha[el + 1])
                    .join(", ");

                continue;
            }
        }

        // salva a escolha no vetor de escolhas
        escolhas[idx] = escolha[resposta + 1];
    }

    alert("Finalizado!\n\n" + getPedidoAtual())
}


run();
