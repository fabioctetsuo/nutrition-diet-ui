import ApplicationRoute from './application';
import RSVP from 'rsvp';

export default ApplicationRoute.extend({
  model() {
    const store = this.store;
    return RSVP.hash({
      dieta: store.createRecord('dieta'),
      fatorAtividades: store.query('fatorAtividade', { codigoFator: '1', ativo: true }),
      fatorTermicos: store.query('fatorTermico', { codigoFator: '2', ativo: true }),
    });
  }
});
