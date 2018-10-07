const Graph = require('../lib/Graph');

class Router {

    constructor() {
        this.isVisited = [];

        this.pathList = [];

        this.pathTraverses = [];

        this.routes = [];

        this.graphSetup = [
            'a-b-1',
            'a-c-4',
            'a-d-10',
            'b-e-3',
            'c-d-4',
            'c-f-2',
            'd-e-1',
            'e-b-3',
            'e-a-2',
            'f-d-1',
        ];

        this.maple = new Graph();

        this.graphSetup.forEach((entry) => {
            var dataSet = entry.split('-');
            var fromNode = dataSet[0];
            var toNode = dataSet[1];
            var cost = dataSet[2];

            if (!this.maple.hasEdges(fromNode, toNode)) {
                this.maple.addEdges(fromNode, toNode, cost);
            }
        });
    }

    traverse(startNode, endNode, isVisited, pathList) {
        isVisited.push(startNode);

        if (startNode == endNode && pathList.length > 1) {
            this.routes.push(pathList.slice(0));
        } else {

            for (var nextNode in this.maple.edges[startNode]) {

                if (isVisited.indexOf(nextNode) === -1 || (pathList.indexOf(nextNode) === 0 && nextNode === endNode)) {

                    pathList.push(nextNode);

                    this.traverse(nextNode, endNode, isVisited, pathList);


                    if (pathList.indexOf(nextNode) === 0) {
                        pathList.splice(pathList.length - 1, 1);
                    } else {
                        pathList.splice(pathList.indexOf(nextNode), 1);
                    }

                }
            }
        }

        isVisited.splice(isVisited.indexOf(startNode), 1);

    }

    traceAllPaths(startNode, endNode) {

        this.pathList.push(startNode);

        this.traverse(startNode, endNode, this.isVisited, this.pathList);

        return this.routes;

    }

    calculateCosts(route) {
        let cost = 0;

        for (let index = 0; index <= route.length - 1; index++) {
            cost += parseInt(this.maple.getCost(route[index], route[index + 1]));
        }

        return cost;
    }

    getAllPossibleRoutes(start, finish) {
        let result = [];
        let routes = this.traceAllPaths(start, finish);

        let route = '';
        let cost = 0;

        for (let index in routes) {
            route = routes[index].join('-');
            cost += this.calculateCosts(routes[index]);

            result.push({ route: route, cost: cost })

            cost = 0;
        }

        return result;
    }
}

module.exports = Router;