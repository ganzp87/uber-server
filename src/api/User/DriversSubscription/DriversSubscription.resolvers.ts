import { withFilter } from "graphql-yoga"
import User from "../../../entities/User"

const resolvers = {
	Subscription: {
		DriversSubscription: {
			// driverUpdate 라는 채널명 지정함. (ReportMovement 채널과 동일)
			subscribe: withFilter(
				(_, __, { pubSub }) => pubSub.asyncIterator("driverUpdate"),
				(payload, _, { context }) => {
					const user: User = context.currentUser
					const {
						// driver 정보
						DriversSubscription: {
							id: driverId,
							lastLat: driverLastLat,
							lastLng: driverLastLng
						}
					} = payload
					// user 정보
					const {
						id: userId,
						lastLat: userLastLat,
						lastLng: userLastLng
					} = user
					return (
						driverId !== userId &&
						driverLastLat >= userLastLat - 0.05 &&
						driverLastLat <= userLastLat + 0.05 &&
						driverLastLng >= userLastLng - 0.05 &&
						driverLastLng <= userLastLng + 0.05
					)
				}
			)
		}
	}
}

export default resolvers
