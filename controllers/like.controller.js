/* 
Imports
*/
const Models = require('../models/index');
//

/*  
CRUD methods
*/
const createOne = req => {
    return new Promise((resolve, reject) => {
        Models.like.create(req.body)
            .then(async data => {

                var apiResponse = {
                    data: data,
                    nbLikeComment: 0,
                    nbLikePost: 0
                };

                // update comment's likes list
                if (data.comment != null) {
                    await Models.comment.findById(data.comment)
                        .then(async comment => {
                            comment.likes.push(req.body.author);
                            await comment.save()
                                .then(updatedComment => {
                                    apiResponse.nbLikeComment = updatedComment.likes.length;
                                    resolve(apiResponse)
                                })
                                .catch(updateError => reject(updateError))
                        })
                        .catch(err => reject(err))
                }
                // update post's likes list
                else if (data.post != null) {
                    await Models.post.findById(req.body.post)
                        .then(async post => {
                            post.likes.push(req.body.author);
                            await post.save()
                                .then(updatedPost => {
                                    apiResponse.nbLikePost = updatedPost.likes.length;
                                    resolve(apiResponse)
                                })
                                .catch(updateError => reject(updateError))
                        })
                        .catch(err => reject(err))
                }
                resolve(apiResponse)
            })
            .catch(err => reject(err))
    })
}

const readAll = () => {
    return new Promise((resolve, reject) => {
        // Mongoose population to get associated data
        Models.like.find()
            .populate('like', ['author'])
            .exec((err, data) => {
                if (err) { return reject(err) }
                else { return resolve(data) }
            })
    })
}

const readAllFromPost = id => {
    return new Promise((resolve, reject) => {
        Models.like.find({ post: id })
            .exec((err, data) => {
                if (err) { return reject(err) }
                else { return resolve(data) }
            })
    })
}

const readOneFromPost = (req) => {
    return new Promise((resolve, reject) => {
        Models.like.find({ post: req.body.post, author: req.body.author })
            .exec((err, data) => {
                if (err) { return reject(err) }
                else { return resolve(data) }
            })
    })
}

const readAllFromComment = id => {
    return new Promise((resolve, reject) => {
        Models.like.find({ comment: id })
            .exec((err, data) => {
                if (err) { return reject(err) }
                else { return resolve(data) }
            })
    })
}

const readOneFromComment = (req) => {
    return new Promise((resolve, reject) => {
        Models.like.find({ comment: req.body.comment, author: req.body.author })
            .exec((err, data) => {
                if (err) { return reject(err) }
                else { return resolve(data) }
            })
    })
}

const readOne = id => {
    return new Promise((resolve, reject) => {
        // Mongoose population to get associated data
        Models.like.findById(id)
            .populate('like', ['author'])
            .exec((err, data) => {
                if (err) { return reject(err) }
                else { return resolve(data) }
            })
    })
}

const updateOne = req => {
    return new Promise((resolve, reject) => {
        // Get like by ID
        Models.like.findById(req.params.id)
            .then(like => {

                if (like.author !== req.user._id) { 
                    return reject('User not authorized') 
                }

                // Update object
                like.dateModified = new Date();

                // Save like changes
                like.save()
                    .then(updatedlike => resolve(updatedlike))
                    .catch(updateError => reject(updateError))
            })
            .catch(err => reject(err))
    })
}

const deleteOne = req => {
    return new Promise(async (resolve, reject) => {
        Models.like.findByIdAndDelete(req._id)
            .then(async () => {

                var apiResponse = {
                    data: req,
                    nbLikeComment: 0,
                    nbLikePost: 0
                };

                // update comment's likes list
                if (req.comment != null) {
                    await Models.comment.findById(req.comment)
                        .then(comment => {
                            comment.likes.splice(req._id);
                            comment.save()
                                .then(updatedComment => {
                                    apiResponse.nbLikeComment = updatedComment.likes.length;
                                    resolve(apiResponse);
                                })
                                .catch(updateError => reject(updateError))
                        })
                        .catch(err => reject(err))
                }
                // update post's likes list 
                else if (req.post != null) {
                    await Models.post.findById(req.post)
                        .then(post => {
                            post.likes.splice(req._id);
                            post.save()
                                .then(updatedPost => {
                                    apiResponse.nbLikeComment = updatedPost.likes.length;
                                    resolve(apiResponse);
                                })
                                .catch(updateError => reject(updateError))
                        })
                        .catch(err => reject(err))
                }
                resolve(apiResponse)
            })
            .catch(err => reject(err))
    })
        .catch(err => reject(err))
}
//

/* 
Export controller methods
*/
module.exports = {
    readAll,
    readOne,
    readAllFromPost,
    readOneFromPost,
    readAllFromComment,
    readOneFromComment,
    createOne,
    updateOne,
    deleteOne
}
//