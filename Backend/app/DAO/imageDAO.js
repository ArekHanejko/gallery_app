import mongoose from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";
import mongoConverter from "../service/mongoConverter.js";
import * as buffer from "buffer";
const imgSchema= new mongoose.Schema({
    id_user: { type: String, ref: 'User', required: true },
    title: { type: String , required: true},
    description: { type: String , required: true},
    is_public: { type: Boolean , default: false,required: true},
    filename: { type: String , required: true},
    size: { type: Number , required: true},
    image_data: { type:  Buffer},
    imgType: { type: String , required: true},
}, {
    collection: 'Image' // Change the collection name as needed
});

imgSchema.plugin(uniqueValidator);

const ImgModel = mongoose.model('ImageM', imgSchema);
async function query() {
    return await ImgModel.find({is_public: true});
    /*console.log(result);
        if (result) {
            return mongoConverter(result);
        }*/

}
async function findByOwner(ownerId) {
    try {
        return await ImgModel.find({id_user: ownerId});
    } catch (error) {
        throw new Error('Error fetching schedules by owner');
    }
}async function get(id) {
    try {
        return ImgModel.find({_id: id});
    }catch (error) {
        throw new Error('Error fetching schedule by id');
    }
}
async function update(data,id) {
    //console.log(id);
    return Promise.resolve().then(() => {
        return ImgModel.findByIdAndUpdate(id, _.omit(data, 'id'), {new: true});
    });
}
async function createNew(data) {
    return Promise.resolve().then(() => {

        let temp = new ImgModel({
            id_user:data.id_user,
            title:data.title ,
            description:data.description ,
            is_public:data.is_public,
            filename: data.filename,
            size : data.size,
            image_data: data.image_data,
            imgType: data.imgType
        });

        if (!data.id) {
            return temp.save().then(result => {
                if (result != null) {
                    return true;
                }
            });
        } else {

            return ImgModel.findByIdAndUpdate(data.id, _.omit(data, 'id'), {new: true});
        }
    });
}
async function remove(id) {
    return ImgModel.deleteOne({_id: id});
}
export default {
    query: query,
    get: get,
    createNew: createNew,
    update:update,
    remove:remove,
    findByOwner: findByOwner,
    model: ImgModel
};