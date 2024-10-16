export default () => ({
  port: parseInt(process.env.PORT, 10) || 3005,
  environment: process.env.NODE_ENV,
  clerk: {
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  },
});
