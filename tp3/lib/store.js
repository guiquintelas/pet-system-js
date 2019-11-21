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

    currentPage: window.location.hash
        ? window.location.hash.replace("#", "")
        : 'home'
    
}