import { cleanNullArg } from "../../../utils/cleanNullArg"
import privateResolver from "../../../utils/privateResolver"
import {
	ReportMovementMutationArgs,
	ReportMovementResponse
} from "../../../types/graphql"
import { Resolvers } from "../../../types/resolvers"
import User from "../../../entities/User"

const resolvers: Resolvers = {
	Mutation: {
		ReportMovement: privateResolver(
			async (
				_,
				args: ReportMovementMutationArgs,
				{ req, pubSub }
			): Promise<ReportMovementResponse> => {
				const user: User = req.user
				const notNull = cleanNullArg(args)
				try {
					await User.update({ id: user.id }, { ...notNull })
					const updatedUser = await User.findOne({ id: user.id }) // DriverSubscription에 Update된 user 정보를 전달해야함
					pubSub.publish("driverUpdate", {
						DriversSubscription: updatedUser // DriversSubscription처럼 같은 이름의 Data여야 함.
					})
					return {
						ok: true,
						error: null
					}
				} catch (error) {
					return {
						ok: false,
						error: error.message
					}
				}
			}
		)
	}
}

export default resolvers
