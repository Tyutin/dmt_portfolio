import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from "typeorm";
import { UserEntity } from "./nextAuth.entity";

@Entity("WorkEntity", { name: "works" })
export class WorkEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  imageName: string;

  @Column()
  title: string;

  @ManyToOne(() => UserEntity, (user) => user.works)
  user: Relation<UserEntity>;
}
