import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function teste(app: FastifyInstance) {
  app.get("/teste", async (request, reply) => {
    const poll = await prisma.$queryRaw`
    SELECT i.[Id] ,
       i.[imobilizado] ,
       i.[descricao] ,
       i.[placa] ,
       i.[serie] ,
       i.[status] ,
       i.[data] ,
       i.[obs] ,
       i.[DataInclusao] ,
       u.[Nome] ,
       u.[Desc_CC] ,
       u.[CC] ,
       i.[Movel] ,
       i.[Analista]
    FROM [patrimonio].[imobilizados] i
    LEFT JOIN [patrimonio].[ImobilizadosToUsuarios] iu ON i.Id = iu.IdImobilizado
    LEFT JOIN [patrimonio].[usuarios] u ON u.id = iu.IdUsuario
    WHERE iu.Ativo = 1
    OR iu.Ativo IS NULL
    ORDER BY ID DESC
    OFFSET 1 * 100 ROWS FETCH NEXT 100 ROWS ONLY
    `;

    return reply.send({ poll });
  });
}
