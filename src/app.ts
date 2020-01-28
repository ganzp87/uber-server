import { GraphQLServer } from "graphql-yoga"
import cors from "cors"
import helmet from "helmet"
import logger from "morgan"
import schema from "./schema"
import decodeJWT from "./utils/decodeJWT"
import { NextFunction, Response } from "express"
import { RedisPubSub } from "graphql-redis-subscriptions"
import Redis from "ioredis"

class App {
	public app: GraphQLServer
	public pubSub: RedisPubSub
	private options = {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		password: process.env.REDIS_PASSWORD,
		retryStrategy: (times) => {
			// reconnect after
			return Math.min(times * 50, 2000)
		}
	}
	constructor() {
		this.pubSub = new RedisPubSub({
			publisher: new Redis(this.options),
			subscriber: new Redis(this.options)
		})
		// this.pubSub.ee.setMaxListeners(99)
		this.app = new GraphQLServer({
			schema,
			context: (req) => {
				// console.log(req.connection)
				// console.log(req.request)

				// context undefined 에러 발생 방지
				// context에 디폴트 값으로 null을 부여
				// connection에는 디폴트 값으로 비어있는 값 부여
				const { connection: { context = null } = {} } = req
				return {
					req: req.request,
					pubSub: this.pubSub,
					context
				}
			}
		})
		this.middlewares()
	}
	private middlewares = (): void => {
		this.app.express.use(cors())
		this.app.express.use(logger("dev"))
		this.app.express.use(helmet())
		this.app.express.use(this.jwt)
	}

	private jwt = async (
		req,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		const token = req.get("X-JWT")
		if (token) {
			const user = await decodeJWT(token)
			if (user) {
				req.user = user
			} else {
				req.user = undefined
			}
		}
		next()
	}
}

export default new App().app
