import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';

import { UserProfile } from "./user.profile.entity";

@Entity()
export class UserAccount extends BaseEntity {
	//自增列
	@PrimaryGeneratedColumn()
	id : number;
	//普通列
	@Column()
	username : string;
	@Column({
		select: true,
	})
	password : string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	create_time : Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	update_time : Date;

	// one to one
	@OneToOne(() => UserProfile,  userProfile => userProfile.userAccount)
	@JoinColumn()
	userProfile: UserProfile
}