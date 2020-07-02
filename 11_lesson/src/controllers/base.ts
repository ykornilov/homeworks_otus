import express from 'express';

export class BaseController {
    public router = express.Router();

    constructor() {
        this.initRouter();
    };

    public initRouter() {};
}