'use strict';

class Graph {

    constructor() {
        this.vertices = [];
        this.edges = {};
    }

    addVertices(value) {
        this.vertices.push(value);
        this.edges[value] = {};
    }

    addEdges(fromNode, toNode, cost) {
        if (!this.hasVertices(fromNode)) {
            this.addVertices(fromNode);
        }

        if (!this.hasVertices(toNode)) {
            this.addVertices(toNode);
        }

        this.edges[fromNode][toNode] = cost;
    }

    getCost(fromNode, toNode) {
        let cost = this.edges[fromNode][toNode];
        return cost ? cost : 0;
    }

    hasVertices(value) {
        return this.vertices.indexOf(value) !== -1;
    }

    hasEdges(fromNode, toNode) {
        return (this.edges.hasOwnProperty(fromNode) && this.edges[fromNode].hasOwnProperty(toNode));
    }
}

module.exports = Graph;
