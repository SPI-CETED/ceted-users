var passwordHash = require('password-hash');
var q = require('q');


module.exports = function(app){

	var CryptService = {

		cryptPassword: function(password) {
	    var defer = q.defer();
			var hashedPassword = passwordHash.generate(password);

	    defer.resolve(hashedPassword);
	    return defer.promise
		},

		comparePassword: function(password, hashedPassword) {
		  return passwordHash.verify(password, hashedPassword);
		}

	};

	return CryptService;

}
