// import { Opcao } from '@/entity/Opcao'
// import { OpcaoItem } from '@/entity/OpcaoItem'
// import getUser from '@/hook/GetUserToken'
// import { Opcao } from 'entity/Opcao'
// import { OpcaoItem } from 'entity/OpcaoItem'
import { Request, Response } from 'express'
// import getUser from 'hook/GetUserToken'
import { getRepository, getTreeRepository } from "typeorm"
import { validate } from 'validate.js'
import { Opcao } from '../entity/Opcao'
import { OpcaoItem } from '../entity/OpcaoItem'
import getUser from '../hook/GetUserToken'

export class OpcaoItemController {

  private validarOpcaoItem = {
    codigo: { presence: true, type: 'number' },
    descricao: { presence: true, type: 'string'},
    opcaoId: { presence: true, type: 'number' }
  }

  public listar = async(req: Request, res: Response) => {
    try {
      // deve filtrar os itens
      let sql = `
                SELECT opcao_item.id
                     , codigo
                     , descricao
                     , opcao_item.opcaoId
                     , opcao.descricao as opcaoDescricao
                  FROM opcao_item
                  LEFT
                  JOIN opcao
                    ON opcao_item.opcaoId = opcao.id
                 WHERE opcao_item.deletedAt is null `

      if(req.query.id && Number(req.query.id)) sql += `and opcao_item.id in (${req.query.id})`
      if(req.query.codigo && Number(req.query.codigo)) sql += `and codigo in (${req.query.codigo})`
      if(req.query.descricao) sql += `and descricao like '%${req.query.descricao}%'`
      if(req.query.opcaoId && Number(req.query.opcaoId)) sql += `and opcao_item.opcaoId in (${req.query.opcaoId})`
      const lista = await getRepository(OpcaoItem).query(sql)

      // deve retornar o resultado
      return res.json(lista)
    } catch (error) {
      return res.json({ erro: error.message })
    }
  }

  public exibir = async(req: Request, res: Response) => {
    try {
      // deve validar se o item existe
      const opcaoItem = await getRepository(OpcaoItem).findOne({
        id: parseInt(req.params.id),
        deletedAt: null
      })
      if(!opcaoItem) return res.json('Item da opção não existe!')

      // deve realizar a pesquisa
      let sql = `
                SELECT opcao_item.id
                     , codigo
                     , descricao
                     , opcao_item.opcaoId
                     , opcao.descricao as opcaoDescricao
                  FROM opcao_item
                  LEFT
                  JOIN opcao
                    ON opcao_item.opcaoId = opcao.id
                 WHERE opcao_item deletedAt is null `

      if(req.params.id) sql += `and opcao_item.id = ${req.params.id}`
      const lista = await getRepository(OpcaoItem).query(sql)

      // deve retornar o resultado
      return res.json(lista)
    } catch (error) {
      return res.json({ erro: error.message })
    }
  }

  public incluir = async(req: Request, res: Response) => {
    try {
      // deve validar os dados da requisição
      const erro = await validate(req.body, this.validarOpcaoItem)
      if(erro) return res.json(erro)

      // deve verificar se o item já foi inserido
      const opcaoItem = await getRepository(OpcaoItem).findOne({
        codigo: req.body.codigo,
        descricao: req.body.descricao,
        opcaoId: req.body.opcaoId,
        deletedAt: null
      })
      if(opcaoItem) return res.json('Item já existe!')

      // deve validar se a opção existe
      const opcao = await getRepository(Opcao).findOne({
        id: req.body.opcaoId,
        deletedAt: null
      })
      if(!opcao) return res.json('Essa opção não existe!')

      // deve inserir
      const addOpcaoItem = await getRepository(OpcaoItem).create({
        codigo: req.body.codigo,
        descricao: req.body.descricao,
        opcaoId: req.body.opcaoId,
        createdBy: await getUser(req)
      })

      // deve salvar
      await getRepository(OpcaoItem).save(addOpcaoItem)

      // deve retornar o resultado
      return res.json('Item inserido com sucesso!')
    } catch (error) {
      return res.json({ erro: error.message })
    }
  }

  public alterar = async(req: Request, res: Response) => {
    try {
      // deve validar os dados da requisição
      const erro = await validate(req.body, this.validarOpcaoItem)
      if(erro) return res.json(erro)

      // deve validar se o item existe
      const opcaoItem: any = await getRepository(OpcaoItem).findOne({
        id: parseInt(req.params.id),
        deletedAt: null
      })
      if(!opcaoItem) return res.json('Item não existe!')

      // deve validar se a opção existe
      const opcao = await getRepository(Opcao).findOne({
        id: req.body.opcaoId,
        deletedAt: null
      })
      if(!opcao) return res.json('Opção não existe!')

      // deve validar se o item já foi inserido
      const unqOpcaoItem = await getRepository(OpcaoItem).findOne({
        codigo: req.body.codigo,
        descricao: req.body.descricao,
        opcaoId: req.body.opcaoId,
        deletedAt: null
      })
      if(unqOpcaoItem) return res.json('Item já foi inserido!')

      // deve adicionar a requisição a uma variável
      let auxOpcaoItem = { ...req.body }

      // deve adicionar mais dados a variável
      auxOpcaoItem.updatedBy = await getUser(req)

      // deve alterar o item
      await getRepository(OpcaoItem).update(opcaoItem.id, auxOpcaoItem)

      // deve retornar o resultado
      return res.json('Item alterado com sucesso!')
    } catch (error: any) {
      return res.json({ erro: error.message })
    }
  }

  public excluir = async(req: Request, res: Response) => {
    try {
      // deve validar se o item existe
      const opcaoItem = await getRepository(OpcaoItem).findOne({
        id: parseInt(req.params.id),
        deletedAt: null
      })
      if(!opcaoItem) return res.json('Item não existe ou já foi excluído!')

      // deve excluir o item
      const delOpcaoItem = await getTreeRepository(OpcaoItem).softRemove(opcaoItem)
      delOpcaoItem.deletedBy = getUser(req)

      // deve retornar o resultado
      return res.json('Item excluído com sucesso!')
    } catch (error: any) {
      return res.json({ erro: error.message })
    }
  }
}