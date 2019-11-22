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

    currentPage: window.location.hash
        ? window.location.hash.replace("#", "")
        : 'home',

    getCurrentPage() {
        const pagesFiltradas = this.pages.filter(page => page.name == this.currentPage);

        if (pagesFiltradas.length == 0) {
            return false;
        }

        return pagesFiltradas[0];
    }
    
}