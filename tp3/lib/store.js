const ONE_TO_MANY = "one-to-many";
const MANY_TO_ONE = "many-to-one";

let store = {
    pages: [
        { renderName: 'Home',               name: 'home' },
        { renderName: 'Usuários',           name: 'usuarios' },
        { 
            renderName: 'Consultas',
            name: 'consultas',
            relations: {
                vacinas: ONE_TO_MANY
            }
        },
        { renderName: 'Cupom de Descontos', name: 'cupoms' },
        { 
            renderName: 'Vacinas',
            name: 'vacinas',
            relations: {
                consulta: MANY_TO_ONE
            }
        },
        { renderName: 'Tosas',              name: 'tosas' },
    ],

    usuarios: [
        {
            id: "asce",
            name: "Fulano",
            email: "fulano@fulano.com",
            password: "123",
        },
        {
            id: "aass",
            name: "Fulano 2",
            email: "fulano@fulano.com",
            password: "123",
        },
    ],

    consultas: [
        {
            id: "as1d",
            name: "Consulta Semanal",
            price: 200,
            vacinas: [
                "fqsa", "fqsdbw"
            ],
            // pet
        },
        {
            id: "uilu",
            name: "Consulta Diária",
            price: 75,
            // pet
        },
    ],

    vacinas: [
        {
            id: "fqsa",
            name: "Gripe",
            price: 159,
            consulta: "as1d",
        },
        {
            id: "fqsdbw",
            name: "Aids Felina",
            price: 25,
            consulta: "as1d",
        },
    ],

    cupoms: [
        {
            id: "rbrf",
            code: "PET100",
            value: 100,
        },
        {
            id: "vfee",
            code: "PET60",
            value: 60,
        },
    ],

    tosas: [
        {
            id: "fdwd",
            name: "Tosa 1",
            price: 100,
            isShower: true,
        },
        {
            id: "1srf",
            name: "Tosa Média",
            price: 45,
            isShower: true,
        },
        {
            id: "rfasf",
            name: "Tosa Barata",
            price: 15,
            isShower: false,
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
    persistInLocalStore();

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
    persistInLocalStore();

    router.push(store.currentPage);
}

function deleteEntity(id) {
    const modelIndex = store[store.currentPage].findIndex(el => el.id == id);

    if (modelIndex < 0) {
        return;
    }
    
    delete store[store.currentPage][modelIndex];

    console.log("deletado!");
    persistInLocalStore();

    router.push(store.currentPage);
}

function initLocalStorage() {
    const localStore = localStorage.getItem("store");

    if (localStore) {
        store = JSON.parse(localStore);
        
    } else {
        persistInLocalStore();
    }
}

function persistInLocalStore() {
    localStorage.setItem("store", JSON.stringify(store));
}

initLocalStorage();