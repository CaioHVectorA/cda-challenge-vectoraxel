# CDA Challenge - Caio Henrique

Esse é meu projeto para o desafio para a vaga de desenvolvedor FullStack no CidadeAlta. Nele, foi usado a Seguinte stack:
- Front: NextJS, ReactJS, Tailwind, ShadcnUI
- Backend: NestJS(a base de express), Prisma
- Banco de dados MySQL

## Como rodar o projeto
Para rodar o projeto, você precisa, inicialmente, ter o Node instalado e um banco de dados MySQL a disposição. Após isso, siga os passos abaixo:
- Clone o repositório
- Agora você deve adicionar as variáveis de ambiente. Entre na pasta de frontend e note que há um arquivo `.env.example`. Copie o conteúdo dele e crie um arquivo `.env.local` com o mesmo conteúdo. Faça o mesmo para a pasta de backend. Após adicionar um DATABASE_URL, prossiga para o próximo passo:
- Você vai se deparar com uma pasta para o backend e outra para o frontend. Antes de entrar em cada uma, você pode rodar `npm run dev` para instalar as dependências, trabalhar nas migrations(você deve ter setado o DATABASE_URL!), fazer o seed e o build em ambos.(Isso pode demorar um minuto).
- Agora, você pode rodar as aplicações. Splitte o terminal e entre nas pastas. No frontend, você pode rodar um npm run dev ou npm start e no backend, um npm run start:dev ou npm start:prod.
- E é só isso! O backend está rodando na porta 3333 e o frontend na 3000.

## O que foi feito
- Autenticação, login e registro.
Utilizando recrusos do ecossistema nestjs para gerar tokens JWT e proteger rotas. No lado do frontend foi utilizado um custom hook para gerenciar a token salvada como um cookie seguido de um hook tal que utiliza o custom hook internamente para fazer as requisições autenticado com uma DX melhor. A token é devolvida durante registro e login.
- Emblemas: Relação Many to Many, level, seed, sistema aleatório
Para a implementação do sistema de emblemas, foi criado uma relação many to many entre os usuários e os emblemas. Além disso, Uma vez que os dados dos emblemas não eram inseridos manualmente, foi criado um seed para popular a tabela. Nesse sentido, não foi muito difícil implementar o sistema de níveis(bronze, prata ouro) e o sistema de emblemas aleatórios, que você pode encontrar na função `getRandomBadgeAlgorithm.ts`(note que o algoritmo adiciona o aspecto de raridade, e você pode demorar pra conseguir um emblema d' ouroa).
- Página de usuários que contem dado emblema.
No backend, foi criado um endpoint que retorna todos os usuários que possuem um certo emblema a partir do seu slug. No frontend, foi criado uma página que consome esse endpoint e exibe os usuários em ordem de data de obtenção do emblema.
- Edição de perfil
Foi criado um endpoint para edição de perfil, que é protegido por autenticação. No frontend, o usuário pode editar sua foto, tal que é armazenada como arquivo no backend e seu nome de usuário, que é armazenado no banco de dados.
- Entre muitos outros!

## Swagger
Para acessar a documentação da API, você pode acessar a rota `/api` no backend. Lá você vai encontrar todas as rotas, seus métodos e parâmetros.

## O que poderia ser feito e como?
Antes de tudo, gostaria de enfatizar que gostei muito de trabalhar na solução, porém, infelizmente, não tive tempo efetivo(na verdade construi tudo em 3 dias) para implementar tudo que gostaria. Entretanto, aqui estão algumas de minhas ideias e como eu as implementaria:
- Pesquisa e filtro
Para pesquisa e filtro, eu teria que decidir entre fazer essa organização via backend ou via frontend. Se fosse pelo frontend, seria nada mais nada menos que gerenciamento de estado e filtragem de arrays, algo que eu já fiz em vários outros projetos. Se fosse pelo backend, eu teria que criar um endpoint que aceitasse query params e retornasse os usuários filtrados. Pela minha experiência e prezando a UX, eu faria pelo frontend.
- Roleta de emblemas
Ao invés de ser um dialog que aparece quando você clica no botão, eu faria um visual mais agradável e interativo, como uma roleta ou algo semelhante que pararia no emblema adquirido em questão. Iria ser bem agradável e tornaria a experiência mais divertida e até mesmo viciante. Para isso, eu acredito que a forma mais fácil é manter o backend da forma que está e simplesmente fazer um componente no frontend que depois de dado timeout para no item que foi adquirido. Seria uma adição bem legal.
- Ranking geral
Um ranking geral seria algo bem legal, onde os usuários seriam rankeados de acordo com a quantidade de emblemas que possuem. Para isso, eu teria que criar um endpoint que retornasse os usuários ordenados por quantidade de emblemas com pesos, algo que não é muito difícil de fazer. No frontend, eu teria que consumir esse endpoint e exibir os usuários em ordem de ranking. 

## Considerações finais
Gostei muito de trabalhar nesse projeto e acredito que ele é um bom exemplo do que eu posso fazer, ainda que posso garantir que tenho muito mais a oferecer. Agradeço a oportunidade e espero que gostem do que foi feito. Qualquer dúvida, estou a disposição para responder. Obrigado!
email: caihebatista@gmail.com
github: caiohvectora
linkedin: https://www.linkedin.com/in/caio-henrique-oliveira-batista-74608b23b/