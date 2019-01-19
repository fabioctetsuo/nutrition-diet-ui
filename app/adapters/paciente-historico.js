import PacienteAdapter from './paciente';
import PacienteModel from '../models/paciente';

const pacienteModelName = PacienteModel.modelName;

export default PacienteAdapter.extend({
  urlForFindAll(modelName, snapshot) {
    // pacientes/:codigo/historicos
    const baseUrl = this._super(pacienteModelName, snapshot);
    const { codigo } = snapshot.adapterOptions;
    return `${baseUrl}/${codigo}/historicos`;
  },
});
