import { Router } from 'express';

/**
 * Define routes with path (prefix) and router
 */
export interface Routes {
  path?: string;
  router: Router;
}
