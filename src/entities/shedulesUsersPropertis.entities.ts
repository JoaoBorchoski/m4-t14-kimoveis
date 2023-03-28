import { RealEstate } from "./realState.entities";
import { User } from "./users.entities";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity("shedules_users_properties")
export class Schedule {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "date" })
    date: string;

    @Column({})
    hour: string;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => RealEstate)
    realEstate: RealEstate;
}
