class Router extends PetElement {
    getTemplate() {
        const currentPage = store.pages.filter(p => p.name == store.currentPage)[0].name;
        return `<pet-${currentPage}></pet-${currentPage}>`
    }
}
  
window.customElements.define('pet-router', Router);