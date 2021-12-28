import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const CreateFooter = z.object({
  name: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  logo: z.string(),
  links: z.string(),
})
export default resolver.pipe(resolver.zod(CreateFooter), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const footer = await db.footer.create({
    data: input,
  })
  return footer
})
