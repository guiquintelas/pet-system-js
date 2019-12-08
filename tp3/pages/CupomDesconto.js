class CupomDesconto extends PetModelPage {
    getParams() {
        return {
            modelName: "cupoms",
            tableRowFunction: "cupomTable",
            formFunction: "cupomForm",
        }
    }

    getUpdatePageName() {
        return `Editando o cupom ${getTargetEntity().code}`;
    }

    getCratePageName() {
        return "Criando um novo Cupom";
    }
}

function cupomTable(item) {
    return /* template */`
        <td data-name="ID">${item.id}</td>
        <td data-name="Código">${item.code}</td>
        <td data-name="Desconto">
            R$ ${currencyFilter(item.value)}
        </td>
    `
}

function cupomForm() {
    return /* template */ `
        <pet-input name="code" label="Código" required></pet-input>
        <pet-input name="value" label="Desconto" required type="number"></pet-input>
    `
}

window.customElements.define('pet-cupoms', CupomDesconto);