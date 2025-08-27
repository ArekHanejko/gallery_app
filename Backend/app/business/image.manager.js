import imageDAO from "../DAO/imageDAO.js";

function create(context) {
    async function query() {
        let result = imageDAO.query();
        if (result) {
            return result;
        }
    }

    async function get(id) {
        let result = await imageDAO.get(id);
        if (result) {
            return result;
        }
    }
    async function findByOwner(ownerId) {
        const result = await imageDAO.findByOwner(ownerId);
        if (result) {
            return result;
        }
    }
    async function createNew(data) {
        let result = await imageDAO.createNew(data);

        if (result) {
            return result;
        }
    }
    async function update(data,id) {
        let result = await imageDAO.update(data,id);
        if (result) {
            return result;
        }
    }
    async function remove(id) {
        let result = await imageDAO.remove(id);
        if (result) {
            return result;
        }
    }
    return {
        query: query,
        get: get,
        createNew: createNew,
        update: update,
        remove:remove,
        findByOwner: findByOwner,
    };
}

export default {
    create: create
};
