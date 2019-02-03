'use strict';
const express = require('express');
const router = express.Router();
const ProjectController = require('../controller/project.controller');

const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty({uploadDir: './upload'});

router.post( '/save' , ProjectController.projectSave);
router.get( '/project/:id' , ProjectController.projectGetId);
router.get( '/projectall' , ProjectController.projectGet);
router.put('/projectUpdate/:id',ProjectController.projectUpdate);
router.delete('/projectDelete/:id',ProjectController.projectDelete  );
router.post('/uploadImag/:id',multipartyMiddleware,ProjectController.uploadImag);
router.get('/getImag/:img',ProjectController.getImage);



module.exports = router;