import { GraphQLSchema } from "graphql"
import { makeExecutableSchema } from "graphql-tools"
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas"
import path from "path"

const allTypes: GraphQLSchema[] = fileLoader(
	path.join(__dirname, "./api/**/*.graphql") // api 폴더 내 깊이에 상관 없이 모든 폴더 안에 있는 파일 들 중 .graphql 파일을 모두 불러옴
)

const allResolvers: any[] = fileLoader(
	path.join(__dirname, "./api/**/*.resolvers.*") // 빌드 시 ts를 js로 변경해야 하므로 확장자 상과없이 resolver 불러옴
)

const mergedTypes = mergeTypes(allTypes)
const mergedResolvers: any = mergeResolvers(allResolvers)

const schema = makeExecutableSchema({
	typeDefs: mergedTypes,
	resolvers: mergedResolvers
}) // graphql안에서 schema가 작동하게 해줌

export default schema
