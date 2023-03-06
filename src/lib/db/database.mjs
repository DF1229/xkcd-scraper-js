import mongoose from "mongoose";

export function connect() {
    mongoose.set('strictQuery', false);

    const { DB_URL, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
    if (!(DB_URL && DB_USER && DB_PASSWORD && DB_DATABASE)) {
        console.error('Missing connection parameters from environment variables');
        process.exit(1);
    }

    const connectionString = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_URL}/${DB_DATABASE}?authSource=admin&authMechanism=SCRAM-SHA-256`;
    mongoose.connect(connectionString).then(() => {
        console.log(`[${DB_USER}@${DB_DATABASE}] Connection established`);
    }).catch((err) => {
        console.log(`Failed to connect to database on ${DB_USER}@${DB_DATABASE}`);
        console.error(err);
        process.exit(1);
    });
}

export async function close() {
    await mongoose.disconnect().then(() => {
        console.log(`DATABASE DISCONNECTED`);
    }).catch((err) => {
        console.error(err);
    });
}