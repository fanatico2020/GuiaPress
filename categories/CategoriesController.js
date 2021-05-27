const express = require('express');
const router = express.Router();
const Category = require('./Category');
const slugify = require("slugify");
const adminAuth = require('../middlewares/adminAuthe');

router.get('/admin/categories/new',adminAuth,(req,res) => {
res.render("admin/categories/new");
});

router.post("/categories/save",adminAuth,(req,res) => {//rota para saver registro do form
var title = req.body.title;
if(title != undefined){
Category.create({
    title: title,
    slug:slugify(title)
}).then(() =>{
    res.redirect("/admin/categories");
})
}else{
    res.redirect("/admin/categories/new")
}
});

router.get("/admin/categories", (req, res) =>{//rota para lista todos os registros
    Category.findAll().then(categories =>{
        res.render("admin/categories/index",{categories:categories});
    });

});

router.post("/categories/delete",adminAuth,(req, res) =>{//rota para deletar registro
var id = req.body.id;
if(id != undefined){
    if(!isNaN(id)){
        Category.destroy({
            where: {
                id:id
            }
        }).then(() =>{
            res.redirect("/admin/categories");
        });
    }else{// id não for número
        res.redirect("/admin/categories");
    }
}else{//id for null
    res.redirect("/admin/categories");
}
});

router.get("/admin/categories/edit/:id",adminAuth,(req, res) =>{//rota com dados para edição
    var id = req.params.id;
    if(isNaN(id)){
        res.redirect("/admin/categories");
    }
    Category.findByPk(id).then(category => {
        if(category != undefined){
            res.render("admin/categories/edit",{category:category});
        }else{
            res.redirect("/admin/categories");
        }
    }).catch(erro => {
        res.redirect("/admin/categories");
    })
});

router.post("/categories/update",adminAuth,(req, res) => {//atualizando registro 
var id = req.body.id;
var title = req.body.title;

    Category.update({title: title,slug:slugify(title)},{
        where:{
            id:id
        }
    }).then(() => {
        res.redirect("/admin/categories")
    })
});

module.exports = router;