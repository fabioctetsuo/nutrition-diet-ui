import Controller from '@ember/controller';
import { alias, equal, bool } from '@ember/object/computed';
import { computed, get  } from '@ember/object';
import { inject } from '@ember/service';
import { next } from '@ember/runloop';
import { task, taskGroup } from 'ember-concurrency';
import moment from 'moment';
import ValidationError from '../errors/validation-error';
import { getErrorMessage } from '../utils/get-error-message';
import {
  NO_MATCHES_MESSAGE,
  OPERATION_SUCCESS_MESSAGE,
  CREATE_SUCCESS_MESSAGE,
  DEFAULT_CONFIRMATION_MESSAGE } from './constants/default-messages';

export default Controller.extend({
  // Variables and Dependencies Injection
  DEFAULT_CONFIRMATION_MESSAGE,
  showFormulario: false,
  pacientes: null,
  generos: ['Masculino', 'Feminino'], //eslint-disable-line
  paciente: alias('model.paciente'),
  flashMessages: inject(),

  // Computed and Observer Properties
  isLoading: equal('isRunning.state', 'running'),
  hasMinimumCharacters: computed('nome', function () {
    return this.get('nome') && this.get('nome.length') >= 3;
  }),
  pacienteHistoricoSorted: computed('pacienteHistorico', function () {
    const pacienteHistorico = this.get('pacienteHistorico');
    if (pacienteHistorico && pacienteHistorico.length) {
      return pacienteHistorico.toArray().sort((a, b) => {
        return moment(b.get('dataCadastro')) - moment(a.get('dataCadastro'))
      })
    }
  }),
  isValid: bool('paciente.validations.isValid'),
  isValidSearch: computed('nome', 'cpf', function () {
    const nome = this.get('nome');
    const cpf = this.get('cpf');
    if (nome) return nome && nome.length >= 3;
    else if (cpf) return cpf && cpf.length === 11;
    else return false;
  }),

  // Ember Concurrency Functions
  isRunning: taskGroup().drop(), // Criando grupo para impedir que ocorra uma concorrência de ações

  buscarPacientes: task(function * () {
    const store = this.get('store');
    const nome = this.get('nome');
    const cpf = this.get('cpf');
    const flashMessages = get(this, 'flashMessages');
    this.closeForm();
    let pacientes = null;
    try {
      if (cpf && cpf.length === 11) {
        pacientes = yield store.query('paciente', { ativo: true, cpf });
        if (!pacientes.length) flashMessages.info(NO_MATCHES_MESSAGE, { destroyOnClick: true });
        this.set('pacientes', pacientes);
      }
      else if (nome && nome.length >= 3) {
        pacientes = yield store.query('paciente', { ativo: true, nome });
        if (!pacientes.length) flashMessages.info(NO_MATCHES_MESSAGE, { destroyOnClick: true });
        this.set('pacientes', pacientes);
      }
    } catch (e) {
      flashMessages.danger(getErrorMessage(e), { destroyOnClick: true });
    } finally {
      this.set('cpf', null);
      this.set('nome', null);
    }
  }).group('isRunning'),

  showHistoricoPacienteModal: task(function * (paciente) {
    const flashMessages = get(this, 'flashMessages');
    const codigo = paciente.get('codigo');
    this.clearInvalidStorePacienteHistoricoData();
    this.set('pacienteHistorico', null);
    try {
      const historico = yield this.get('store')
        .findAll('paciente-historico', { adapterOptions: { codigo }, reload: true });
      this.set('pacienteHistorico', historico);
      this.set('showHistoricoModal', true);
    } catch (e) {
      flashMessages.danger(getErrorMessage(e), { destroyOnClick: true });
    }
  }).group('isRunning'),

  excluirPaciente: task(function * (){
    const flashMessages = get(this, 'flashMessages');
    try {
      yield this.get('paciente').destroyRecord();
      flashMessages.success(OPERATION_SUCCESS_MESSAGE, { destroyOnClick: true });
    } catch(e) {
      flashMessages.danger(getErrorMessage(e), { destroyOnClick: true });
    } finally {
      this.set('showAlertModal', false);
    }
  }).group('isRunning'),

  savePaciente: task(function * (paciente) {
    const flashMessages = get(this, 'flashMessages');
    try {
      if (!this.get('isValid')) throw new ValidationError();
      yield paciente.save();
      this.closeForm();
      flashMessages.success(CREATE_SUCCESS_MESSAGE, { destroyOnClick: true });
    } catch (e) {
      flashMessages.danger(getErrorMessage(e), { destroyOnClick: true });
    }
  }).group('isRunning'),

  // Functions
  clearForm() {
    const paciente = this.get('paciente');
    this.clearInvalidStorePacienteData();
    get(this, 'flashMessages').clearMessages();
    if (paciente) paciente.rollbackAttributes();
    this.set('paciente', this.get('store').createRecord('paciente', {}));
  },
  closeForm() {
    this.send('clearForm');
    this.set('showFormulario', false);
  },
  clearInvalidStorePacienteData() {
    const store = this.get('store');
    const pacientes = store.peekAll('paciente');
    pacientes.forEach(paciente => {
      if (!paciente.get('codigo')) store.unloadRecord(paciente);
    })
  },
  clearInvalidStorePacienteHistoricoData() {
    const store = this.get('store');
    const pacientes = store.peekAll('paciente-historico');
    pacientes.forEach(paciente => {
      store.unloadRecord(paciente);
    })
  },

  // Ember Actions
  actions: {
    clearForm() { this.clearForm(); },
    closeForm() { this.closeForm(); },
    toggleShowFormulario() {
      this.send('clearForm');
      this.toggleProperty('showFormulario');
    },
    showEditarFormulario(paciente) {
      this.set('showFormulario', true);
      get(this, 'flashMessages').clearMessages();
      next(() => {
        // Setando após o next para o componente ser inicializado corretamente antes
        this.set('paciente', paciente);
      });
    },
    showExcluirModal(paciente) {
      get(this, 'flashMessages').clearMessages();
      this.set('paciente', paciente);
      this.set('showAlertModal', true);
    },
    cancelarAction() {
      this.set('paciente', null);
      this.set('showAlertModal', false);
    },
  }
});
