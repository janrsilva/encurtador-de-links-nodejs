import { WebhookRepository } from './../repositories/webhook-repository';
import { WebhookService } from './../services/webhook-service';
import { Server } from '../server';
import { Request, Response } from 'express';

export class WebhookController {
    webhookService: WebhookService;
    static instance: WebhookController;

    static getInstance() {
        if (!this.instance) {
            this.instance = new WebhookController();
        }
        return this.instance;
    }

    private constructor() {
        this.webhookService = new WebhookService(new WebhookRepository(Server.db));
    }

    async post(req: Request, res: Response) {
        res.status(201).json(await this.webhookService.create(req.body));
    }
}