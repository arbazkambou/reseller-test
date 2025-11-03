module.exports = {
  apps: [
    {
      name: "esimcard-partner",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        NEXTAUTH_URL: "https://partner.esimcard.com",
        AUTH_TRUST_HOST: "true",
        AUTH_URL: "https://partner.esimcard.com",
        NEXT_PUBLIC_BASE_URL: "https://portal.esimcard.com/api/portal",
        AUTH_SECRET: "mhrPVj/5NHqRhgr6hL4iBLmiwkojt5LEkqv02hg2Fuw=",
        NEXT_PUBLIC_ENV: "production",
        NEXT_PUBLIC_BASE_SENTRY_DSN: "https://aa5f6582a35042e7010f1d28e31c051a@o4507702161375232.ingest.us.sentry.io/4510125710311424"
      }
    }
  ]
}