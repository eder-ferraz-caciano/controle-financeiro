import * as express from 'express'
import { LoginController } from '../controller/auth/LoginController'
import { HookAutenticacao } from '../hook/VerifyToken'
import { ContasRouter } from './contas'
import { MovimentacaoRouter } from './movimentacao'
import { OpcaoRouter } from './opcao'
import { OpcaoItemRouter } from './opcaoItem'
import { RelacionamentoRouter } from './relacionamento'
import { UserRouter } from './user'

export class RouterController {
  constructor (app: express.Express) {
    const login = new LoginController()
    const autenticacao = new HookAutenticacao()

    new OpcaoRouter(app)
    new ContasRouter(app)
    new OpcaoItemRouter(app)
    new MovimentacaoRouter(app)
    new RelacionamentoRouter(app)

    app.post('/login', login.login)
    app.get('*', autenticacao.checkAutenticate)

    new UserRouter(app)
  }
}