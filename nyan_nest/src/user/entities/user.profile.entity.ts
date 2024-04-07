import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne } from 'typeorm';
import { UserAccount } from './user.account.entity';

@Entity()
export class UserProfile extends BaseEntity {
	//自增列
	@PrimaryGeneratedColumn()
	id : number;
	//普通列
	@Column()
	name : string;

    @Column()
	phone : number;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	create_time : Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	update_time : Date;

	@OneToOne(() => UserAccount, userAccount => userAccount.userProfile)
	userAccount: UserAccount

}