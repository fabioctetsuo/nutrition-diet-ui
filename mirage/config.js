import paciente from './routes/paciente';
import fator from './routes/fator';
import dieta from './routes/dieta';

export default function() {
  this.passthrough('/write-coverage');

  paciente(this);
  fator(this);
  dieta(this);
}
