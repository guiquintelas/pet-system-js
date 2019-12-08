class PetInput extends PetElement {
    getTemplate() {
        const value = getRouteAction() == 'update' ? getTargetEntity()[this.props.name] : '';

        return /*template*/`
            <div class="form-group">
                <label>${this.props.label}</label>

                <input 
                    name="${this.props.name}" 
                    value="${value}" 
                    class="form-control"
                    type="${this.props.type}"
                    ${typeof this.props.required !== undefined ? 'required' : ''}
                    />
            </div>
        `
    }

    static get observedAttributes() {
        return ['label', 'name', 'required', 'type'];
    }
}

window.customElements.define('pet-input', PetInput);