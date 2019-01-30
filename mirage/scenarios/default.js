export default function(server) {
  server.loadFixtures('pacientes');
  server.loadFixtures('paciente-historicos');
  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.createList('post', 10);
}
