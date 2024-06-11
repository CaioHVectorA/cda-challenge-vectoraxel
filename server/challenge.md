# Desafio Full Stack (Dashboard)

Desenvolver um sistema que permita aos usuários resgatar emblemas aleatórios e visualizar os emblemas já resgatados em um dashboard.

O sistema deve incluir tanto a API (backend) quanto a interface de usuário (frontend).

## Requisitos

- Autenticação de usuário, com cadastro e login utilizando email e senha

- Dashboard do usuário, após o login, o usuário deve ser redirecionado para um dashboard onde poderá ver todos emblemas que ja resgatou

- No Dashboard, deve haver um botão para resgatar um emblema aleatório, lembre-se um emblema não pode ser resgatado duas vezes pelo mesmo usuário.

- Os emblemas resgatados devem ser salvos no banco de dados e associados ao usuário.

## Restrições

- A API deve ser implementa utilizando NodeJS e NestJS

- Desenvolver a interface do usuário utilizando ReactJS.

- A API deve armazenar informações em um banco de dados. Você pode escolher o banco que achar melhor. Preferencialmente utilizamos MySQL

## Extra (Opcional)

- Permitir que o usuário edite seu perfil, adicionando informações como nome e foto de perfil

- Implementar diferentes categorias de emblemas (e.g., bronze, prata, ouro).

- Documentar os endpoints da API, utilizando por exemplo **Swagger**.

- Permitir que os usuários filtrem e pesquisem emblemas em seu dashboard.

## Critérios de Avaliação:

**Funcionalidade:** O sistema atende aos requisitos especificados, incluindo autenticação, resgate de emblemas e listagem de emblemas ja resgatados

**Código:** O código esta bem organizado e segue as melhores práticas.

**Criatividade:** Implementações adicionais ou melhorias serão valorizadas.

## Emblemas

```csv
Id,Slug,Name,Image
1,cda,Cidade Alta,https://cidadealtarp.com/imagens/challenge/cidade-alta.png
2,cda-valley,Cidade Alta Valley,https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png
3,policia,Policia do Cidade Alta,https://cidadealtarp.com/imagens/challenge/policia.png
4,hospital,Hospital do Cidade Alta,https://cidadealtarp.com/imagens/challenge/hospital.png
5,mecanica,Mecânica do Cidade Alta,https://cidadealtarp.com/imagens/challenge/mecanica.png
6,taxi,Taxi do Cidade Alta,https://cidadealtarp.com/imagens/challenge/taxi.png
7,curuja,Coruja,https://cidadealtarp.com/imagens/challenge/coruja.png
8,hiena,Hiena,https://cidadealtarp.com/imagens/challenge/hiena.png
9,gato,Gato,https://cidadealtarp.com/imagens/challenge/gato.png
10,urso,Urso,https://cidadealtarp.com/imagens/challenge/urso.png
```
