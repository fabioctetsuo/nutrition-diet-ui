import paciente from './routes/paciente';

export default function() {
  this.passthrough('/write-coverage');

  paciente(this);
}
