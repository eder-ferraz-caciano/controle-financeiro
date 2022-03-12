// import { LoginController } from '@/controller/auth/LoginController'
// import { HookAutenticacao } from '@/hook/VerifyToken'
// import { LoginController } from 'controller/auth/LoginController'
import * as express from 'express'
import { LoginController } from '../controller/auth/LoginController'
import { HookAutenticacao } from '../hook/VerifyToken'
// import { HookAutenticacao } from 'hook/VerifyToken'
import { OpcaoRouter } from './opcao'
import { OpcaoItemRouter } from './opcaoItem'
import { UserRouter } from './user'

export class RouterController {
  constructor (app: express.Express) {
    const login = new LoginController()
    const autenticacao = new HookAutenticacao()

    new OpcaoRouter(app)
    new OpcaoItemRouter(app)

    app.post('/login', login.login)
    app.get('*', autenticacao.checkAutenticate)

    new UserRouter(app)
  }
}