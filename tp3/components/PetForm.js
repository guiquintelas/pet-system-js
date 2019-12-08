class PetForm extends PetElement {
    getTemplate() {
        return /*template*/`
            <form class="form-inline">

                ${this.getFormData()}

                <button class="btn btn-primary">
                    ${this.props.inserindo == "true" ? 'Inserir' : 'Editar'}
                </button>
            </form>
        `
    }

    static get observedAttributes() {
        return ['inserindo', 'form-slot'];
    }

    getFormData() {
        return window[this.props["form-slot"]]();
    }

    init() {
        const form = this.querySelector("form");

        form.addEventListener("submit", evt => {
            evt.preventDefault();

            const data = {};
            
            for (const input of form.querySelectorAll("input,select")) {
                let value = input.value;

                switch (input.type) {
                    case "checkbox":
                        value = input.checked;
                        break;

                    case "number":
                        value = value ? parseFloat(value) : null;
                        break;
                }

                data[input.name] = value;
            }
            
            if (getRouteAction() == 'create') {
                createEntity(data);
                
            } else {
                mutateTargetEntity(data);
            }
            
        })
    }
}
  
window.customElements.define('pet-form', PetForm);