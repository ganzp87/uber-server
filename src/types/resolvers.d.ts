export type Resolver = (parent: any, arg: any, context: any, info: any) => any
export interface Resolvers {
	[key: string]: {
		[ket: string]: Resolver
	}
}
