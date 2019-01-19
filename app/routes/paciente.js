import ApplicationRoute from './application';
import RSVP from 'rsvp';

export default ApplicationRoute.extend({
  model() {
    const store = this.store;
    return RSVP.hash({
      paciente: store.createRecord('paciente'),
    });
  }
});
