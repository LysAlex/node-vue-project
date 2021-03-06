/*
Imports
*/
    // Node
    const express = require('express');

    // Inner
    const Controllers = require('../controllers/index')
    const { checkFields } = require('../services/request.service');
    const Mandatory = require('../services/mandatory.service');
    const { renderSuccessVue, renderErrorVue } = require('../services/response.service');
//

/*
Routes definition
*/
    class BackendRouter {
        constructor( { passport } ){
            this.passport = passport
            this.router = express.Router(); 
        } 

        routes(){
            // [BACKOFFICE] Render index vue
            this.router.get('/', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
                Controllers.post.readAll()
                .then( apiResponse => renderSuccessVue('index', req, res, apiResponse,  'Request succeed', false))
                .catch( apiError => renderErrorVue('index', req, res, apiError,  'Request failed') )
            })

             // [BACKOFFICE] Render register vue
            this.router.get('/register', (req, res) => {
                renderSuccessVue('register', req, res, null, 'Request succeed', false)
            })

            // [BACKOFFICE] Render login vue
            this.router.get('/login', (req, res) => {
                renderSuccessVue('login', req, res, null, 'Request succeed', false)
            })

            // [BACKOFFICE] get data from client to log user and render index vue
            this.router.post('/register', (req, res) => {

                // Check body data
                if (typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0) {
                    return renderErrorVue('error', req, res, 'No data provided', 'Request failed')
                }
                else {

                    // Check body data
                    const { ok, extra, miss } = checkFields(Mandatory.register, req.body);

                    // Error: bad fields provided
                    if (!ok) { return renderErrorVue('index', '/register', 'POST', res, 'Bad fields provided', { extra, miss }) }
                    else {
                        Controllers.auth.register(req, res)
                            .then(apiResponse => renderSuccessVue('/', req, res, 'User registered', apiResponse, true))
                            .catch(apiError => renderErrorVue('register', req, res, apiError, 'Request failed'));
                    }
                }
            })

            // [BACKOFFICE] get data from client to log user and render index vue
            this.router.post('/login', (req, res) => {
                
                // Check body data
                if( typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0 ){ 
                    return renderErrorVue('index', req, res, 'No data provided',  'Request failed')
                }
                else{
                    
                    // Check body data
                    const { ok, extra, miss } = checkFields( Mandatory.login, req.body );

                    // Error: bad fields provided
                    if( !ok ){ return renderErrorVue('index', '/Login', 'POST', res, 'Bad fields provided', { extra, miss }) }
                    else{
                        Controllers.auth.login(req, res)
                        .then( apiResponse => renderSuccessVue( '/', req, res, 'User logged', apiResponse, true ) )
                        .catch( apiError => renderErrorVue('login', req, res, apiError,  'Request failed') );
                    }
                }
            })

            // [BACKOFFICE] get data from client to create object, protected by Passport MiddleWare
            this.router.post('/:endpoint', this.passport.authenticate('jwt', { session: false, failureRedirect: '/' }), (req, res) => {
                // Check body data
                if( typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0 ){ 
                    return renderErrorVue('index', req, res, 'No data provided',  'Request failed')
                }
                else{
                    // Check body data
                    const { ok, extra, miss } = checkFields( Mandatory[req.params.endpoint], req.body );

                    // Error: bad fields provided
                    if( !ok ){ return renderErrorVue('index', `/${req.params.endpoint}`, 'POST', res, 'Bad fields provided', { extra, miss }) }
                    else{
                        // Add author _id
                        req.body.author = req.user._id;

                        // Use the controller to create nex object
                        Controllers[req.params.endpoint].createOne(req)
                        .then( apiResponse =>  res.redirect('/', req, res, 'Request succeed', apiResponse, true) )
                        .catch( apiError => renderErrorVue('index', req, res, apiError,  'Request failed') )
                    }
                }
            })

        // [BACKOFFICE] Render GET vue
        this.router.get('/:endpoint/:id', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), async (req, res) => {

            let data = {
                post: null,
                comments: null,
                user: null,
                nbLikeComment: 0,
                nbLikePost: 0
            };

            await Controllers[req.params.endpoint].readOne(req.params.id)
                .then(post => data.post = post)
                .catch(() => renderErrorVue('error', req, res, 'Article inconnu', 'Request failed'));

            await Controllers['comment'].readAllFromPost(data.post.id)
                .then(comments => {
                    data.comments = comments
                })
                .catch(() => data.comments = null);

            await Controllers['user'].readOne(req.user.id)
                .then(user => data.user = user)
                .catch(() => data.user = null);

            renderSuccessVue('post', req, res, data, 'Request succeed', false)
        })

        // [BACKOFFICE] get data from client to update / delete object, protected by Passport MiddleWare
        this.router.post('/:endpoint/:action', this.passport.authenticate('jwt', { session: false, failureRedirect: '/' }), (req, res) => {

            // Check body data
            if (typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0) {
                return renderErrorVue('error', req, res, 'No data provided', 'Request failed')
            }
            else {
                // Check body data
                const { ok, extra, miss } = checkFields(Mandatory[req.params.endpoint], req.body);

                // Error: bad fields provided (except for deletion)
                if (!ok && req.params.action != 'delete') {
                    return renderErrorVue('error', `/${req.params.endpoint}`, 'POST', res, 'Bad fields provided', { extra, miss })
                } else {

                    // Add author _id
                    req.body.author = req.user._id;

                    switch (req.params.action) {

                        case 'create':
                            Controllers[req.params.endpoint].createOne(req)
                                .then(apiResponse => res.redirect(req.get('referer'), req, res, 'Request succeed', apiResponse, true))
                                .catch(apiError => renderErrorVue('error', req, res, apiError, 'Request failed'))
                            break;

                        case 'update':
                            Controllers[req.params.endpoint].updateOne(req)
                                .then(apiResponse => res.redirect(req.get('referer'), req, res, 'Request succeed', apiResponse, true))
                                .catch(apiError => renderErrorVue('error', req, res, apiError, 'Request failed'))
                            break;

                        case 'delete':
                            Controllers[req.params.endpoint].deleteOne(req)
                                .then(apiResponse => res.redirect(req.get('referer'), req, res, 'Request succeed', apiResponse, true))
                                .catch(apiError => renderErrorVue('error', req, res, apiError, 'Request failed'))
                            break;

                        default:
                            renderErrorVue('error', req, res, false, 'Unauthorized action');
                            break;
                    }

                }
            }
        })
    }



        init(){
            // Get route fonctions
            this.routes();

            // Sendback router
            return this.router;
        };
    }
//

/*
Export
*/
    module.exports = BackendRouter;
//