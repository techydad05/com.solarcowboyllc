import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const DeleteHeader = z.object({
  id: z.number(),
})
export default resolver.pipe(resolver.zod(DeleteHeader), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const header = await db.header.deleteMany({
    where: {
      id,
    },
  })
  return header
})
