import mongoose from 'mongoose';
import config from "../config.js";
import momentWrapper from "../service/momentWrapper.js";
import jwt from 'jsonwebtoken';
import mongoConverter from "../service/mongoConverter.js";
import applicationException from "../service/applicationException.js";

const tokenTypeEnum = {
    authorization: 'authorization'
};

const tokenTypes = [tokenTypeEnum.authorization];

const tokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    createDate: { type: Number, required: true },
    type: { type: String, enum: tokenTypes, required: true },
    value: { type: String, required: true }
}, {
    collection: 'token'
});

const TokenModel = mongoose.model('token', tokenSchema);

async function create(user) {
    const access = 'auth';
    const userData = {
        userId: user.id,
        name: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
        access: access
    };
    const value = jwt.sign(
        userData,
        config.JwtSecret,
        {
            expiresIn: '3h'
        });
    const result = await TokenModel({
        userId: user.id,
        type: 'authorization',
        value: value,
        createDate: momentWrapper.get().valueOf()
    }).save();
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.BAD_REQUEST, error.message);
}

async function get(tokenValue) {
    const result = await TokenModel.findOne({ value: tokenValue });
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.UNAUTHORIZED, 'Token not found');
}

async function remove(userId) {
    return await TokenModel.deleteOne({ userId: userId });
}

export default {
    create: create,
    get: get,
    remove: remove,

    tokenTypeEnum: tokenTypeEnum,
    model: TokenModel
};
