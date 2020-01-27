import { Resolvers } from "../../../types/resolvers"
import privateResolver from "../../../utils/privateResolver"
import User from "../../../entities/User"
import {
	CompleteEmailVerificationMutationArgs,
	CompleteEmailVerificationResponse
} from "../../../types/graphql"
import Verification from "../../../entities/Verification"

const resolvers: Resolvers = {
	Mutation: {
		CompleteEmailVerification: privateResolver(
			async (
				_,
				args: CompleteEmailVerificationMutationArgs,
				{ req }
			): Promise<CompleteEmailVerificationResponse> => {
				const user: User = req.user
				const { key } = args
				if (user.email) {
					try {
						const verficiation = await Verification.findOne({
							key,
							payload: user.email
						})
						if (verficiation) {
							user.verifiedEmail = true
							user.save()
							return {
								ok: true,
								error: null
							}
						} else {
							return {
								ok: false,
								error: "Cant verify email"
							}
						}
					} catch (error) {
						return {
							ok: false,
							error: error.message
						}
					}
				} else {
					return {
						ok: false,
						error: "No email to verify"
					}
				}
			}
		)
	}
}

export default resolvers
