import paciente from './routes/paciente';
import fator from './routes/fator';

export default function() {
  this.passthrough('/write-coverage');

  paciente(this);
  fator(this);
}
