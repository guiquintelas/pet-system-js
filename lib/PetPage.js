class PetPage extends PetElement {

    getTemplate() {
        return /*template*/`
            <div class="container-fluid p-5" style="padding-top: 12px !important;">

                <div class="row" style="display: flex; align-items: baseline;">
                    <b style="margin-right: 10px; font-size: 13px">Ultimas paginas acessadas:</b>
                    <div style="font-size: 12px">
                        Usuários > Pets
                    </div>

                    <div style="margin-left: auto">Ola, Usuário!</div>
                </div>

                <div class="row" style="margin-top: 25px">
                    <h3>${this.getPageName()}</h3>

                    ${this.getBackButton()}
                </div>

                <br>

                ${this.getBody()}
            </div>
        `
    }  

    getPageName() {
        return getCurrentPage().renderName;
    }

    getBackButton() {
        if (store.currentPath.length < 2) {
            return '';
        }

        return /* template */ `
            <div style="display: contents">
                <pet-link 
                    classes="btn btn-light"
                    style="margin-left: auto"
                    name="${store.currentPage}" 
                    render="Voltar"
                ></pet-link>
            </div>
        `
    }
}