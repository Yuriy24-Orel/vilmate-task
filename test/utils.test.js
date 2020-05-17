const assert = require('assert');

const parseRdf = require("../utils/processingFiles").parseRdfFiles;

describe('test parse rdf files function', () => {
    it('should return fasle', () => {
        assert.equal(parseRdf(9999999, (book) => BookModel.create(book)), false);
    });

    it('shouldn`t work at all', () => {
        assert.equal(parseRdf(undefined, (book) => BookModel.create(book)), false);
    });

    it('should return true, cause we simulate last file', () => {
        assert.equal(parseRdf(1000000, (book) => BookModel.create(book)), true);
    });
})