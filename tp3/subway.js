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

function prompText(escolha) {
    return escolha.filter((_, idx) => idx > 0)
    .map((texto, idx) =>  idx > 0 ? `${idx} - ${texto}` : texto)
    .join("\n");
} 


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


function temOptNenhum(resposta) {
    return resposta.includes(1);
}


function isEscolhaMultipla(escolha) {
    return escolha[1].includes('virgula');
}


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

    debugger
    // checa se a resposta dada é alguma das opcoes validas
    return resposta < escolha.length && resposta >= 1;
}


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
    
        if (!resposta) {
            break;
        }
    
        while (!validaResposta(resposta, escolha)) {
            alert("Valor inválido");
            resposta = getResposta(escolha, pedido);
        }
    
        if (!resposta) {
            break;
        }
    
        if (isEscolhaMultipla(escolha)) {
            
            if (resposta.length) {
                if (temOptNenhum(resposta)) {
                    escolhas[idx] = "Nehum";
                    continue;
                }
                escolhas[idx] = resposta
                    .map(el => escolha[el+1])
                    .join(", ");
                continue;
            }
        }
    
        escolhas[idx] = escolha[resposta+1];
    }
    
    alert("Finalizado!\n\n" + getPedidoAtual())
}


run();
