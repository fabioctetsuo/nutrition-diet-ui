@setupApplicationTest

Feature: Paciente - Excluir

  Scenario: Excluir - Excluindo paciente
    Dado que estou na tela de "paciente"
    Quando preencher o campo "filtro-cpf" com "44364541850"
    E clicar no botão "buscar-paciente"
    E clicar no botão de excluir o paciente com cpf "44364541850"
    E clicar no botão "confirmar-exclusao"
    Entao devo ver uma mensagem de sucesso
  
  Scenario: Excluir - Excluindo paciente - Sistema indisponivel
    Dado que estou na tela de "paciente"
    Quando preencher o campo "filtro-cpf" com "44364541850"
    E clicar no botão "buscar-paciente"
    E clicar no botão de excluir o paciente com cpf "44364541850"
    E clicar no botão "confirmar-exclusao" e o serviço estiver indisponível
    Entao devo ver uma mensagem de erro com o texto "Serviço indisponível no momento, favor consulte novamente mais tarde."

  Scenario: Excluir - Excluindo paciente - Cancelando Exclusão
    Dado que estou na tela de "paciente"
    Quando preencher o campo "filtro-cpf" com "44364541850"
    E clicar no botão "buscar-paciente"
    E clicar no botão de excluir o paciente com cpf "44364541850"
    E clicar no botão "cancelar-exclusao"
    Entao não devo ver nenhum modal aberto