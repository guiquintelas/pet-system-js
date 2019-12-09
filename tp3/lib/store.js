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

function removeRelation(model, relationName) {
    const oldValue = model[relationName];
    const oldRelationParent = store[relationName + "s"].filter(el => el.id == oldValue)[0];
    const oldRelationParentIndex = store[relationName + "s"].findIndex(el => el.id === oldRelationParent.id);

    // remove o id do model atual na relation antiga
    store[relationName + "s"][oldRelationParentIndex] = {
        ...oldRelationParent,
        [store.currentPage]: oldRelationParent[store.currentPage].filter(el => el != model.id)
    }
}

function addRelation(model, relationName, newValue) {
    const newRelationParent = store[relationName + "s"].filter(el => el.id == newValue)[0];
    const newRelationParentIndex = store[relationName + "s"].findIndex(el => el.id === newRelationParent.id);

    // adiciona o id do model atual na relation nova
    store[relationName + "s"][newRelationParentIndex] = {
        ...newRelationParent,
        [store.currentPage]: [
            ...newRelationParent[store.currentPage] ? newRelationParent[store.currentPage] : [],
            model.id
        ]
    }
}

function createEntity(data) {
    const model = {
        ...data,
        id: Math.random().toString(36).substring(2, 6),
    }

    const page = getCurrentPage();

    if (page.relations) {
        for (const relationName in page.relations) {
            if (page.relations[relationName] == MANY_TO_ONE) {
                addRelation(model, relationName, data[relationName])
            }
        }
    } 

    store[store.currentPage].push(model);

    console.log("criado!");
    persistInLocalStore();

    router.push(store.currentPage);
}

function mutateTargetEntity(data) {
    const model = getTargetEntity();

    const modelIndex = store[store.currentPage].findIndex(el => el.id === model.id);
    
    const page = getCurrentPage();

    if (page.relations) {
        for (const relationName in page.relations) {

            // caso o valor da relation nao tenha alterado ignorar
            if (model[relationName] === data[relationName]) {
                continue;
            }

            removeRelation(model, relationName);
            addRelation(model, relationName, data[relationName])
            
        }
    } 

    store[store.currentPage][modelIndex] = {
        ...model,
        ...data
    };

    console.log("salvo!");
    persistInLocalStore();

    router.push(store.currentPage);
}

function deleteEntity(id) {
    const page = getCurrentPage();

    if (page.relations) {
        const model = store[store.currentPage].filter(el => el.id == id)[0];

        for (const relationName in page.relations) {
            switch (page.relations[relationName]) {
                case ONE_TO_MANY:
                    const currentPageSingular = store.currentPage.substring(0, store.currentPage.length - 1);
                    store[relationName] = store[relationName].filter(el => el[currentPageSingular] != id)
                    break;

                case MANY_TO_ONE:
                    removeRelation(model, relationName);
                    break;
            }
        }
    } 
    
    store[store.currentPage] = store[store.currentPage].filter(el => el.id != id);

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