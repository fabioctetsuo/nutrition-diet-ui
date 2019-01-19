@setupApplicationTest

Feature: Paciente - Consulta de Histórico

  Scenario: Consultar - Consultando histórico do paciente
    Dado que estou na tela de "paciente"
    Quando preencher o campo "filtro-cpf" com "44364541850"
    E clicar no botão "buscar-paciente"
    E acessar o historico do paciente com cpf "44364541850"
    Entao devo ver uma tabela com o registro do histórico do paciente "44364541850"
  
  Scenario: Consultar - Consultando histórico do paciente - Serviço Indisponível
    Dado que estou na tela de "paciente"
    Quando preencher o campo "filtro-cpf" com "44364541850"
    E clicar no botão "buscar-paciente"
    E acessar o historico do paciente com cpf "44364541850" e o serviço estiver indisponível
    Entao devo ver uma mensagem de erro com o texto "Serviço indisponível no momento, favor consulte novamente mais tarde."