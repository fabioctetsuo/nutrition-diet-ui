import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
	cpf: [
		validator('presence', true),
		validator('length', {
			max: 11,
		}),
	],
	primeiroNome: validator('presence', true),
	sobrenome: validator('presence', true),
	sexo: validator('presence', true),
	dataNascimento: [
		validator('presence', true),
		validator('date', {
			format: 'DD/MM/YYYY',
		})
	],
	peso: [
		validator('presence', true),
		validator('number', {
			gt: 0,
		})
	],
	altura: [
		validator('presence', true),
		validator('number', {
			gt: 0,
		})
	],
});