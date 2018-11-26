module.exports = function(Message) {
  Message.greet = function(msg, cb) {
    process.nextTick(function() {
      cb(null, 'Sender says ' + msg + ' to receiver');
    });
  };
};
