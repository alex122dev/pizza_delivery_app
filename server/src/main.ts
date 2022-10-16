import { config } from 'dotenv';
config()
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      credentials: true
    })

    app.use(cookieParser())

    await app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
bootstrap();
