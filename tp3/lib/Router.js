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

function getRouteAction() {
    if (!store.currentPath.length > 1) {
        return null;
    }

    if (store.currentPath.length === 2) {
        return store.currentPath[1];
    }

    return store.currentPath[2];
}

function setPage(name) {
    const pathArray = name.split("/");
    store.currentPage = pathArray[0];
    store.currentPath = pathArray;
}

function getCurrentPage() {
    const pagesFiltradas = store.pages.filter(page => page.name == store.currentPage);

    if (pagesFiltradas.length == 0) {
        return false;
    }

    return pagesFiltradas[0];
}


// utiliza o url para definir a pagina atual
setPage(window.location.hash.replace("#", ""));
  
window.customElements.define('pet-router', Router);