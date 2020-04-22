import { LinkRepository } from './../repositories/link-repository';
import { LinkCreatedEvent } from './../events/link-created-event';
import { LinkClickedEvent } from './../events/link-clicked-event';
import { ILink } from './../interfaces/link-interface';
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
        this.linkService = new LinkService(new LinkRepository(Server.db));
    }

    async post(req: Request, res: Response) {
        const link = req.body as ILink;
        link.client_uuid = req.headers['client-uuid'] as string;
        res.status(201).json(await this.linkService.create(link));
        LinkCreatedEvent.emit(link);
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

    async list(req: Request, res: Response) {
        const link = await this.linkService.list(req.query.uuid as string);
        if (link) {
            res.json(link);
        } else {
            res.status(404).send(null);
        }
    }

    async available(req: Request, res: Response) {
        const link = await this.linkService.getByShortName(req.params.short_name);
        const available = !link;
        res.json({available});
    }

    async redirect(req: Request, res: Response) {
        const link = await this.linkService.getByShortName(req.params.short_name);
        if (link) {
            res.redirect(301, link.full_link);
            LinkClickedEvent.emit(link);
        } else {
            res.redirect('/');
        }
    }
}