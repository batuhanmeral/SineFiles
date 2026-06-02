import { Router } from 'express';
import * as c from './admin.controller.js';

export const adminRouter = Router();

adminRouter.use(c.withAdminAuth);

adminRouter.get('/dashboard', c.dashboard);
adminRouter.get('/users', c.users);
adminRouter.delete('/users/:id', c.deleteUser);
adminRouter.patch('/users/:id/role', c.updateRole);
adminRouter.get('/content', c.content);
adminRouter.delete('/content/:id', c.deleteContentItem);
