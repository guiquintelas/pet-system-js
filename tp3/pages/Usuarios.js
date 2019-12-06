class Usuario extends PetPage {
    getBody() {
        return /*template*/`
            <pet-table 
                items="usuarios"
                item-slot="userTable"
            ></pet-table>
        `
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
  
window.customElements.define('pet-usuarios', Usuario);