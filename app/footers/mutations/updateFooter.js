import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const UpdateFooter = z.object({
  id: z.number(),
  name: z.string(),
  title: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  logo: z.string(),
  links: z.string(),
})
export default resolver.pipe(
  resolver.zod(UpdateFooter),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const footer = await db.footer.update({
      where: {
        id,
      },
      data,
    })
    return footer
  }
)
