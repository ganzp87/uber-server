import { Resolvers } from "../../../types/resolvers"
import privateResolver from "../../../utils/privateResolver"
import User from "../../../entities/User"
import { GetNearbyRideResponse } from "../../../types/graphql"
import Ride from "../../../entities/Ride"
import { getRepository, Between } from "typeorm"

const resolvers: Resolvers = {
	Query: {
		GetNearbyRide: privateResolver(
			async (_, __, { req }): Promise<GetNearbyRideResponse> => {
				const user: User = req.user
				if (user.isDriving) {
					const { lastLat, lastLng } = user
					try {
						const ride = await getRepository(Ride).findOne({
							status: "REQUESTING",
							pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
							pickUpLng: Between(lastLng - 0.05, lastLng + 0.05)
						})
						if (ride) {
							return {
								ok: true,
								error: null,
								ride
							}
						} else {
							return {
								ok: true,
								error: "There is no ride request!",
								ride: null
							}
						}
					} catch (error) {
						return {
							ok: false,
							error: error.message,
							ride: null
						}
					}
				} else {
					return {
						ok: false,
						error: "You are not driver!",
						ride: null
					}
				}
			}
		)
	}
}

export default resolvers
