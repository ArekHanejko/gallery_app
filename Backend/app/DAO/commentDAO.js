/*
id_IMG
id_User
text
date




<<<<<<< Updated upstream
=======
*/
import mongoose from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";
import mongoConverter from "../service/mongoConverter.js";
import * as buffer from "buffer";
const commentSchema= new mongoose.Schema({
    id_IMG: { type: String, ref: 'Image', required: true },
    id_User: { type: String, ref: 'User', required: true },
    text: { type: String , required: true},
    date: { type: String , required: true},
}, {
    collection: 'Comment' // Change the collection name as needed
});

const CommentModel = mongoose.model('Comment', commentSchema);
async function query() {
    return await CommentModel.find();
    /*console.log(result);
        if (result) {
            return mongoConverter(result);
        }*/

}

async function get(id) {
    try {
        return CommentModel.find({id_IMG: id});
    }catch (error) {
        throw new Error('Error fetching Comment by id');
    }
}
async function findByOwner(ownerId) {
    try {
        return await CommentModel.find({id_User: ownerId});
    } catch (error) {
        throw new Error('Error fetching Comment by owner');
    }
}
function createNewOrUpdate(comment) {
    return Promise.resolve().then(() => {
        if (!comment.id) {
            return new  CommentModel(comment).save().then(result => {
                if (result) {
                    return mongoConverter(result);
                }
            });
        } else {
            return CommentModel.findByIdAndUpdate(comment.id, _.omit(comment, 'id'), { new: true });
        }
    }).catch(error => {
        if ('ValidationError' === error.name) {
            error = error.errors[Object.keys(error.errors)[0]];
            throw applicationException.new(applicationException.BAD_REQUEST, error.message);
        }
        throw error;
    });
}

async function remove(id) {
    return CommentModel.deleteOne({_id: id});
}
export default {
    query: query,
    get: get,
    createNewOrUpdate: createNewOrUpdate,
    findByOwner: findByOwner,
    remove:remove,
    model: CommentModel
};
