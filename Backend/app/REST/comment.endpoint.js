import businessContainer from "../business/business.container.js";
import multer from "multer";
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const storageS = multer.memoryStorage();
const upload =  multer({ storage: storageS});
import UserDAO from "../DAO/userDAO.js";
const CommentEndpoint = (router) => {
    router.put('/api/Comment/update/:id', async (req, res) => {
        try {
            const CommentEntry = await businessContainer.getCommentManager(req).createNewOrUpdate(req.body);
            if (CommentEntry) {
                res.status(201).json(CommentEntry);
            } else {
                res.status(500).json({ error: 'Error creating Comment entry 1' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error creating Comment entry' });
        }
    });


    router.put('/api/deleteComment/:id', async (req, res) => {
        try {
            const CommentEntry = await businessContainer.getCommentManager().remove(req.params.id);
            if (CommentEntry) {
                res.status(201).json(CommentEntry);
            } else {
                res.status(500).json({ error: 'Error creating Comment entry 1' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error creating Comment entry' });
        }       
});

    router.post('/api/createComment', async (req, res, next) => {
        try {
            const user = await UserDAO.get(req.body.id_User);
            let temp = {
                id_IMG:req.body.id_IMG,
                id_User:user.name ,
                text:req.body.text ,
                date:req.body.date,
            };
            const CommentEntry = await businessContainer.getCommentManager().createNewOrUpdate(temp);

            if (CommentEntry) {
                res.status(201).json('Comment added');
            } else {
                res.status(500).json({ error: 'Error creating Comment entry 1' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error creating Comment entry',error1: error });
        }
    });

    router.get('/api/Comment/byId/:Id', async (req, res,next) => {
        try {
            const imgId = req.params.Id;
            const Comment = await businessContainer.getCommentManager().get(imgId);
            console.log(Comment);
            res.status(200).json(Comment);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching Comment' });
        }

    });
    router.get('/api/Comment/by-user/:userId', async (req, res) => {
        const userId = req.params.userId;
        console.log(req.params.id_User);
        try {
            const Comment = await businessContainer.getCommentManager(req).findByOwner(userId);
            console.log(Comment);
            res.status(200).json(Comment);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching Comment' });
        }

    });
}
export default CommentEndpoint;
