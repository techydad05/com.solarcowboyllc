import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetFooter = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(resolver.zod(GetFooter), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const footer = await db.footer.findFirst({
    where: {
      id,
    },
  })
  if (!footer) throw new NotFoundError()
  return footer
})
