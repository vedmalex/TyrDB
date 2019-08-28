const ObjectID = require("bson-objectid");
const {clone} = require("lodash");
const getMetadataFromProps = require('./methods/private/getMetadataFromProps');
const cleanPrivateProps = require('./methods/private/cleanPrivateProps');


class Document {
  constructor(props = {}){
    //FIXME : This is absolutely not a vaid ObjectID, it just return a hex representation of time, while it should be
    // something like 5 bytes of times + random bytes + random coutner
    // Let's not create another repo/project yet.
    this._id = ObjectID();
    this._meta = getMetadataFromProps(props);
    this.data = clone(cleanPrivateProps(props))
    //TODO : It changes on update or replace

    this.updateMetadata()
  }
};
Document.prototype.export = require('./methods/export');
Document.prototype.serialize = require('./methods/serialize');
Document.prototype.update = require('./methods/update');
Document.prototype.replace = require('./methods/replace');
Document.prototype.updateMetadata = require('./methods/updateMetadata');
module.exports = Document;
