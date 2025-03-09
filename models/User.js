const mongoose = require('../ext/mongoose'); 

const schema = new mongoose.Schema({
 

  name: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 2,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 2,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 4,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    maxlength: 12,
    minlength: 4,
    trim: true,
	},
	created: {
		type: Date, 
		default: Date.now()
  }
});

schema.methods.getNameInUpperCase = function () {
	let name = this.name + ' ' + this.lastname; 
	return name.toUpperCase(); 
}

module.exports = mongoose.model('User', schema)