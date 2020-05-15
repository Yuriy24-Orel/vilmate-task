const Sequelize = require('sequelize');
const db = require("../config/db");

const Book = db.sequelize.define('books',  {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    bookId: {
        type: Sequelize.INTEGER,
        primaryKey: false
    },
    name: Sequelize.STRING,
    title: Sequelize.STRING,
    publisher: Sequelize.STRING,
    publicationDate: Sequelize.STRING,
    language: Sequelize.STRING,
    subjects: Sequelize.STRING,
    license: Sequelize.STRING
}, {
    timestamps: false
});

module.exports = Book;