import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
    MONGO_URI: str(),
    MONGO_USER: str(),
    MONGO_PASSWORD: str(),
});

export default env;
