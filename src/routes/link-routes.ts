import { LinkController } from './../controllers/link-controller';
import express from 'express';
import { validationResult } from 'express-validator';
import { LinkValidator } from './../validators/link-validator';

export class LinkRouter {

    static router() {
        const validators = LinkValidator.getValidator();
        const linkController = LinkController.getInstance();
        const router = express.Router();
        return router.post('/', validators, (req: any, res: any) => {
            const errors = LinkValidator.validate(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            linkController.post(req, res);
        })
        .get('/', (req, res) => {
            linkController.list(req, res);
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
