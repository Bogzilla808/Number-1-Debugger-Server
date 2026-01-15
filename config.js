import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

const isProduction = process.env.NODE_ENV === "production";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const db = isProduction ? new Sequelize(
    process.env.DATABASE_URL, {
        dialect: "postgres",
        protocol: "postgres",
        dialectOptions : {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    }
) : new Sequelize({
            dialect: "sqlite",
            storage: path.join(__dirname, "database.sqlite"),
        });

// export const db = new Sequelize({
//   dialect: "sqlite",
//   storage: path.join(__dirname, "database.sqlite"), // database file
//   // logging: false, // optional, hides SQL logs
//   retry: {
//     match: [/SQLITE_BUSY/], // retry if database is busy
//     max: 5,                 // try up to 5 times
//   },
//   pool: {
//     max: 1,       // SQLite supports only one write at a time
//     min: 0,
//     acquire: 30000, // wait up to 30s for a connection
//     idle: 10000
//   }
// });