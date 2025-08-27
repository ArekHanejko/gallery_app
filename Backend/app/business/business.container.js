import userManager from "./user.manager.js";
import imageManager from "./image.manager.js";
import commentManager from "./comment.manager.js";

function getter(manager, request) {
    return function () {
        return manager.create(request, this);
    };
}

export default {
    getUserManager: getter(userManager),
    getImageManager: getter(imageManager),
    getCommentManager: getter(commentManager),
};