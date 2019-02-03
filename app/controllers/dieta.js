import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import {
  NO_MATCHES_MESSAGE,
  OPERATION_SUCCESS_MESSAGE,
  CREATE_SUCCESS_MESSAGE,
  DEFAULT_CONFIRMATION_MESSAGE } from './constants/default-messages';

export default Controller.extend({
  //Attributes
  NO_MATCHES_MESSAGE,
  dieta: alias('model.dieta'),
  paciente: alias('model.dieta.paciente'),
  fatorAtividade: alias('model.dieta.fatorAtividade'),
  fatorTermico: alias('model.dieta.fatorTermico'),

  // Ember Concurrency Functions
  buscarPacientes: task(function * (nome) {
    const store = this.get('store');
    yield timeout(1500);
    const pacientes = yield store.query('paciente', { ativo: true, nome });
    return pacientes;
  }),

  //Computed and Observable Functions
  hasPaciente: computed('paciente', function () {
    if (this.get('paciente.codigo')) return false;
    return true;
  }),

  //Functions
  clearForm() {
    this.set('fatorAtividade', null);
    this.set('fatorTermico', null);
    this.set('dieta.fatorInjuria', null);
  },

  // Ember Actions
  actions: {
    changePaciente(paciente) {
      this.set('paciente', paciente);
      this.clearForm();
    },
    changeFator(value) {
      this.set('dieta.hasFatorInjuria', value);
      if (!value) this.set('dieta.fatorInjuria', null);
    },
    showFatorInjuriaModal() {
      this.set('showFatorInjuriaModal', true);
    },
  }
});
