class Header extends PetElement {
    getTemplate() {
        return /*template*/`
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="">PetSystem</a>
        
                <div class="navbar-collapse show" id="navbarNav">
                    <ul class="navbar-nav" id="page-list">
        
                    </ul>
        
                    <div style="margin: auto 10px auto auto;">
                        <a href="/logout">Sair</a>
                    </div>
                </div>
            </nav>
        `
    }

    init() {
        this.$pageList = this.querySelector("#page-list");
    }

    render() {
        this.$pageList.innerHTML = store.pages.map( page => {
            return  /*template*/`
                <li class="nav-item ">
                    <a class="nav-link pet-page" href="${page.name}">
                        ${page.renderName}
                    </a>
                </li>`
        }).join("");
    }

    addListener() {
        this.addListenerByClass("pet-page", evt => {
            // impede que a pagina navegue
            evt.preventDefault();

            const hrefArray = evt.target.href.split("/");
            const href = hrefArray[hrefArray.length - 1];

            console.log(href);
        });
    }
}
  
window.customElements.define('pet-header', Header);