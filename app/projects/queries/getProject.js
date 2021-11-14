import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetProject = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
// remove  resolver.authorize(), to remove authorization
export default resolver.pipe(resolver.zod(GetProject), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const project = await db.project.findFirst({
    where: {
      id,
    },
  })
  if (!project) throw new NotFoundError()
  return project
})
