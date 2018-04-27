const secrets = {
    'db_uri': 'mongodb://pamarthid:pamarthid1@ds157639.mlab.com:57639/data-report',
};
  
module.exports = {
    requestSecret: function(s) {
        return secrets[s];
    },
};