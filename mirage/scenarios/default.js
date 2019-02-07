export default function(server) {
  server.loadFixtures('pacientes');
  server.loadFixtures('paciente-historicos');
  server.loadFixtures('fatores');
  server.loadFixtures('dietas');
}
