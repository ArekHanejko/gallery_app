import businessContainer from "../business/business.container.js";
import applicationException from "../service/applicationException.js";
import auth from "../middleware/auth.js";

const userEndpoint = (router) => {
    router.post('/api/user/auth', async (request, response, next) => {
        try {
            let result = await businessContainer.getUserManager(request).authenticate(request.body.login, request.body.password);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/api/user/create', async (request, response, next) => {
        try {
            console.info(request.body);
            const result = await businessContainer.getUserManager().createNewOrUpdate(request.body);
            response.status(201).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.delete('/api/user/logout/:userId', auth, async (request, response, next) => {
        try {
            let result = await businessContainer.getUserManager().removeHashSession(request.params.userId);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });


};

export default userEndpoint;
