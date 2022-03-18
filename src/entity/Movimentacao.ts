import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { HelperColumnsSoftModel } from "../helper/HelperColumnsSoftModel";

@Entity()
export class Movimentacao extends HelperColumnsSoftModel {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  descricao: string

  @Column()
  diaMovimento: Date

  @Column()
  receita: number

  @Column()
  despesa: number

  @Column()
  saldo: number

  @Column()
  tipo: number

  @Column()
  relacionamentoId: number

  @Column()
  contaOrigemId: number

  @Column()
  contaDestinoId: number
}