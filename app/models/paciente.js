import DS from 'ember-data';
import moment from 'moment';
import { computed } from '@ember/object';
import Validations from '../validations/paciente';

export default DS.Model.extend(Validations, {
	codigo: DS.attr('string'),
	cpf: DS.attr('string'),
	primeiroNome: DS.attr('string'),
	sobrenome: DS.attr('string'),
	sexo: DS.attr('string'),
	dataNascimento: DS.attr('string'),
	dataCadastro: DS.attr('string'),
	versao: DS.attr('number'),
	peso: DS.attr('number'),
	altura: DS.attr('number'),
	ativo: DS.attr('boolean'),
	
	nomeCompleto: computed('primeiroNome', 'sobrenome', function() {
		return `${this.get('primeiroNome')} ${this.get('sobrenome')}`;
	}),
	alturaMetros: computed('altura', function() {
		return Number(this.get('altura')) / 100;
	}),
	valorImc: computed('peso', 'altura', function() {
		const peso = Number(this.get('peso'));
		const altura = Number(this.get('alturaMetros'));
		return (peso / (altura * altura)).toFixed(2);
	}),
	idade: computed('dataNascimento', function() {
		if (!this.get('dataNascimento')) return null;
		const [ dia, mes, ano ] = this.get('dataNascimento').split('/');
		return moment().diff(`${ano}-${mes}-${dia}`, 'years');
	}),
});
