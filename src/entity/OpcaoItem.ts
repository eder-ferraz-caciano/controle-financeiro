import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { HelperColumnsSoftModel } from "../helper/HelperColumnsSoftModel";

@Entity()
export class OpcaoItem extends HelperColumnsSoftModel {

  @PrimaryGeneratedColumn()
  id: number | undefined

  @Column()
  codigo: string | undefined

  @Column()
  opcaoId: number | undefined
}