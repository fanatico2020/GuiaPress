const Sequelize  = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');//relacionamento importando

const Article = connection.define('articles',{
    title: {
        type: Sequelize.STRING,
        allowNull:false
    },
    slug:{
        type:Sequelize.STRING,
        allowNull:false
    },
    body:{
        type:Sequelize.TEXT,
        allowNull:false
    }
})

Category.hasMany(Article);// uma categoria tem muitos artigos 1-n
Article.belongsTo(Category);//Relacionamento artigo pertence a uma categoria 1-1

//Article.sync({force:true});

module.exports = Article;