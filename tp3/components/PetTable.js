class PetTable extends PetElement {
    getTemplate() {
        return /*template*/`
        <table class="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">Email</th>
                <th scope="col">Senha</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            ${this.tbody()}
        </tbody>
    </table>
        `
    }

    static get observedAttributes() {
        return ['items'];
    }

    getItems() {
        return store[this.props.items];
    }

    itemRow(item) {
        return JSON.stringify(item);
    }

    tbody() {
        const items = store[this.props.items];

        return items.map(item => /* template */`
            <tr>
                <th scope="row">${item.id}</th>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.password}</td>
                <td>editar / deletar</td>
            </tr>
        `).join("");
    }
}
  
window.customElements.define('pet-table', PetTable);