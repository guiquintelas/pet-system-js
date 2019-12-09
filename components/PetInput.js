class PetInput extends PetElement {
    getTemplate() {
        const value = getRouteAction() == 'update' ? getTargetEntity()[this.props.name] : '';

        return /*template*/`
            <div class="form-group">
                <label>${this.props.label}</label>

                ${this.props.type == 'select' ? 
                    this.getSelect(value) : 
                    this.getInput(value)}
            </div>
        `
    }

    static get observedAttributes() {
        return ['label', 'name', 'required', 'type', 'relation'];
    }

    getInput(value) {
        return /* template */`
            <input   
                name="${this.props.name}" 
                value="${value}" 
                class="form-control"
                type="${this.props.type}"
                ${typeof this.props.required !== "undefined" ? 'required' : ''}
                ${this.props.type == 'checkbox' && value === true ? 'checked' : ''}
            />
        `
    }

    getSelect(value) {
        return /* template */`
            <select   
                name="${this.props.name}" 
                value="${value}" 
                class="form-control"
                ${typeof this.props.required !== "undefined" ? 'required' : ''}
                >
                <option>Selecionar...</option>    
                ${this.getOptions(value)}
            </select>
        `
    }

    getOptions(value) {
        return store[this.props.relation].map(el => /* template */`
            <option
                ${value == el.id ? 'selected' : ''}
                value="${el.id}"
                >
                ${el.name}
            </option>
        `).join("");
    }
}

window.customElements.define('pet-input', PetInput);