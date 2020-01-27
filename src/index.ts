import dotenv from "dotenv"
dotenv.config() // 옵션들을 임포트 하기 전에 환경 변수들을 설정해야 잘 작동함. ormConfig 후에 불러오면 덮어씌워지는 문제가 있는듯?
import app from "./app"
import { createConnection } from "typeorm"
import { Options } from "graphql-yoga"
import connectionOptions from "./ormConfig"

// console.log(process.env)

const PORT: number | string = process.env.PORT || 4000
const PLAYGROUND_ENDPOINT: string = "/playground"
const GRAPHQL_ENDPOINT: string = "/graphql"

const appOptions: Options = {
	port: PORT,
	playground: PLAYGROUND_ENDPOINT,
	endpoint: GRAPHQL_ENDPOINT
}

const handleAppStart = () => console.log(`Listening on port ${PORT}`)

// 데이터베이스 연걸 후에 앱을 실행하도록 함
createConnection(connectionOptions)
	.then(() => {
		app.start(appOptions, handleAppStart)
	})
	.catch((error) => console.log(error))
