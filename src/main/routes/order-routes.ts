import { Router } from 'express';
import { Repository } from '../../core/domain/repositories/repository';
import {
  makeAddOneOrderHttpController,
  makeFindOrdersHttpController,
} from '../factories/order-factories';
import { adaptRoute } from './route';

export const orderRoutes = (router: Router, repository: Repository) => {
  router.post('/orders', adaptRoute(makeAddOneOrderHttpController(repository)));
  router.get('/orders', adaptRoute(makeFindOrdersHttpController(repository)));
};
