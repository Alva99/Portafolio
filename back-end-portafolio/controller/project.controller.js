'use strict';
var projectModel = require('../models/project');
var fs = require('fs');
var path = require('path');
const project = {

    projectSave: async (req,res) => {
        var project = new projectModel();
        var params = req.body;
        project.name = params.name;
        project.descripcion = params.descripcion;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.img = null; 
        project.save((err,Stored)=>{
            if(err){
                return res.json({
                    'message': 'false'
                });
            }
            else if(!Stored){
                return res.json({
                    'message': 'No se logro almacenar'
                });
            }else{
                return res.json({
                    'message': 'true',
                    'values': Stored
                });
            }
        });
        
    },
    projectGetId: async (req,res) => {
        var projectId = req.params.id;
        if(projectId == null) return res.status(404).json({'message':'El project no existe'});
        
        projectModel.findById(projectId,(err,result)=>{
            if(err){
                return res.status(500).json({
                    'message':'Erro de datos'
                })
            }
            else if(!result){
                return res.status(404).json({
                    'message':'No existe el porafolio'
                });
            }else{
                return res.status(200).json({
                    'message': result
                });
            }
        });
    },
    projectGet: async (err,res) => {
        await projectModel.find().exec((err,result) =>{
            if(err){
                return res.status(500).json({
                    'message':'Error de datos'
                });
            }else if(!result){
                return res.status(404).json({
                    'message':'No se encontraron project'
                })
            }else{
                return res.status(200).json({
                    'message':result
                })
            }
        });
    },
    projectUpdate: async (req,res) => {
        var projectId = req.params.id;
        var update = req.body;
        projectModel.findByIdAndUpdate(projectId,update,{new:true},(err,resultUpdate) => {
            if(err){
                return res.status(500).json({
                    'message':'Error al actualizar'
                });
            }
            else if(!resultUpdate){
                return res.status(404).json({
                    'message':'No existe el projecto para actualizar'
                });
            }
            else{
                return res.status(200).json({
                    'message':resultUpdate
                });
            }
        })
    },
    projectDelete: async (req,res) => {
        var projectId = req.params.id;
        projectModel.findByIdAndRemove(projectId,(err,resultDelete) => {
            if(err){
                return res.status(500).json({
                    'message': 'Error al eliminar project'
                });
            }
            else if(!resultDelete){
                return res.status(404).json({
                    'message': 'No se elimino el project'
                });
            }
            else{
                return res.status(200).json({
                    'message': resultDelete
                });
            }
        });
    },
    uploadImag: async (req,res) => {
        var projectId = req.params.id;
        var fileName = 'Imagen no subida...';
        if(req.files){
            var filePath = req.files.img.path;
            var filesplit = filePath.split('\\');
            var fileName = filesplit[1];
            var extFile = fileName.split('\.');
            var fileExt = extFile[1];
            if(fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif'){
                projectModel.findByIdAndUpdate(projectId,{img:fileName},{new:true},(err,fileUpdate) => {
                    if(err){
                        return res.status(500).json({
                            'message': 'Error de imagen' 
                        });
                    }
                    else if(!fileUpdate){
                        return res.status(404).json({
                            'message': 'La imagen no se ha subido '
                        });
                    }
                    else{
                        return res.status(200).json({
                            'message':fileUpdate
                        });
                    }
                });
            }
            else{
                fs.unlink(filePath,(err) => {
                    return res.status(200).json({
                        'message':'Extension no es valida'
                    });
                });
            }
          
            
        }else{
            return res.status(200).json({
                'message': fileName
            });
        }
    },
    getImage: async (req, res) => {
        var file = req.params.img;
        var pathFile = './upload/'+file;

        fs.exists(pathFile,(exist) => {
            if(exist){
                return res.sendFile(path.resolve(pathFile));
            }else{
                return res.status(200).json({
                    'message': 'No existe la imageb'
                });
            }
        });

    }

}; 

module.exports = project;