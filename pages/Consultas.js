class Consulta extends PetModelPage {
    getParams() {
        return {
            modelName: "consultas",
            tableRowFunction: "consultaTable",
            formFunction: "consultaForm",
            relations: ["vacinas"]
        }
    }

    getUpdatePageName() {
        return `Editando a consulta ${getTargetEntity().name}`;
    }

    getCratePageName() {
        return "Criando uma consulta";
    }
}

function consultaTable(item) {
    let vacinas = "Nenhuma...";

    if (item.vacinas && item.vacinas.length > 0) {
        vacinas = item.vacinas.map(vacinaId => /* template */`
            <pet-link
                name="vacinas/${vacinaId}/update"
                render="${store.vacinas.filter(el => el.id == vacinaId)[0].name}"
            ></pet-link>
        `).join(", ");
    }

    return /* template */`
        <td data-name="ID">${item.id}</td>
        <td data-name="Nome">${item.name}</td>

        <td data-name="Preço">
            R$ ${currencyFilter(item.price)}
        </td>

        <td data-name="Vacinas">
            ${vacinas}
        </td>
    `
}

function consultaForm() {
    return /* template */ `
        <pet-input name="name" label="Nome" required></pet-input>
        <pet-input name="price" label="Preço" required type="number"></pet-input>
    `
}

window.customElements.define('pet-consultas', Consulta);