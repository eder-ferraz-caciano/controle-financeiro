import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { HelperColumnsSoftModel } from "../helper/HelperColumnsSoftModel";

@Entity()
export class User extends HelperColumnsSoftModel {

    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column()
    nome: string | undefined

    @Column()
    email: string | undefined

    @Column()
    senha: string | undefined

    @Column()
    admin: number | undefined
}
