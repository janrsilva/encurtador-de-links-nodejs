import { LinkRepository } from './../repositories/link-repository';
import { ILink } from './../interfaces/link-interface';
import { Server } from './../server';
import { LinkService } from './../services/link-service';
import { IListener } from '../interfaces/listener-interface';

export class ClickLinkEventListener implements IListener {
    public run(link: ILink): void {
        const linkService = new LinkService(new LinkRepository(Server.db));
        linkService.countClick(link);
    }
}