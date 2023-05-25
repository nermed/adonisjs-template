import { prisma } from "@ioc:Adonis/Addons/Prisma";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class TestsController {
  public async store({ request }: HttpContextContract) {
    // return await request.only(["title", "description"]);
    const article = await prisma.article.create({
      data: request.only(["title", "description"]),
    });
    return article;
  }
}
