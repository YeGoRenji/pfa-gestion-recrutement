import { Module } from '@nestjs/common';
import { CandidaturesService } from './candidatures.service';
import { CandidaturesController } from './candidatures.controller';

@Module({
  providers: [CandidaturesService],
  controllers: [CandidaturesController],
})
export class CandidaturesModule {}
