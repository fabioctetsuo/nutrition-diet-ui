@setupApplicationTest

Feature: Paciente - Edição

  Scenario: Edição - Editando paciente
    Dado que estou na tela de "paciente"
    Quando preencher o campo "filtro-cpf" com "44364541850"
    E clicar no botão "buscar-paciente"
    E clicar no botão de edição do paciente com cpf "44364541850"
    E preencher o campo "peso" com "63,00"
    E clicar no botão "salvar-paciente"
    Entao devo ver uma mensagem de sucesso
    E o campo peso do paciente "44364541850" deve ser "63,00"

  Scenario: Edição - Editando paciente
    Dado que estou na tela de "paciente"
    Quando preencher o campo "filtro-cpf" com "44364541850"
    E clicar no botão "buscar-paciente"
    E clicar no botão de edição do paciente com cpf "44364541850"
    E preencher o campo "peso" com "63,00"
    E clicar no botão "salvar-paciente" e o serviço estiver indisponível
    Entao devo ver uma mensagem de erro com o texto "Serviço indisponível no momento, favor consulte novamente mais tarde."
      
  Scenario: Edição - Editando paciente - Faltando campos obrigatórios
    Dado que estou na tela de "paciente"
    Quando preencher o campo "filtro-cpf" com "44364541850"
    E clicar no botão "buscar-paciente"
    E clicar no botão de edição do paciente com cpf "44364541850"
    E preencher o campo "peso" com " "
    E clicar no botão "salvar-paciente"
    Entao devo ver uma mensagem de erro com o texto "Preencha todos os campos obrigatórios do formulário."