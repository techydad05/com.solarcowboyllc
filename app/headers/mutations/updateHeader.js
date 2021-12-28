import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const UpdateHeader = z.object({
  id: z.number(),
  name: z.string(),
  title: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  logo: z.string(),
  links: z.string(),
})
export default resolver.pipe(
  resolver.zod(UpdateHeader),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const header = await db.header.update({
      where: {
        id,
      },
      data,
    })
    return header
  }
)
