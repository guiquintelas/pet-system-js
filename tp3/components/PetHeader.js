class Header extends PetElement {
    getTemplate() {
        return /*template*/`
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="">PetSystem</a>
        
                <div class="navbar-collapse show" id="navbarNav">
                    <ul class="navbar-nav" id="page-list"></ul>
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
                    <pet-link 
                        class="nav-link"
                        name="${page.name}" 
                        render="${page.renderName}"
                    ></pet-link>
                </li>`
        }).join("");
    }
}
  
window.customElements.define('pet-header', Header);