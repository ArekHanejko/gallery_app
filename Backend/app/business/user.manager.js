import PasswordDAO from "../DAO/passwordDAO.js";
import TokenDAO from "../DAO/tokenDAO.js";
import UserDAO from "../DAO/userDAO.js";
import applicationException from "../service/applicationException.js";
import sha1 from 'sha1';
//import imageDAO from "../DAO/imageDAO.js";

function create(context) {

    function hashString(password) {
        return sha1(password);
    }

    async function authenticate(name, password) {
        let userData;
        const user = await UserDAO.getByEmailOrName(name);
        if (!user) {
            throw applicationException.new(applicationException.UNAUTHORIZED, 'User with that email does not exist');
        }
        userData = await user;
        await PasswordDAO.authorize(user.id, hashString(password));
        const token = await TokenDAO.create(userData);
        console.log(token);
        return getToken(token);
    }

    function getToken(token) {
        return {token: token.value,userid: token.userId};
    }
    async function get(id) {
        let result = await UserDAO.get(id);
        if (result) {
            return result;
        }
    }
    async function createNewOrUpdate(userData) {
        const user = await UserDAO.createNewOrUpdate(userData);
        if (await userData.password) {
            return await PasswordDAO.createOrUpdate({userId: user.id, password: hashString(userData.password)});
        } else {
            return user;
        }
    }

    async function removeHashSession(userId) {
        return await TokenDAO.remove(userId);
    }

    return {
        authenticate: authenticate,
        createNewOrUpdate: createNewOrUpdate,
        removeHashSession: removeHashSession,
        get: get
    };
}

export default {
    create: create
};
