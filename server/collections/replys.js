var Bookshelf = require('../db/config').Bookshelf;
var Reply = require('../models/reply');

var Replys = new Bookshelf.Collection();

Replys.model = Reply;

module.exports = Replys;
