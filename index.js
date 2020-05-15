const {
    Worker, isMainThread, parentPort, workerData
  } = require('worker_threads');
const BooksController = require("./controllers/BooksController").BooksController;

if (isMainThread) {
    const worker = new Worker(__filename);
    worker.on('message', (msg) => {
        console.log(msg)
    });
} else {
    BooksController();
    parentPort.postMessage('BooksController()');
}

