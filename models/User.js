const { Schema, model } = require('mongoose'); 
const thoughtSchema = require('./Thought')

const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true,
            unique: true, 
            trim: true
        }, 
        email: {
            type: String, 
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "must supply valid email"]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ], 
    },
    {
        toJSON: {
            getters: true,
        }
    }, 

); 

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User; 