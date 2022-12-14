import { config } from 'dotenv';
config();
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      credentials: true,
      origin: process.env.CLIENT_URL,
    });

    app.use(cookieParser());

    await app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
}
bootstrap();
