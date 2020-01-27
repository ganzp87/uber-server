import { Resolvers } from "../../../types/resolvers"
import privateResolver from "../../../utils/privateResolver"
import {
	UpdateMyProfileResponse,
	UpdateMyProfileMutationArgs
} from "../../../types/graphql"
import User from "../../../entities/User"
import { cleanNullArg } from "../../../utils/cleanNullArg"

const resolvers: Resolvers = {
	Mutation: {
		UpdateMyProfile: privateResolver(
			async (
				_,
				args: UpdateMyProfileMutationArgs,
				{ req }
			): Promise<UpdateMyProfileResponse> => {
				const user: User = req.user
				const notNull: any = cleanNullArg(args)
				if (notNull.password !== null) {
					user.password = notNull.password
					// save를 해야 User entities에 있는 beforeInsert, beforeUpdate가 실행됨
					// User.Update는 User instance 없이도 업데이트 하기에 beforeUpdate가 작동하지 않음
					user.save()
					delete notNull.password
				}
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
