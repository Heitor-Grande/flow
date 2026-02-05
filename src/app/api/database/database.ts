import { Pool } from "pg"

const database = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    database: process.env.DB_NAME,
})

database.on("connect", () => {
    console.log("database conectado ao PostgreSQL")
})

database.on("error", (err) => {
    console.error("Erro no database PostgreSQL:", err)
})

export default database
