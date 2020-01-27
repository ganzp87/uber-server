import { Resolvers } from "../../../types/resolvers"
import privateResolver from "../../../utils/privateResolver"
import {
	ReportMovementMutationArgs,
	ReportMovementResponse
} from "../../../types/graphql"
import User from "../../../entities/User"
import { cleanNullArg } from "../../../utils/cleanNullArg"

const resolvers: Resolvers = {
	Mutation: {
		ReportMovement: privateResolver(
			async (
				_,
				args: ReportMovementMutationArgs,
				{ req }
			): Promise<ReportMovementResponse> => {
				const user: User = req.user
				const notNull = cleanNullArg(args)
				try {
					await User.update({ id: user.id }, { ...notNull })
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
