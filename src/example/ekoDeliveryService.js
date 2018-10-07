const Router = require('../utils/Router');

const router = new Router()

console.log('All possible:', router.getAllPossibleRoutes('e', 'd'));

console.log('Cheapest possible:', router.getCheapestRoute('e', 'd'));

console.log('Cost of given possible route:', router.getRouteCostByInput('a-b-c'));
