import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CandidatesModule } from './candidates/candidates.module';
import { CandidaturesModule } from './candidatures/candidatures.module';
import { ProfilesModule } from './profiles/profiles.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    CandidatesModule,
    CandidaturesModule,
    ProfilesModule,
    OffersModule,
  ],
})
export class AppModule {}
