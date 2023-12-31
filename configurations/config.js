import dotenv from 'dotenv';
dotenv.config({ path: './.env.development' });

/**
 * @breif Configuration object to hold all environmental variables
 */

const config = {
  /**
   * @breif The basic API environment, port and prefix configuration values
   */
  env: process.env.NODE_ENV,
  port: process.env.PORT || 9000,
  prefix: process.env.API_PREFIX || '/api',
  /**
   * @breif Database for various environments
   */
  db: {
    dev: process.env.DATABASE_DEV,
    test: process.env.DATABASE_TEST,
    prod: process.env.DATABASE_PROD,
  },
  /**
   * @breif JWT important variables
   * */
  jwt: {
    // The secret used to sign and validate signature
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    cookieExpires: process.env.JWT_COOKIE_EXPIRES_IN,
  },

  /**
   * @breif Twilio important data
   */
  twilio: {
    sid: process.env.TWILIO_ACCOUNT_SID,
    token: process.env.TWILIO_AUTH_TOKEN,
    from: process.env.TWILIO_FROM,
  },
};

export default config;
