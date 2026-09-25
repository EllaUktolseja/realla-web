import dotenv from "dotenv";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";

dotenv.config({
    path: "../../.env",
});

const PORT = Number(process.env.PORT ?? 4000);

async function bootstrap(): Promise<void> {
    await connectDatabase();
    
    app.listen(PORT, () => {
    console.log(`API Server running on http://localhost:${PORT}`); 
    });
}

bootstrap().catch((error: unknown) => {
    console.error("Failed to start API Server: ", error);
    process.exit(1);
})