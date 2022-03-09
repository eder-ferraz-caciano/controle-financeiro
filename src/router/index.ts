import express from 'express'
import { LoginController } from '../controller/auth/LoginController'
import { HookAutenticacao } from '../hook/VerifyToken'
import { UserRouter } from './user'

export class RouterController {
  constructor (app: express.Express) {
    const login = new LoginController()
    const autenticacao = new HookAutenticacao()

    app.post('/login', login.login)
    app.get('*', autenticacao.checkAutenticate)

    new UserRouter(app)
  }
}