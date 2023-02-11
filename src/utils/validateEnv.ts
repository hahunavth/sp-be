import { cleanEnv, port, str } from 'envalid';

/**
 * Validate environment variables
 */
function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
  });
}

export default validateEnv;
