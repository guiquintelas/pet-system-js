class PetModelPage extends PetPage {

    getPageName() {
        if (getRouteAction() == "update") {
            return this.getUpdatePageName();
        }

        if (getRouteAction() == "create") {
            return this.getCratePageName();
        }

        return getCurrentPage().renderName;
    }

    getBody() {
        const action = getRouteAction();

        if (action == "update" || action == "create") {
            return /* template */`
                <pet-form
                    inserindo="${action == 'create'}"
                    form-slot="${this.getParams().formFunction}"
                ></pet-form>
            `;
        }

        if (action == "delete") {
            console.log("deletando");
            return this.getBody();
        }

        return `
            ${this.getAddButton()}
            ${this.getTable()}
        `
    }

    getAddButton() {
        return /* template */`
            <pet-link 
                classes="btn btn-primary btn-lg mb-3 text-white"
                name="${store.currentPage}/create" 
                render="Adicionar"
            ></pet-link>
        `
    }

    getForm(isInserindo) {
        return /* template */ `
            <form class="form-inline">

                ${this.getFormData()}

                <button class="btn btn-primary">
                    ${isInserindo ? 'Inserir' : 'Editar'}
                </button>
            </form>
        `;
    }

    getTable() {
        return /*template*/`
            <pet-table 
                model-name="${this.getParams().modelName}"
                item-slot="${this.getParams().tableRowFunction}"
            ></pet-table>
        `
    }

    getUpdatePageName() {
        return "nome da pagina quando editando"
    }

    getCratePageName() {
        return "nome da pagina quando criando"
    }

    setFormListener() {
        const form = this.querySelector("form");

        if (!form) {
            return;
        }

        form.addEventListener("submit", evt => {
            evt.preventDefault();
            console.log(evt);
            
        })
    }
}