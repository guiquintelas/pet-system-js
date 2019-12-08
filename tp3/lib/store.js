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
    currentPath: [],
}

function getTargetEntity() {
    if (!store.currentPath.length > 2) {
        return null;
    }

    const modelId = store.currentPath[1];

    const searchResult = store[store.currentPage].filter(el => el.id == modelId);

    if (searchResult.length == 0) {
        return null;
    }

    return searchResult[0];
}

function createEntity(data) {
    store[store.currentPage].push({
        ...data,
        id: Math.random().toString(36).substring(2, 6),
    });

    console.log("criado!");

    router.push(store.currentPage);
}

function mutateTargetEntity(data) {
    const model = getTargetEntity();

    const modelIndex = store[store.currentPage].findIndex(el => el.id === model.id);
    
    store[store.currentPage][modelIndex] = {
        ...model,
        ...data
    };

    console.log("salvo!");

    router.push(store.currentPage);
}

function deleteEntity(id) {
    const modelIndex = store[store.currentPage].findIndex(el => el.id == id);

    if (modelIndex < 0) {
        return;
    }
    
    delete store[store.currentPage][modelIndex];

    console.log("deletado!");

    router.push(store.currentPage);
}