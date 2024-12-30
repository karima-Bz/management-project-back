import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { join } from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
      exclude: ['/graphql/(.*)'],
      renderPath: 'public'
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.dev', '.env'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        dbName: 'users',
      }),
      connectionName: 'users',
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [
    { provide: 'APP_GUARD', useExisting: JwtAuthGuard },
    JwtAuthGuard,
  ],
})
export class AppModule {}
