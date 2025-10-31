# 3. DOCUMENTO DE ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE

Nesta parte do trabalho você deve detalhar a documentação dos requisitos do sistema proposto de acordo com as seções a seguir. Ressalta-se que aqui é utilizado como exemplo um sistema de gestão de cursos de aperfeiçoamento.

## 3.1 Objetivos deste documento
Descrever e especificar as necessidades e requisitos para o desenvolvimento de um sistema web de venda de ingressos e snacks de cinema. O documento visa orientar o projeto, garantindo que a aplicação seja simples, intuitiva, eficiente e transparente para o usuário, além de contribuir para a otimização operacional e estratégica das empresas exibidoras.

## 3.2 Escopo do produto

### 3.2.1 Nome do produto e seus componentes principais
O produto será denominado TicketWave. Ele contará com os seguintes componentes principais:

*Módulo de Catálogo e Sessões: exibição de filmes em cartaz, horários e salas disponíveis.
*Módulo de Escolha de Assentos: seleção em tempo real dos lugares disponíveis.
*Módulo de Pagamentos: integração com Pix, cartões de crédito/débito e carteiras digitais populares.
*Módulo de Vendas de Snacks: opção para compra antecipada de produtos de bomboniere.
*Módulo de Notificações e Promoções: envio de alertas sobre estreias, promoções e lembretes de sessões.
*Módulo Administrativo: relatórios e análises de dados para apoio a marketing e gestão operacional.

### 3.2.2 Missão do produto
Proporcionar uma experiência de compra de ingressos e snacks de cinema ágil, transparente e acessível, atendendo usuários com diferentes níveis de familiaridade tecnológica e fortalecendo a gestão das empresas exibidoras. O sistema busca otimizar ocupação e receita por meio de precificação dinâmica e ferramentas de análise de dados, garantindo praticidade e confiança.

### 3.2.3 Limites do produto
*O sistema não substituirá integralmente os sistemas internos das redes de cinema (por exemplo, contabilidade ou RH).

### 3.2.4 Benefícios do produto

| # | Benefício | Valor para o Cliente |
|--------------------|------------------------------------|----------------------------------------|
|1	| Facilidade e rapidez na compra de ingressos online |	Essencial |
|2 | Transparência nos preços e taxas, reduzindo atritos na experiência | Essencial | 
|3 | Compra antecipada de snacks, evitando filas na bomboniere | Recomendável | 
|4	| Interface acessível para públicos diversos, incluindo idosos	| Essencial | 
|5	| Suporte a precificação dinâmica para otimizar ocupação e receita	| Essencial | 

## 3.3 Descrição geral do produto

### 3.3.1 Requisitos Funcionais

| Código | Requisito Funcional                | Descrição                                                                                                |
| ------ | -----------------------------      | -------------------------------------------------------------------------------------------------------- |
| RF1    | Comprar ingressos                  | Permitir ao cliente selecionar filme, horário e assento e receber o ingresso digital após o pagamento.   |
| RF2    | Comprar na Lanchonete              | Permitir ao cliente selecionar e adquirir pipoca, refrigerante, combos e outros itens junto ao ingresso. |
| RF3    | Gerenciar Meios de Pagamento       | Permitir ao estabelecimento cadastrar, visualizar, alterar e remover formas de pagamento aceitas.        |
| RF4    | Gerenciar conteúdos informacionais | O sistema deve permitir que críticos e especialistas publiquem e gerenciem conteúdos informacionais, como resenhas, análises, dicas, podcasts e resumos de filmes, de forma distinta do perfil de cliente que realiza a compra de ingressos.                                                      |
| RF5    | Gerenciar conta de cliente         | Permitir que o cliente crie, visualize, edite e exclua sua conta para um acesso mais personalizado à plataforma. |
| RF6    | Fazer login                        | Permitir que o usuário faça login na conta.                                                              |
| RF7    | Fazer logout                       | Permitir que o usuário faça logout da conta (encerre a sessão).                                          |
| RF8    | Precificar Dinamicamente           | Permitir definir regras automáticas de variação no preço dos ingressos conforme a ocupação da sala.      |
| RF9    | Avaliar Filmes                     | Permitir que os clientes atribuam notas e publiquem comentários sobre os filmes assistidos.              |
| RF10   | Gerenciar Promoções                | Permitir à gerência cadastrar, visualizar, alterar e remover promoções de ingressos e lanches.           |
| RF11   | Gerenciar Sessões                  | Permitir ao gestor de conteúdo cadastrar, visualizar, alterar e remover filmes em cartaz.                |
| RF12   | Gerenciar Fórum                    | Permitir ao cliente criar, visualizar, alterat e remover comentários em texto e vídeo sobre os filmes em um espaço de interação.  |
| RF13   | Gerenciar Contas Internas          | Permitir ao administrador criar, editar e remover contas de usuários internos e definir permissões de acesso.     |
| RF14   | Recomendar filmes por preferência  | Permitir que sejam recomendados filmes para os usuários logados na plataforma de acordo com as preferências que serão cadastradas quando o cliente criar sua conta. |
| RF15   | Comentar no Cartaz do Filme        | Permitir ao cliente publicar comentários diretamente na página/cartaz do filme em exibição, possibilitando interação e troca de opiniões entre os usuários.     |


### 3.3.2 Requisitos Não Funcionais

| Código | Requisito Não Funcional (Restrição) |
|--------------------|------------------------------------|
| RNF1 | Usabilidade - A interface deve ser intuitiva, de linguagem clara e acessível a todas as faixas etárias |
| RNF2 | Disponibilidade - O sistema deve estar sempre disponível 99% do tempo, evitando interrupções em horários críticos como finais de semana e feriados. |
| RNF3 |	Desempenho - A página deve ser carregado em no máximo 3 segundos incluindo a parte de home, escolha de sessão e pagamento. |
| RNF4 |	Segurança - Proteger dados pessoais e de pagamento dos usuários em conformidade com a LGPD |
| RNF5 |	Acessibilidade-	Permitir que pessoas com deficiência visual ou auditiva consigam usar a plataforma |

### 3.3.3 Usuários 

| Ator | Descrição |
|--------------------|------------------------------------|
| Gestor de Conteúdo |	Usuário gerente do sistema responsável pelo cadastro, edição e remoção dos filmes exibidos pelo cinema. Além disso, será responsável por gerenciar os conteúdos informacionais da plataforma. |
| Administrador de sistema |	Usuário responsável por criar contas de gestores e operadores, definir papéis e acessos e gerenciar integrações |
| Cliente |	Usuário responsável por escolher filme, sessão, poltrona, fazer o pagamento, receber e apresentar ingresso digital, consultar histórico de compras e promoções. |
| Tempo | Usuário responsável por processos automatizados no Sistema  |
| Administrador de Cinema | Usuário responsável por gerenciar sessões e promoções. |


## 3.4 Modelagem do Sistema

### 3.4.1 Diagrama de Casos de Uso
Como mostrado no diagrama da Figura 1, o Cliente poderá navegar pelos filmes, selecionar sessões, escolher poltronas e efetuar a compra de ingressos. O Administrador de Cinema será responsável por gerenciar filmes, sessões e salas, enquanto o Atendente poderá validar ingressos e auxiliar clientes. O Administrador do Sistema gerencia permissões e configurações gerais da plataforma.

#### Figura 1: Diagrama de Casos de Uso do Sistema.

<img width="664" height="840" alt="image" src="https://github.com/user-attachments/assets/a7fb6ea9-1c02-4d66-8515-a2ac309025a5" />

### 3.4.2 Descrições de Casos de Uso

#### Navegar Filmes (CSU01)

Sumário: O Cliente visualiza a lista de filmes em cartaz, com detalhes como sinopse, horários e classificação indicativa.

Ator Primário: Cliente.

Ator Secundário: —

Pré-condições: O sistema deve estar acessível.

- Fluxo Principal:

1) O Cliente acessa a página inicial. <br>
2) O Sistema exibe a lista de filmes. <br>
3) O Cliente pode visualizar detalhes de um filme específico. <br>

Fluxos de Exceção:

E1: Sistema indisponível → Exibe mensagem de erro e solicita tentar novamente.

#### Escolher Sessão e Poltrona (CSU02)

Sumário: O Cliente seleciona a sessão e poltrona desejadas para o filme escolhido.

Ator Primário: Cliente.

Pré-condições: O Cliente já navegou pelos filmes.

- Fluxo Principal:

1) O Cliente escolhe o filme e a data.
2) O Sistema apresenta as sessões disponíveis.
3) O Cliente seleciona horário e poltrona.

Fluxos de Exceção:

E1: Poltrona ocupada → O sistema informa e solicita escolha de outra poltrona.
E2: Sessão esgotada → O sistema apresenta lista de sessões alternativas.

#### Comprar Ingresso (CSU03)

Sumário: O Cliente efetua o pagamento e conclui a compra do ingresso.

Ator Primário: Cliente.

Ator Secundário: Administrador de Cinema (recebe relatório de vendas).

Pré-condições: O Cliente selecionou sessão e poltrona.

- Fluxo Principal:

1) O Cliente confirma a seleção.
2) O Sistema exibe formas de pagamento.
3) O Cliente insere os dados e confirma.
4) O Sistema valida o pagamento e envia o ingresso digital.

Fluxos de Exceção:

E1: Pagamento recusado → O sistema cancela a compra e oferece outras formas de pagamento.
E2: Conexão perdida → O sistema salva temporariamente a reserva e solicita retomada ao cliente.

#### Gerenciar Filmes (CSU04)

Sumário: O Administrador de Cinema adiciona, altera ou remove filmes do catálogo.

Ator Primário: Administrador de Cinema.

Ator Secundário: Administrador do Sistema (suporte em caso de falhas).

Pré-condições: Administrador autenticado.

- Fluxo Principal:

1) O Administrador acessa o painel de controle.
2) O Sistema exibe opções de gerenciamento.
3) O Administrador cadastra, edita ou remove filmes.

Fluxo Alternativo (4): Remoção de Filme 
a) O Administrador seleciona um filme e solicita sua remoção. 
b) Se não houver sessões futuras vinculadas, o Sistema remove o filme.

Fluxo Alternativo (5): Alteração de Filme 
a) O Administrador altera um ou mais dados do filme e confirma a alteração. 
b) O Sistema verifica a validade dos dados. 

Pós-condições: Um filme foi adicionado, removido ou atualizado.

Fluxos de Exceção:

E1: Inclusão de filme com dados incompletos ou inválidos → O sistema solicita correção antes de salvar.
E2: Tentativa de remoção de filme com sessões futuras → O sistema bloqueia a remoção e informa o motivo.
E3: Alteração com dados inválidos → O sistema reporta erro e solicita correção.

#### Gerenciar Sessões e Salas (CSU05)

Sumário: O Administrador de Cinema define horários de sessões e a disponibilidade de salas.

Ator Primário: Administrador de Cinema.

Pré-condições: Administrador autenticado.

- Fluxo Principal:

1) O Administrador seleciona um filme cadastrado.
2) O Sistema apresenta as salas disponíveis.
3) O Administrador define o horário e salva a sessão.

#### Gerenciar Usuários e Permissões (CSU06)

Sumário: O Administrador do Sistema cria e gerencia contas de administradores e atendentes.

Ator Primário: Administrador do Sistema.

Pré-condições: Acesso autorizado ao painel administrativo.

- Fluxo Principal:

1) O Administrador acessa o painel de usuários.
2) O Sistema exibe a lista de contas.
3) O Administrador cria, edita ou remove contas e define permissões.

#### Gerenciar Conteúdos Informacionais (CSU07)

Sumário: O Crítico/Especialista publica, edita ou remove conteúdos informacionais sobre os filmes.

Ator Primário: Gestor de Conteúdo
Ator Secundário: Crítico/Especialista

Pré-condições: O Gestor de Conteúdo deve estar autenticado no sistema.

- Fluxo Principal:

1) O Crítico acessa o painel de conteúdos.
2) O Sistema exibe opções para criação, edição e exclusão de conteúdos.
3) O Crítico insere ou modifica informações (resenha, análise, dica, podcast ou resumo).
4) O Sistema valida os dados e salva o conteúdo.

Fluxos de Exceção:

E1: Conteúdo incompleto ou formato incorreto → O sistema solicita correção antes de salvar.
E2: Falha no salvamento → O sistema não atualiza e exibe mensagem de erro.

#### Gerenciar Promoções (CSU08)

Sumário: O Administrador de Cinema cadastra, edita ou remove promoções de ingressos e lanches.

Ator Primário: Administrador de Cinema.

Pré-condições: O Administrador deve estar autenticado no sistema.

- Fluxo Principal:

1) O Administrador acessa o módulo de promoções.
2) O Sistema exibe a lista de promoções ativas.
3) O Administrador cadastra, altera ou remove uma promoção.
4) O Sistema valida as informações e atualiza o catálogo de promoções.

Fluxos de Exceção:

E1: Dados incompletos ou inconsistentes → O sistema solicita correção antes de salvar.
E2: Falha no salvamento → O sistema não atualiza e exibe mensagem de erro.

#### Gerenciar Fórum (CSU09)

Sumário: O Cliente cria, edita ou remove comentários em texto ou vídeo no fórum da plataforma.

Ator Primário: Cliente.

Pré-condições: O Cliente deve estar autenticado no sistema.

- Fluxo Principal:

1) O Cliente acessa o espaço de fórum.
2) O Sistema exibe os tópicos e comentários existentes.
3) O Cliente publica, edita ou remove um comentário.
4) O Sistema salva e atualiza o fórum.

Fluxos de Exceção:

E1: Comentário inadequado → O sistema bloqueia a publicação e exibe aviso.
E2: Falha no salvamento → O sistema não atualiza e exibe mensagem de erro.

#### Recomendar Filmes por Preferência (CSU10)

Sumário: O Sistema recomenda filmes ao Cliente com base em suas preferências cadastradas.

Ator Primário: Cliente.
Ator Secundário: Sistema (Tempo).

Pré-condições: O Cliente deve estar autenticado e ter informado preferências em sua conta.

- Fluxo Principal:

1) O Cliente acessa sua conta ou navega pelos filmes.
2) O Sistema identifica as preferências cadastradas.
3) O Sistema apresenta recomendações personalizadas de filmes.

Fluxos de Exceção:

E1: Preferências não definidas → O sistema exibe recomendações gerais ou solicita preenchimento.

#### Comentar no Cartaz do Filme (CSU11)

Sumário: O Cliente publica comentários diretamente na página/cartaz de um filme em exibição.

Ator Primário: Cliente.

Pré-condições: O Cliente deve estar autenticado no sistema.

- Fluxo Principal:

1) O Cliente acessa a página do filme.
2) O Sistema exibe a área de comentários.
3) O Cliente insere um comentário e confirma a publicação.
4) O Sistema salva e exibe o comentário junto aos demais.

Fluxos de Exceção:

E1: Comentário em branco ou inadequado → O sistema bloqueia a publicação e solicita correção.

### 3.4.3 Diagrama de Classes 

A Figura 2 mostra o diagrama de classes do sistema. A Matrícula deve conter a identificação do funcionário responsável pelo registro, bem com os dados do aluno e turmas. Para uma disciplina podemos ter diversas turmas, mas apenas um professor responsável por ela.

#### Figura 2: Diagrama de Classes do Sistema.
 
<img width="700" alt="Diag  Classes Ticketwave (4)" src="https://github.com/user-attachments/assets/13035199-4434-4d47-b1d1-54c410e8f43d" />



### 3.4.4 Descrições das Classes 

| # | Nome | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| 1	|	Cliente |É o usuário do sistema que navega pelos filmes em cartaz, seleciona sessões e compra ingressos. É o ator principal dos casos de uso de navegação, reserva e compra. |
| 2	| Filme |	Representa os filmes que estão em cartaz no cinema. É responsável por armazenar e disponibilizar as informações básicas, como título, gênero, sinopse e classificação. Um filme pode ter várias sessões associadas |
| 3 |	Pagamento |	É o meio de pagamento utilizado pelo usuário para realizar um pedido e adquirir os seus ingressos e snacks. |
| 4 |	Sessao | Representa uma exibição específica de um filme, em uma data, horário e sala definidos. Uma sessão contém zero ou mais ingressos. |
| 5	|	Ingresso |	É o bilhete utlizado de fato pelo cliente para entrar em uma sessão. Está vinculado a um pedido também, já que um ingresso é adquirido. |
| 6 | NotaFiscal | É o comprovante de pagamento enviado ao cliente e ao governo, de acordo com a legislação brasileira. Cada pedido contém exatamente uma nota fiscal. |
| 7 | Snack | Representa cada um dos itens que estão disponíveis para serem adquiridos na lanchonete do cinema. |
| 8 | Pedido | Representa cada compra feita por um cliente, que pode ter 1 ou mais itens (ingressos ou snacks). |
| 9 | ItemPedido | É cada um dos produtos que foram adquiridos em um pedido. Podem ser ingressos ou snacks. |

