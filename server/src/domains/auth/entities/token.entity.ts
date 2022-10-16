import { User } from "src/domains/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tokens')
export class Token {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    refreshToken: string

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}