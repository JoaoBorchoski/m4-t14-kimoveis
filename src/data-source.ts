import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import path, { join } from "path";

const dataSourceConfig = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, "./entities/**.{ts,js}");
    const migrationsPath: string = path.join(
        __dirname,
        "./migrations/**.{ts,js}"
    );

    const dbURL: string | undefined = process.env.DATABASE_URL;

    if (!dbURL) {
        throw new Error("Env var DATABASE_URL does not exists");
    }

    const nodeEnv: string | undefined = process.env.NODE_ENV;

    if (nodeEnv === "test") {
        return {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: [entitiesPath],
        };
    }

    return {
        type: "postgres",
        url: dbURL,
        synchronize: false,
        logging: true,
        migrations: [migrationsPath],
        entities: [entitiesPath],
    };
};

export const AppDataSource = new DataSource(dataSourceConfig());
