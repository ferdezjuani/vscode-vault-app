import { ourFileRouter } from "@/server/uploadthings";
import { createRouteHandler } from "uploadthing/next-legacy";
 
 
export default createRouteHandler({
  router: ourFileRouter,
});