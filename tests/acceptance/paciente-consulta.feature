@setupApplicationTest

Feature: Paciente - Consulta

  Scenario: Consultar - Entrando na Tela de Paciente
    Dado que estou na tela de "paciente"
    Entao o campo "filtro-nome" deve existir na tela
    E o campo "filtro-cpf" deve existir na tela
    E o botão "buscar-paciente" deve existir no formulário
    E o botão "novo-paciente" deve existir no formulário
  
  Scenario: Consultar - Consulta por nome de paciente cadastrado
    Dado que estou na tela de "paciente"
    Quando preencher o campo "filtro-nome" com "Fabio"
    E existem registros com o nome "Fabio" na base de pacientes
    E clicar no botão "buscar-paciente"
    Entao devo ver uma tabela com o registro dos pacientes com o nome "Fabio"
    
  Scenario: Consultar - Consulta por nome de paciente não cadastrado
    Dado que estou na tela de "paciente"
    Quando preencher o campo "filtro-nome" com "José"
    E não existem registros com o nome "José" na base de pacientes
    E clicar no botão "buscar-paciente"
    Entao devo ver uma mensagem de informação com o texto "Não foram encontrados resultados para essa consulta."

  Scenario: Consultar - Consulta por CPF de paciente cadastrado
    Dado que estou na tela de "paciente"
    Quando preencher o campo "filtro-cpf" com "44364541850"
    E existem registros com o cpf "44364541850" na base de pacientes
    E clicar no botão "buscar-paciente"
    Entao devo ver uma tabela com o registro dos pacientes com o cpf "44364541850"
    
  Scenario: Consultar - Consulta por CPF de paciente não cadastrado
    Dado que estou na tela de "paciente"
    Quando preencher o campo "filtro-cpf" com "12345678900"
    E não existem registros com o cpf "12345678900" na base de pacientes
    E clicar no botão "buscar-paciente"
    Entao devo ver uma mensagem de informação com o texto "Não foram encontrados resultados para essa consulta."
    
  Scenario: Consultar - Consulta de paciente - Serviço Indisponível
    Dado que estou na tela de "paciente"
    Quando preencher o campo "filtro-nome" com "Fabio"
    E clicar no botão "buscar-paciente" e o serviço estiver indisponível
    Entao devo ver uma mensagem de erro com o texto "Serviço indisponível no momento, favor consulte novamente mais tarde."