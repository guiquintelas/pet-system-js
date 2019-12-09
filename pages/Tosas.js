class Tosa extends PetModelPage {
    getParams() {
        return {
            modelName: "tosas",
            tableRowFunction: "tosaTable",
            formFunction: "tosaForm",
        }
    }

    getUpdatePageName() {
        return `Editando a tosa ${getTargetEntity().name}`;
    }

    getCratePageName() {
        return "Criando uma nova Tosa";
    }
}

function tosaTable(item) {
    return /* template */`
        <td data-name="ID">${item.id}</td>
        <td data-name="Nome">${item.name}</td>
        <td data-name="Preço">
            R$ ${currencyFilter(item.price)}
        </td>
        <td data-name="Banho">${item.isShower ? 'Sim' : 'Não'}</td>
    `
}

function tosaForm() {
    return /* template */ `
        <pet-input name="name" label="Nome" required></pet-input>
        <pet-input name="price" label="Preço" required type="number"></pet-input>
        <pet-input name="isShower" label="Banho" type="checkbox"></pet-input>
    `
}

window.customElements.define('pet-tosas', Tosa);