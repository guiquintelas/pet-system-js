class PetLink extends PetElement {
    getTemplate() {
        return /*template*/`
            <a 
                class="${this.classList.toString()} ${this.attributes.classes ? this.attributes.classes.nodeValue : ''}" 
                href="${this.props.name}">
                ${this.props.render}
            </a>
        `
    }

    static get observedAttributes() {
        return ['render', 'name', 'action', 'action-param'];
    }

    init() {
        this.addEventListener('click', evt => {
             // impede que a pagina navegue
            evt.preventDefault();

            if (this.props.action) {
                window[this.props.action](this.props['action-param']);
                return;
            }

            router.push(this.props.name);
        })
    }
}
  
window.customElements.define('pet-link', PetLink);