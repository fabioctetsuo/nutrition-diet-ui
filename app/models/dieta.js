import DS from 'ember-data';
import { computed } from '@ember/object';
import { calculoMasculinoTMB, calculoFemininoTMB } from '../utils/calculo-tmb';

export default DS.Model.extend({
  paciente: DS.belongsTo('paciente'),
  fatorAtividade: DS.belongsTo('fator-atividade'),
  fatorTermico: DS.belongsTo('fator-termico'),
  hasFatorInjuria: DS.attr('boolean'),
  fatorInjuria: DS.attr('number'),

  taxaMetabolicaBasal: computed('paciente', function () {
    const paciente = this.get('paciente');
    if (paciente.get('sexo') === 'Masculino') {
      return calculoMasculinoTMB(paciente.get('peso'), paciente.get('altura'), paciente.get('idade'));
    }
    else if (paciente.get('sexo') === 'Feminino') {
      return calculoFemininoTMB(paciente.get('peso'), paciente.get('altura'), paciente.get('idade'));
    }
    return null;
  }),
  gastoEnergeticoTotal: computed(
    'paciente',
    'fatorAtividade',
    'fatorTermico',
    'fatorInjuria',
    function () {
      const fA = this.get('fatorAtividade.valor') ? this.get('fatorAtividade.valor') : 1;
      const fT = this.get('fatorTermico.valor') ? this.get('fatorTermico.valor') : 1;
      const fI = this.get('fatorInjuria') ? this.get('fatorInjuria') : 1;
      return (this.get('taxaMetabolicaBasal') * fA * fT * fI).toFixed(2);
    }
  )
});
