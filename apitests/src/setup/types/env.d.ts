export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV: "test" | "prod" | "QA" | "APITesting",
        }
    }
}
