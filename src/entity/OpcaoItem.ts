// import { HelperColumnsSoftModel } from "@/helper/HelperColumnsSoftModel";
// import { HelperColumnsSoftModel } from "helper/HelperColumnsSoftModel";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { HelperColumnsSoftModel } from "../helper/HelperColumnsSoftModel";

@Entity()
export class OpcaoItem extends HelperColumnsSoftModel {

  @PrimaryGeneratedColumn()
  id: number | undefined

  @Column()
  codigo: number | undefined

  @Column()
  descricao: string | undefined

  @Column()
  opcaoId: number | undefined
}