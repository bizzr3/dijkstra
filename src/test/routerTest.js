'use strict';

const assert = require('chai').assert;
const Router = require('../utils/Router');

describe('Test Possible Routes:', () => {
    it(`Possible Routes between E to D should be 3`, () => {
        let router = new Router().getAllPossibleRoutes('e', 'd');

        assert.equal(router.length, 3)
    })

    it(`Possible Routes between E to E should be 5`, () => {
        let router = new Router().getAllPossibleRoutes('e', 'e');

        assert.equal(router.length, 5)
    })
});

describe('Test Delivery Cost of given input:', () => {
    it(`Delivery cost of A-B-E should be 4`, () => {
        let router = new Router().getRouteCostByInput('a-b-e');

        assert.equal(router[0].cost, 4)
    });

    it(`Delivery cost of A-D should be 10`, () => {
        let router = new Router().getRouteCostByInput('a-d');

        assert.equal(router[0].cost, 10)
    });

    it(`Delivery cost of E-A-C-F should be 8`, () => {
        let router = new Router().getRouteCostByInput('e-a-c-f');

        assert.equal(router[0].cost, 8)
    });

    it(`Delivery cost of A-D-F should be undefined`, () => {
        let router = new Router().getRouteCostByInput('a-d-f');

        assert.equal(router[0], undefined)
    });
});

describe('Test Cost of cheapest Delivery:', () => {
    it(`Cheapset Delivery cost of A-D should be 9`, () => {
        let router = new Router().getCheapestRoute('e', 'd');

        assert.equal(router[0].cost, 9)
    });

    it(`Cheapset Delivery cost of E-E should be 6`, () => {
        let router = new Router().getCheapestRoute('e', 'e');

        assert.equal(router[0].cost, 6)
    });
})