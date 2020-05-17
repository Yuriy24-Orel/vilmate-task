const db = require("../config/db").sequelize;
const BookModel = require("../models/BooksModel");
const parseRdf = require("../utils/processingFiles").parseRdfFiles;

const BooksController = () => {
    return parseRdf;
}
module.exports.BooksController = BooksController;