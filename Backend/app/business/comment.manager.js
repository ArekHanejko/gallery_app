import commentDAO from "../DAO/commentDAO.js";



function create(context) {
    async function query() {
        let result = commentDAO.query();
        if (result) {
            return result;
        }
    }

    async function get(id) {
        let result = await commentDAO.get(id);
        if (result) {
            return result;
        }
    }

    async function createNewOrUpdate(data) {
        let result = await commentDAO.createNewOrUpdate(data);
        if (result) {
            return result;
        }
    }
    async function findByOwner(ownerId) {
        const result = await commentDAO.findByOwner(ownerId);
        if (result) {
            return result;
        }
    }
    async function remove(id) {
        let result = await commentDAO.remove(id);
        if (result) {
            return result;
        }
    }
    return {
        query: query,
        get: get,
        createNewOrUpdate: createNewOrUpdate,
        remove:remove,
        findByOwner: findByOwner,
    };
}

export default {
    create: create
};
