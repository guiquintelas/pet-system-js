class Usuario extends PetModelPage {
    getParams() {
        return {
            modelName: "usuarios",
            tableRowFunction: "userTable",
            formFunction: "userForm",
        }
    }

    getUpdatePageName() {
        return `Editando o usuário ${getTargetEntity().name}`;
    }

    getCratePageName() {
        return "Criando um novo Usuário";
    }
}

function userTable(item) {
    return /* template */`
        <td data-name="ID">${item.id}</td>
        <td data-name="Nome">${item.name}</td>
        <td data-name="Email">${item.email}</td>
        <td data-name="Senha">${item.password}</td>
    `
}

function userForm(item) {
    return /* template */ `
        <pet-input name="name" label="Nome" required></pet-input>
        <pet-input name="email" label="Email" required type="email"></pet-input>
        <pet-input name="password" label="Senha" required></pet-input>
    `
}

window.customElements.define('pet-usuarios', Usuario);