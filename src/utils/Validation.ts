import * as yup from 'yup';

const schema = yup
	.object({
		name: yup.string().required(),
		price: yup.number().positive().integer().min(1).required(),
		type: yup.string().required(),
	})
	.required();

export default schema;
