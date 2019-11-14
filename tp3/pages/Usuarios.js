class Usuario extends PetElement {
    getTemplate() {
        return /*template*/`
            <div>Usuários</div>
        `
    }
}
  
window.customElements.define('pet-usuarios', Usuario);