import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { HelperColumnsSoftModel } from "../helper/HelperColumnsSoftModel";

@Entity()
export class Contas extends HelperColumnsSoftModel {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  descricao: string

  @Column({nullable: true})
  observacao: string

  @Column()
  tipo: number

  @Column({nullable: true})
  contaPaiId: number
}