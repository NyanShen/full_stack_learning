import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
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

}