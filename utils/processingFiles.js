const fs = require("fs");
const process = require("process");
const cheerio = require('cheerio');
const path = require("path");

const creatingBookObject = (data) => {
    const $ = cheerio.load(data);
    const bookObject = {};

    bookObject.bookId = +$('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', '');
    bookObject.name = $('pgterms\\:agent pgterms\\:name').text();
    bookObject.title = $('dcterms\\:title').text();
    bookObject.publisher = $('dcterms\\:publisher').text();
    bookObject.publicationDate = $('dcterms\\:issued').text();
    bookObject.language = $('dcterms\\:language rdf\\:value').text();
    bookObject.subjects = $('dcterms\\:subject rdf\\:value').toArray().map((subject) => $(subject).text()).toString();
    bookObject.license = $('dcterms\\:license').attr('rdf:resource');

    return bookObject;
}

const parseRdfFiles = (idRdf, callback = () => {}) => {
    let filename = path.join(`${__dirname}`, '..', `data-files/epub/${idRdf}/pg${idRdf}.rdf`);

    if(fs.existsSync(filename) && idRdf < 1000000 && idRdf){ // 1000000 - it is number of last file(cause we have file.length - 1, for good test). In real life projects we can create function for counting all our files.
        fs.readFile(filename, (err, data) => {
            const book = creatingBookObject(data);
            callback(book);
        });

        idRdf++;        
        return setTimeout(() => {parseRdfFiles(idRdf, callback)}, 500);
    }else if(!fs.existsSync(filename) && idRdf < 1000000 && idRdf) {
        idRdf++;
        return setTimeout(() => {parseRdfFiles(idRdf, callback)}, 500);
    }else if(idRdf === 1000000) {
        return true;
    }else {
        return false;
    }
}
module.exports.parseRdfFiles = parseRdfFiles;
