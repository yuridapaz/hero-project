import axios from "axios";
import md5 from "md5";

function validateEnv(envKey) {
    if (process.env[envKey] === undefined) {
        throw new Error(
            `No value for required environment variable: ${envKey}. Set value with export ${envKey}=<value>`
        );
    }
}

function getApiKeys() {
    validateEnv("MARVEL_API_PUBLIC_KEY");
    validateEnv("MARVEL_API_PRIVATE_KEY");

    return {
        publicKey: process.env.MARVEL_API_PUBLIC_KEY,
        privateKey: process.env.MARVEL_API_PRIVATE_KEY,
    };
}

function marvelClient() {
    const { privateKey, publicKey } = getApiKeys();
    const time = Number(new Date());
    const hash = md5(time + privateKey + publicKey);

    return {
        getHeroes: async () => {
            try {
                const apiResult = await axios.get(
                    `https://gateway.marvel.com:443/v1/public/characters?ts=${time}&apikey=${PUBLIC_KEY}&hash=${hash}`
                );
                return apiResult.data.data.results;
            } catch (err) {
                throw new Error("Failed getting data of all heroes", err);
            }
        },
    };
}

export { marvelClient };
