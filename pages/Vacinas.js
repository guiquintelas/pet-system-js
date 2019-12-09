class Vacina extends PetModelPage {
    getParams() {
        return {
            modelName: "vacinas",
            tableRowFunction: "vacinaTable",
            formFunction: "vacinaForm",
        }
    }

    getUpdatePageName() {
        return `Editando a vacina ${getTargetEntity().name}`;
    }

    getCratePageName() {
        return "Criando uma vacina";
    }
}

function vacinaTable(item) {
    return /* template */`
        <td data-name="ID">${item.id}</td>
        <td data-name="Nome">${item.name}</td>

        <td data-name="Preço">
            R$ ${currencyFilter(item.price)}
        </td>

        <td data-name="Consulta">
            <pet-link
                name="consultas/${item.consulta}/update"
                render="${item.consulta ? store.consultas.filter(el => el.id == item.consulta)[0].name : ''}"
            ></pet-link>
        </td>
    `
}

function vacinaForm() {
    return /* template */ `
        <pet-input name="name" label="Nome" required></pet-input>
        <pet-input name="price" label="Preço" required type="number"></pet-input>
        <pet-input name="consulta" label="Consulta" type="select" relation="consultas"></pet-input>
    `
}

window.customElements.define('pet-vacinas', Vacina);