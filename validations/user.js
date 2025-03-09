const Joi = require('joi'); 

exports.userValidation = data => {

	const schema = Joi.object({
		name: Joi.string().min(1).max(255).required(),
		lastname: Joi.string().min(1).max(255).required(),
		email: Joi.string().min(4).max(255).required().email(),
		phone: Joi.string().min(4).max(10).required().pattern(/^((\+7|7|8)+([0-9]){10})$/)
	}); 

	return schema.validate(data)
}