import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

/* CHANGE GETTING SECTION TO BE
 DONE BY LINK INSTEAD OF ID */
const GetSection = z.object({
  // This accepts type of undefined, but is required at runtime
  link: z.string().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(resolver.zod(GetSection), async ({ link }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const section = await db.section.findFirst({
    where: {
      link,
    },
  })
  if (!section) throw new NotFoundError()
  return section
})
