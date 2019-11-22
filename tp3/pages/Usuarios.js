class Usuario extends PetPage {
    getBody() {
        return /*template*/`
            <pet-table items="usuarios">
            </pet-table>
        `
    }
}
  
window.customElements.define('pet-usuarios', Usuario);