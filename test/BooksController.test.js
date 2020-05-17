const assert = require('assert');

const BooksController = require('../controllers/BooksController').BooksController;

describe('test books controller data', () => {
    it('should be a function', () => {
        assert.equal(typeof BooksController, 'function');
    });

    it('should return a function', () => {
        assert.equal(typeof BooksController(), 'function');
    });
})