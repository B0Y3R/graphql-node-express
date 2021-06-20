const article = require('../../models/article');
const Article = require('../../models/article');

module.exports = {
    articles: async () => {
        try {
            const fetchedArticles = await Article.find();
            return fetchedArticles.map(article => {
                return {
                    ...article._doc,
                    _id: article.id, 
                    createdAt: new Date(article._doc.createdAt).toUTCString(),
                    updatedAt: new Date(article._doc.updatedAt).toUTCString(),
                }
            })
        } catch (error) {
            throw error
        }
    }, 

    createArticle: async args => {
        try {
            const { title, body } = args.article;

            const article = new Article({ title, body });

            const newArticle = await article.save();

            return { ...newArticle._doc, _id: newArticle.id }

        } catch (error) {
            throw error
        }
    },

    updateArticle: async args => {
        try {
            const { _id, title, body } = args.article;

            await Article.updateOne({ _id }, { title, body });

            const updatedArticle = await Article.findById({_id});

            console.log(updatedArticle, "HIT");

            return { ...updatedArticle._doc }

        } catch (error) {
            throw error
        }
    },

    deleteArticle: async args => {
        try {

            const { _id } = args.article;

            await Article.deleteOne({ _id: _id });

        } catch (error) {
            throw error
        }
    }
    
}