import * as mongoose from 'mongoose';

const uri = "mongodb+srv://indrasenakatam:Indra%401988@mymangocluster.ynw8zxi.mongodb.net/NestGraphQL?retryWrites=true&w=majority";


export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(uri),
  },
];