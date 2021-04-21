/*
Import
*/
const mongoose = require('mongoose');
const { Schema } = mongoose;
//

/*
Definition
*/
const MySchema = new Schema({
    // Schema.org
    '@context': { type: String, default: 'http://schema.org' },
    '@type': { type: String, default: 'Comment' },

    content: String,

    // Link the user profile 
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'  
    },

    // Link to a post
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post'  
    },

    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'like'
    }],

    // Define a value by default
    creationDate: { type: Date, default: new Date() },
    dateModified: { type: Date, default: new Date() },
    isPublished: { type: Boolean, default: false }
})
//

/* 
Export
*/
module.exports = mongoose.model('comment', MySchema)
//