import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const DeleteFooter = z.object({
  id: z.number(),
})
export default resolver.pipe(resolver.zod(DeleteFooter), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const footer = await db.footer.deleteMany({
    where: {
      id,
    },
  })
  return footer
})
