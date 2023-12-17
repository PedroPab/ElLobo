
//importamos dotenv
import { config } from "dotenv";
import path from "path";
//segun el node_env importamos un archivo .env o otro (que esta en la raiz del proyecto) segun su nombre
if (process.env.NODE_ENV === "development") {
  config({ path: path.resolve(process.cwd(), ".env.development") });
} else if (process.env.NODE_ENV === "production") {
  config({ path: path.resolve(process.cwd(), ".env.production") });
} else {
  config({ path: path.resolve(process.cwd(), ".env") });
}
//importamos las variables de entorno
const { NODE_ENV } = process.env;


//importamos las variables de entorno
const { PORT, } = process.env;

//exportamos las variables de entorno
export { PORT, NODE_ENV };