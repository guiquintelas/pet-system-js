class Home extends PetElement {
    getTemplate() {
        return /*template*/`
            <div>Home</div>
        `
    }
}
  
window.customElements.define('pet-home', Home);