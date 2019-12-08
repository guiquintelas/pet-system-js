class PetTable extends PetElement {
    getTemplate() {
        return /*template*/`
        <table class="table">
            <thead>
                <tr>
                    ${this.getHeaders()}
                </tr>
            </thead>
            <tbody>
                ${this.getTableBody()}
            </tbody>
        </table>
        `
    }

    static get observedAttributes() {
        return ['model-name', 'item-slot'];
    }

    getHeaders() {
        const headerNames = [];

        const holder = document.createElement('tr');
        holder.innerHTML = this.getItemRow({});
      
        for (const td of holder.children) {
            headerNames.push(td.dataset.name);
        }

        headerNames.push("Ações");
        
        return headerNames.map(name => /* template */`
            <th scope="scol">${name}</th>
        `).join("");
    }

    getItems() {
        return store[this.props.items];
    }

    getItemRow(item) {
        return window[this.props["item-slot"]](item);
    }

    getTableActions(item) {
        return /* template */ `
            <td>
                <pet-link 
                    classes="btn btn-outline-secondary"
                    name="${this.props['model-name']}/${item.id}/update"
                    render="editar"
                ></pet-link>

                <pet-link 
                    classes="btn btn-outline-danger"
                    name="${this.props['model-name']}/${item.id}/delete"
                    action="deleteEntity"
                    action-param="${item.id}"
                    render="deletar"
                ></pet-link>
            </td>
        `;
    }

    getTableBody() {
        const items = store[this.props["model-name"]];
        
        return items.map(item => /* template */`
            <tr>
                ${this.getItemRow(item)}
                ${this.getTableActions(item)}
            </tr>
        `).join("");
    }
}
  
window.customElements.define('pet-table', PetTable);