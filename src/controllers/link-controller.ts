import { Server } from './../server';
import { LinkService } from './../services/link-service';
import { Request, Response } from 'express';

export class LinkController {
    linkService: LinkService;
    static instance: LinkController;

    static getInstance() {
        if (!this.instance) {
            this.instance = new LinkController();
        }
        return this.instance;
    }

    private constructor() {
        this.linkService = new LinkService(Server.db);
    }

    async post(req: Request, res: Response) {
        const link = await this.linkService.create(req.body);
        res.status(201).json(link);
    }

    async delete(req: Request, res: Response) {
        const deleted = await this.linkService.delete(req.params.uuid);
        if (deleted) {
            res.status(204).send(null);
        }
    }

    async get(req: Request, res: Response) {
        const link = await this.linkService.get(req.params.uuid);
        if (link) {
            res.json(link);
        } else {
            res.status(404).send(null);
        }
    }
}