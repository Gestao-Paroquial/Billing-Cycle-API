# Billing Cycle API

## Organização
A aplicação foi organizada em duas pastas: **api** e **config**.

### Config
Basicamente para a aplicação funcionar é necessário configurar:
- Servidor HTTP (Express)
- Rotas para a API REST (Express/Node Restful)
- Conexão com Banco de Dados (Mongoose/MongoDB).

### Api
API REST foi implementada utilizando um módulo node chamado [node-restful](https://github.com/baugarten/node-restful).

## Configuração

### Rodando com Docker

```
docker build -t billingcycleapi_app .
docker run --name database -d mongo
docker run -p 3003:3003 -d --name api --link database:database billingcycleapi_app 
```

### Sem Docker

1. Instalar os módulos do node utilizando o **npm**.
```sh
$ npm install
```

2. Inicializar a aplicação em **modo desenvolvimento** (utilizado no curso).
```sh
$ npm run dev
```

3. Inicializar a aplicação em **modo produção** (Fica a dica... :P).
```sh
$ npm run production
```
