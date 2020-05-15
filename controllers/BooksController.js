const db = require("../config/db").sequelize;
const BookModel = require("../models/BooksModel");
const parseRdf = require("../utils/processingFiles").parseRdfFiles;

const BooksController = () => {
    parseRdf(1, (book) => {
        BookModel.create(book);
    })
    //BookModel.create();
}
module.exports.BooksController = BooksController;