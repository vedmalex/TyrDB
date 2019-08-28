const PersistanceAdapter = require('../../types/PersistanceAdapter/PersistanceAdapter')
class MemoryAdapter extends PersistanceAdapter {
  constructor(props){
    super(props);
    this.store = {
      databases:{}
    };
  }
};
MemoryAdapter.prototype.connectAdapter = require('./methods/connectAdapter');
MemoryAdapter.prototype.createCollection = require('./methods/createCollection');
MemoryAdapter.prototype.createDatabase = require('./methods/createDatabase');
MemoryAdapter.prototype.findCollection = require('./methods/findCollection');
MemoryAdapter.prototype.findDatabase = require('./methods/findDatabase');
MemoryAdapter.prototype.findOneDocumentInCollection = require('./methods/findOneDocumentInCollection');
MemoryAdapter.prototype.insertOneDocumentToCollection = require('./methods/insertOneDocumentToCollection');
module.exports = MemoryAdapter;
