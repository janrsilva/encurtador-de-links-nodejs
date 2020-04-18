import { LinkController } from './../controllers/link-controller';
import express from 'express';

export class LinkRouter {

    static router() {
        const linkController = LinkController.getInstance();
        const router = express.Router();
        return router.post('/', (req, res) => {
            linkController.post(req, res);
        })
        .get('/:uuid', (req, res) => {
            linkController.get(req, res);
        })
        .get('/:short_name/available', (req, res) => {
            linkController.available(req, res);
        })
        .delete('/:uuid', (req, res) => {
            linkController.delete(req, res);
        });
    }
}
