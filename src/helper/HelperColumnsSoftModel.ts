import { Column, CreateDateColumn } from "typeorm";

export class HelperColumnsSoftModel {

  @CreateDateColumn()
  createdAt: Date

  @Column({ nullable: true })
  createdBy: string

  @CreateDateColumn()
  updatedAt: Date

  @Column({ nullable: true })
  updatedBy: string

  @CreateDateColumn()
  deletedAt: Date

  @Column({ nullable: true })
  deletedBy: string
}