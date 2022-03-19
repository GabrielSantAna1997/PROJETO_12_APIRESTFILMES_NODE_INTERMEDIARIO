Você foi contratado para integrar equipe de desenvolvimento da "Godzilla Local Filmes” uma empresa de locadora de filmes que só aluga filmes da saga Gojira e devido à grande procura só é permitido que um cliente alugue um filme de cada vez. Com isso você ficou responsável por criar uma API REST que gerencie uma lista de filmes para Godzilla Local Filmes, de modo que tarefas como, busca por titulo ou ano, aluguel, e consultas de filmes possam ser realizadas pelo usuário.

Crie um banco de dados, que armazena os filmes alugados e os usuários. Esse banco deve garantir a unicidade, ou seja, apenas 1 registro por aluguel ou usuário


Teste 1 :
Você deve disponibilizar um endpoint para a visualização dos filmes e suas disponibilidades "/filmes/lista". Criar um endpoint para alugar um filme "/filmes/alugar", esse serviço permite o aluguel de um filme somente se a locadora possuir este filme em estoque e o usuário não tiver alugado outro filme.
Caso o aluguel do filme escolhido seja permitido, você deve retornar HTTP 200-OK, caso contrário um HTTP 403-FORBIDDEN.

Teste 2: 
Só será possível alugar um filme se o usuário estiver autenticado.

Teste 3 :
Você deve disponibilizar um endpoint "/user/lista" e "/filmes/lista" para a visualização de todos os usuários e filmes cadastrado no banco.

Teste 4 :
Disponibilize um serviço extra de usuários, no qual permita incluir um novo cliente “usuários/usuário” que responde um HTTP POST e ao realizar a autenticação do usuário,deve retornar um Token para ser utilizado nas próximas requisições.



 var _.base_url = localhost.


>
#### ROTAS USUARIOS

*{{ _.base_url }}/auth/register*

### Body
| Nome         | Exemplo de valor retornado                                                             |
| ------------ | ------------------------------------------------------------------------------------   |
| `name`       | Parâmetro obrigatório.<br>Ex:   `Gabriel Santana`                                      |
| `email`      | Parâmetro obrigatório.<br>Ex:   `gabrielsantana@gmail.com`                             |
| `password`   | Parâmetro obrigatório.<br>Ex:   `123456789`                                            |

### Retornos
| Nome         | Exemplo de valor retornado                                                             |
| ------------ | ------------------------------------------------------------------------------------   |
| `name`        | Retorna o nome o usuario.<br>Ex:          `Gabriel Santana`                            |
| `email`      | Retorna o email do usuario.<br>Ex:        `gabrielsantana@gmail.com`                   |
| `id`         | Retorna o id do usuario.<br>Ex:           `6236135b50d32a3b183b0732`                   |
| `createdAt`  | Retorna o a data quando foi criado.<br>Ex: `2022-03-19T17:31:07.755Z`                  |
| `token`      | Retorna um token para autenticação.<br>Ex: `sInR5cCI6IkpXVCJ...`                       |



*{{ _.base_url }}/auth/authenticate*

### Body
| Nome         | Exemplo de valor retornado                                                             |
| ------------ | ------------------------------------------------------------------------------------   |
| _email_      | Parâmetro obrigatório.<br>Ex:   `gabrielsantana@gmail.com`                             |
| _password_   | Parâmetro obrigatório.<br>Ex:   `123456789`                                            |

### Retornos
| Nome         | Exemplo de valor retornado                                                             |
| ------------ | ------------------------------------------------------------------------------------   |
| _id_         | Retorna o id do usuario.<br>Ex:           `6236135b50d32a3b183b0732`                   |
| _name_       | Retorna o nome o usuario.<br>Ex:          `Gabriel Santana`                            |
| _email_      | Retorna o email do usuario.<br>Ex:        `gabrielsantana@gmail.com`                   |
| _token_      | Retorna um token autenticado.<br>Ex:      `sInR5cCI6IkpXVCJ...`                        |



*{{ _.base_url }}/user/lsita*

### Body não necessários

### Retornos
| Nome         | Exemplo de valor retornado                                                             |
| ------------ | ------------------------------------------------------------------------------------   |
| _id_         | Retorna o id do usuario.<br>Ex:           `6236135b50d32a3b183b0732`                   |
| _name_       | Retorna o nome o usuario.<br>Ex:          `Gabriel Santana`                            |
| _email_      | Retorna o email do usuario.<br>Ex:        `gabrielsantana@gmail.com`                   |
| _createdAt_  | Retorna o a data quando foi criado.<br>Ex: `2022-03-19T17:31:07.755Z`                  |

>





>
#### ROTAS FILMES

*{{ _.base_url }}/filmes/register*

### Body
| Nome         | Exemplo de valor retornado                                                             |
| ------------ | ------------------------------------------------------------------------------------   |
| _id_         | Parâmetro obrigatório.<br>Ex:   `1`                                                    |
| _titulo_     | Parâmetro obrigatório.<br>Ex:   `Godizilla`                                            |
| _diretor_    | Parâmetro obrigatório.<br>Ex:   `tkao okawara `                                        |
| _ano_        | Parâmetro obrigatório.<br>Ex:   `2000-01-01T00:00:00.000Z `                            |
| _estoque_    | Parâmetro obrigatório.<br>Ex:   `5`                                                    |


### Retornos
| Nome         | Exemplo de valor retornado                                                             |
| ------------ | ------------------------------------------------------------------------------------   |
| _id_         | Retorna o ID do filme.<br>Ex:      `1`                                                 |
| _titulo_     | Retorna o o titulo do filme.<br>Ex:   `Godizilla`                                      |
| _diretor_    | Retorna o diretor do filme.<br>Ex:   `tkao okawara `                                   |
| _ano_        | Retorna o ano do filme.<br>Ex:   `2000-01-01T00:00:00.000Z `                           |
| _alugado_    | Retorna se o filme já foi alugado.<br>Ex:   `[]`                                       |
| _estoque_    | Retorna quantidade de filmes em estoque.<br>Ex:   `5`                                  |



*{{ _.base_url }}/filmes/lista*

### Body não necessários

### Retornos
| Nome         | Exemplo de valor retornado                                                             |
| ------------ | -----------
-------------------------------------------------------------------------   |
| _id_         | Retorna o id do usuario.<br>Ex:           `6236135b50d32a3b183b0732`                   |
| _name_       | Retorna o nome o usuario.<br>Ex:          `Gabriel Santana`                            |
| _email_      | Retorna o email do usuario.<br>Ex:        `gabrielsantana@gmail.com`                   |
| _createdAt_  | Retorna o a data quando foi criado.<br>Ex: `2022-03-19T17:31:07.755Z`                  |

>





>
#### ROTAS ALUGAR

*{{ _.base_url }}/filmes/alugar/:_id*

### Body
| Nome         | Exemplo de valor retornado                                                             |
| ------------ | ------------------------------------------------------------------------------------   |
| _User_       | Parâmetro obrigatório.<br>Ex:   `6236251478469646238d42c7`                             |

### Header
| Autorization | <br>Ex: Bearer `eyJhbGcfJi-RBQbaI...`                                                  |

### Retornos
| Nome         | Exemplo de valor retornado                                                             |
| ------------ | ------------------------------------------------------------------------------------   |
| _message_    | Retorna o valor se foi alugado.<br>Ex:      `Alugado`                                  |
>

