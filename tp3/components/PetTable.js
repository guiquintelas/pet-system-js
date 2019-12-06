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
        return ['items', 'item-slot'];
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

    getTableBody() {
        const items = store[this.props.items];
        
        return items.map(item => /* template */`
            <tr>
                ${this.getItemRow(item)}
                <td>editar / deletar</td>
            </tr>
        `).join("");
    }
}
  
window.customElements.define('pet-table', PetTable);