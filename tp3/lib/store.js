const store = {
    pages: [
        { 
            renderName: 'Home', 
            name: 'home'
        },
        { 
            renderName: 'Usuários', 
            name: 'usuarios'
        },
    ],

    usuarios: [
        {
            id: 1,
            name: "Fulano",
            email: "fulano@fulano.com",
            password: "123",
        },
        {
            id: 2,
            name: "Fulano 2",
            email: "fulano@fulano.com",
            password: "123",
        },
    ],

    currentPage: null,
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