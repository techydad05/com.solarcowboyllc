import { paginate, resolver } from "blitz"
import db from "db"
export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: headers,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () =>
        db.header.count({
          where,
        }),
      query: (paginateArgs) => db.header.findMany({ ...paginateArgs, where, orderBy }),
    })
    return {
      headers,
      nextPage,
      hasMore,
      count,
    }
  }
)
