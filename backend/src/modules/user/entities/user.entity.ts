import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 32, unique: false })
  name: string;

  @Column({ type: 'varchar', length: 64, unique: false })
  password: string;

  constructor(id: string, email: string, name: string, password: string) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
  }
}
