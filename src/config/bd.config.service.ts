import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class BdConfigService implements TypeOrmOptionsFactory{
    
    constructor(private configService: ConfigService)
    {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get<string>('BD_HOST'),
            port: this.configService.get<number>('BD_PORT'),
            username: this.configService.get<string>('BD_USER'),
            password: this.configService.get<string>('BD_PASSWORD'),
            database: this.configService.get<string>('BD_NAME'),
            entities: [__dirname + '/**/*.entity{.js, .ts}'],
            synchronize: true
        }
    }

}