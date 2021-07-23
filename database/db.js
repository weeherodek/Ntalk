const mongoose = require('mongoose');
const bluebird = require('bluebird');
const currentEnv = process.env.NODE_ENV || 'development';
const envURL = {
    test: 'mongodb://localhost:27017/ntalktest',
    development: 'mongodb://localhost:27017/ntalk'
};
mongoose.Promise = bluebird;

mongoose.connect(envURL[currentEnv], { useFindAndModify:false, useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true });

module.exports = mongoose;
