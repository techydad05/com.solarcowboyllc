import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetHeader = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(resolver.zod(GetHeader), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const header = await db.header.findFirst({
    where: {
      id,
    },
  })
  if (!header) throw new NotFoundError()
  return header
})
