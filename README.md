# TrackHack

O código presente no diretório visualizado se trata da resolução da matéria de Estágio Supervisionado, no qual foi proposto como ideia desenvolver um sistema capaz de captar variáveis como nível de luz e quais motores estão ligados dentro de uma área rural com permissão de acesso a apenas a rede local.

Tendo sido desenvolvido no presente estado atual com o ambiente de produção em NodeJs, utilizando Javascript, com bibliotecas e superconjuntos como React e Typescript, além de frameworks e ferramentas como Express e Prisma.


# Frontend

Atualmente consiste em duas páginas, **Login** e **UserHome**.
- A página Login é responsável por:
	- Login de um usuário cadastrado e gera um token de acesso, nos seguintes parâmetros:
		> 	Nome;
		> Senha.
	- Registra um usuário novo, nos seguintes parâmetros:
		> Nome;
		> Senha;
		> Confirmação de senha.
- A página UserHome é responsável por:
	> Exibir nome e tempo de duração do token;
	> Possibilitar a inserção de uma imagem para a conta.

# Backend

Atualmente o backend esta criando 4 rotas com um servidor em Javascript utilizando o framework Express, sendo elas:
- /api/cadastro:
	> Utiliza o método *POST*, envia os dados inseridos pelo usuário no formulário de cadastro do frontend e convertendo o valor 'Javascript' com o método *JSON.Stringify* para o backend. Com os dados a disposição, um ID gerado aleatoriamente com o método *Math.Random()*, e a senha informada passa por um processo de 'hashficação' com a biblioteca *bcrypt*, assim após o processamento dos dados um novo usuário é criado com os novos valores. Também é feita uma verificação se o ID gerado já é existente no BD por *findUnique* do Prisma, caso seja existente o usuário deve tentar realizar cadastro novamente.
- /api/login;
	> Utiliza o método *POST*, envia os dados inseridos pelo usuário no formulário de login do frontend e convertendo o valor 'Javascript' com o método *JSON.Stringify* para o backend. Com os dados a disposição, o nome é utilizado como parâmetro de pesquisa no BD com *findFirst* para encontrar o primeiro usuário no fluxo seguindo o valor passado, caso não encontre retorna um erro, caso encontre, 'hashfica' a senha que foi informada da mesma forma que anteriormente e compara o resultado com o valor presente no BD, caso sejam iguais, cria um token usando *jsonwebtoken* seguindo uma chave com um tempo e validade de 15 minutos, que é contabilizado após login, após sucesso da operação o token, o tempo de expiração e tempo de login, o userId são salvos no browser com a propriedade *localStorage*.
- /api/userinfo;	
	> Utiliza o método *POST*,  envia o dado Token no header e envia UserId presente no browser do frontend e convertendo o valor 'Javascript' com o método *JSON.Stringify* para o backend. Tendo o ID utilizado por *findUnique*, retorna a veracidade da existência do usuário dentro do BD, e sempre quando utilizada a rota também faz a validação do token seguindo a mesma chave ja definida.
- /api/user/profile-image.
	> Utiliza o método *POST*, para enviar a imagem disposta pelo usuário em formato jpg, jpeg ou png para o backend, onde a mesma é salva utilizando uma API do Cloudinary, assim tendo a imagem visualizada a partir do link resultante do processamento da imagem, e salvando o resultado no BD, e sempre quando utilizada a rota também faz a validação do token seguindo a mesma chave ja definida.
