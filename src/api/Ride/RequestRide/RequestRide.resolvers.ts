import { Resolvers } from "../../../types/resolvers"
import {
	RequestRideMutationArgs,
	RequestRideResponse
} from "../../../types/graphql"
import User from "../../../entities/User"
import Ride from "../../../entities/Ride"
import privateResolver from "../../../utils/privateResolver"

const resolvers: Resolvers = {
	Mutation: {
		RequestRide: privateResolver(
			async (
				_,
				args: RequestRideMutationArgs,
				{ req, pubSub }
			): Promise<RequestRideResponse> => {
				const user: User = req.user
				if (!user.isRiding) {
					try {
						const ride = await Ride.create({
							...args,
							passenger: user
						}).save()
						pubSub.publish("rideRequest", {
							NearbyRideSubscription: ride
						})
						user.isRiding = true // riding request 시작시 true로 변환
						user.save()
						return {
							ok: true,
							error: null,
							ride
						}
					} catch (error) {
						return {
							ok: false,
							error: error.message,
							ride: null
						}
					}
				} else {
					user.isRiding = false // 테스트용 --> 나중에 삭제
					user.save()
					return {
						ok: false,
						error: "You can't request two rides",
						ride: null
					}
				}
			}
		)
	}
}

export default resolvers
