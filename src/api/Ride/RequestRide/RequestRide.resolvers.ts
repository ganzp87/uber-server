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
				{ req }
			): Promise<RequestRideResponse> => {
				const user: User = req.user
				try {
					const ride = await Ride.create({
						...args,
						passenger: user
					}).save()
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
			}
		)
	}
}

export default resolvers
