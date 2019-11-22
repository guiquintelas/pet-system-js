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
                    <h3>${store.getCurrentPage().renderName}</h3>
                </div>

                <br>

                ${this.adicionarBtn()}
                ${this.getBody()}
            </div>
        `
    }

    adicionarBtn() {
        if (store.currentPage != 'home') {
            return /* template */`
                <a class="btn btn-primary btn-lg mb-3 text-white" href="url_inserir">
                    Adicionar
                </a>
            `
        }

        return "";
    }
}