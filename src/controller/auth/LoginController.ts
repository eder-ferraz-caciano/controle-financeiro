import { async, validate } from "validate.js"
import { Request, Response } from 'express'
import { Entity, getRepository, Repository } from "typeorm"
import { User } from "../../entity/User"
import * as jwt from 'jsonwebtoken'



export class LoginController {

  private validarUsuario = {
    email: { presence: true, email: true },
    senha: { presence: true, type: 'string' }
  }

  public login = async(req: Request, res: Response) => {
    try {
      // deve validar os dados da requisição
      const erro = await validate(req.body, this.validarUsuario)
      if(erro) return res.json(erro)

      // deve validar se o usuário existe
      const usuario = await getRepository(User).findOne({
        email: req.body.email,
        senha: req.body.senha,
        deletedAt: null
      })
      if(!usuario) return res.json('Usuário não existe!')

      // deve realizar o login com os dados inseridos e retornar uma key única
      const token = jwt.sign({
        data: {
          nome: usuario.nome,
          email: usuario.email,
        }
      }, <any>process.env.APP_KEY, { expiresIn: '90h' })

      // deve retornar a key única junto dos dados inseridos
      return res.json({
        token,
        payload: {
          nome: usuario.nome,
          email: usuario.email,
          isAdmin: usuario.admin
        }
      })
    } catch (error: any) {
      return res.json({ erro: error.message })
    }
  }
}