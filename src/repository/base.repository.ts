import { PrismaClient, Prisma } from '@prisma/client'
import bcrypt from "bcrypt";

const userPasswordExtension = Prisma.defineExtension({
  name: 'userPassword',
  query: {
    user: {
      async $allOperations({ operation, args, query }) {
        if (operation == 'create') {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(args.data.password, salt);

          args.data.password = hash;
        }

        if (operation == 'update') {
          delete args.data.password;
        }

        return await query(args);
      }
    }
  }
});

function getExtendedClient() {
  return new PrismaClient().$extends(userPasswordExtension)
};

type ExtendedPrismaClient = ReturnType<typeof getExtendedClient>

export abstract class BaseRepository<T> {
  protected client: ExtendedPrismaClient;
  
  constructor() {
    this.client = getExtendedClient();
  }

  abstract getAll: () => Promise<T[] | null>;
  abstract getSingle: (id: number) => Promise<T | null>;
  abstract create: (newObject: T) => Promise<T | null>;
  abstract update: (updatedObject: T) => Promise<T | null>;
  abstract delete: (id: number) => Promise<boolean>;
}