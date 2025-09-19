import { Account } from 'src/account/entities/account.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cif: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.documents)
  account: Account;
}
