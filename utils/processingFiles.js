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

    if(fs.existsSync(filename) && idRdf < 999999){
        fs.readFile(filename, (err, data) => {
            const book = creatingBookObject(data);
            callback(book);
        });

        idRdf++;
        
        if(idRdf){
            return setTimeout(() => {parseRdfFiles(idRdf, callback)}, 500);
        }else{
            return true;
        }
    }else if(!fs.existsSync(filename) && idRdf < 999999) {
        idRdf++;
        return setTimeout(() => {parseRdfFiles(idRdf, callback)}, 500);
    }else {
        return false;
    }
}
module.exports.parseRdfFiles = parseRdfFiles;
/* function test() {
    parseRdfFiles(1, (book) => {
        console.log(book);
    })
}

test() */