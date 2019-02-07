import pacientes from './pacientes';
import fatoresAtividades from './fator-atividades';
import fatoresTermicos from './fator-termicos';

export default [
  {
    id: '1',
    paciente: pacientes[0],
    fatorAtividade: fatoresAtividades[0],
    fatorTermico: fatoresTermicos[0],
    hasFatorInjuria: false,
    taxaMetabolicaBasal: 1522.02,
    gastoEnergeticoTotal: 1522.02,
    dataCadastro: '2019-01-20T13:00:00+00:00'
  },
  {
    id: '2',
    paciente: pacientes[0],
    fatorAtividade: fatoresAtividades[0],
    fatorTermico: fatoresTermicos[0],
    hasFatorInjuria: false,
    taxaMetabolicaBasal: 1522.02,
    gastoEnergeticoTotal: 1522.02,
    dataCadastro: '2019-01-24T13:00:00+00:00'
  },
  {
    id: '3',
    paciente: pacientes[1],
    fatorAtividade: fatoresAtividades[0],
    fatorTermico: fatoresTermicos[0],
    hasFatorInjuria: false,
    taxaMetabolicaBasal: 1213.74,
    gastoEnergeticoTotal: 1213.74,
    dataCadastro: '2019-01-20T13:00:00+00:00'
  },
];
