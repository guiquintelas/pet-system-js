window.onhashchange = (evt) => {
    store.currentPage = router.getCurrentPage();
    router.refresh();
}


const router = {
    push(name) {
        window.history.pushState({}, "", `#${name}`);
        setPage(name);
        this.refresh();
    },

    refresh() {
        const newRouterElement = document.createElement("pet-router");
        newRouterElement.id = "router";

        document.querySelector("#router").remove();
        document.querySelector("body").appendChild(newRouterElement);
    },

    getCurrentPage() {
        return window.location.hash
            ? window.location.hash.replace("#", "")
            : 'home'
    }
}

class Router extends PetElement {
    getTemplate() {
        const currentPage = store.pages.filter(p => p.name == store.currentPage)[0];

        if (!currentPage) {
            router.push('home');
            return `<pet-home></pet-home>`;
        }

        return `<pet-${currentPage.name}></pet-${currentPage.name}>`;
    }
}
  
window.customElements.define('pet-router', Router);