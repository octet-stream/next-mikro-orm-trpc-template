namespace NodeJS {
  interface ProcessEnv {
    MIKRO_ORM_DB_NAME: string
    MIKRO_ORM_HOST?: string
    MIKRO_ORM_PORT?: string
    MIKRO_ORM_USER: string
    MIKRO_ORM_PASSWORD: string
    RUNS_IN_DOCKER?: string
    SERVER_URL: string
  }
}
