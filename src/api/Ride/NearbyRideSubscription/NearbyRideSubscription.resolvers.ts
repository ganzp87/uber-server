import { withFilter } from "graphql-yoga"
import User from "../../../entities/User"

const resolvers = {
	Subscription: {
		NearbyRideSubscription: {
			subscribe: withFilter(
				(_, __, { pubSub }) => pubSub.asyncIterator("rideRequest"),
				(payload, _, { context }) => {
					const user: User = context.currentUser // driver 정보
					const {
						// user 정보
						NearbyRideSubscription: {
							id: driverId,
							pickUpLat,
							pickUpLng
						}
					} = payload
					// driver 정보
					const {
						id: userId,
						lastLat: userLastLat,
						lastLng: userLastLng
					} = user
					console.log(user, payload)
					// user의 pickup 위치가 driver의 last 위치 근처야 요청 받을 수 있음
					return (
						driverId !== userId &&
						pickUpLat >= userLastLat - 0.05 &&
						pickUpLat <= userLastLat + 0.05 &&
						pickUpLng >= userLastLng - 0.05 &&
						pickUpLng <= userLastLng + 0.05
					)
				}
			)
		}
	}
}

export default resolvers
