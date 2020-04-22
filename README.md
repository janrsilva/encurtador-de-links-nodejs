### Encurtador de Links - nodejs

Essa solução é resultado de um desafio proposto por um processo seletivo.

O roteiro de trabalho e priorização podem ser vistam em [PLANEJAMENTO.md](docs/1-PLANEJAMENTO.md)
As informações técnicas sobre a solução, podem ser vistas em [SOLUCAO.md](docs/2-SOLUCAO.md)

### Como executar o projeto?

- criar um arquivo .env criando uma cópia do .env.example

#### sem docker
```bash
$ npm i
```

```bash
$ npm run dev
```
##### requisitos
- possuir o node vLTS (12.16.2) instalado, versão anteriores poderão funcionar, mas não foi testado;
- possuir um mongodb para conexão;

#### doker docker
```bash
$ docker-compose up #para acompanhar o log
```
ou
```bash
$ docker-compose up -d #para executar sem acompanhar o log
```
##### requisitos
- possuir o docker vLTS instalado

### Como executar os testes?

```bash
$ npm run jest
```
ou
```bash
$ docker-compose exec app npm run jest
```
