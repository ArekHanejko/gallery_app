import userEndpoint from "./user.endpoint.js";
import imageEndpoint from "./image.endpoint.js";
import commentEndpoint from "./comment.endpoint.js";

const routes = function (router) {
    userEndpoint(router);
    imageEndpoint(router);
    commentEndpoint(router);
};

export default routes;