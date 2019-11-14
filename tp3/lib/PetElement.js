class PetElement extends HTMLElement {
    
    connectedCallback() {
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.getTemplate();

        this.appendChild(document.importNode(templateElement.content, true));
        this.init();
        this.render();
        this.addListener();
    }

    getTemplate() {
        return ""
    }

    init() {
        // abstrato
    }

    render() {
        // abstrato
    }

    addListener() {
        // abstrato
    }

    addListenerByClass(classNmae, callback) {
        for (const el of this.querySelectorAll(`.${classNmae}`)) {
            el.addEventListener("click", callback);
        }
    }
}

function createPetElement(template, ) {

}
