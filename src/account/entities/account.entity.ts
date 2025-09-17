import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Document } from 'src/document/entities/document.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  role: string;

  @Column()
  status: boolean;

  @OneToMany(() => Document, (document) => document.account)
  documents: Document[];
}
