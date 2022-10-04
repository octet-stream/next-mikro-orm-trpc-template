namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SERVER_URL: string

    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string

    MIKRO_ORM_DB_NAME: string
    MIKRO_ORM_HOST?: string
    MIKRO_ORM_PORT?: string
    MIKRO_ORM_USER: string
    MIKRO_ORM_PASSWORD: string
  }
}
