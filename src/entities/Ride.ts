import {
	Column,
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne
} from "typeorm"
import User from "./User"
import { rideStatus } from "../types/types"

@Entity()
class Ride extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({
		type: "text",
		enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ONROUTE"]
	})
	status: rideStatus

	@Column({ type: "text" })
	pickUpAddress: string

	@Column({ type: "double precision", default: 0 })
	pickUpLat: number

	@Column({ type: "double precision", default: 0 })
	pcikUpLng: number

	@Column({ type: "text" })
	dropOffAddress: string

	@Column({ type: "double precision", default: 0 })
	dropOfflat: number

	@Column({ type: "double precision", default: 0 })
	dropOfflng: number

	@Column({ type: "double precision", default: 0 })
	price: number

	@Column({ type: "text" })
	distance: string

	@Column({ type: "text" })
	duration: string

	@ManyToOne(
		(type) => User,
		(user) => user.ridesAsPassenger
	)
	passenger: User

	@ManyToOne(
		(type) => User,
		(user) => user.ridesAsDriver
	)
	driver: User

	@CreateDateColumn()
	createdAt: string

	@UpdateDateColumn()
	updatedAt: string
}

export default Ride
