import { WebhookValidator } from './../validators/webhook-validator';
import { WebhookController } from './../controllers/webhook-controller';
import express from 'express';

export class WebhookRouter {

    static router() {
        const validators = WebhookValidator.getValidator();
        const webhookController = WebhookController.getInstance();
        const router = express.Router();
        return router.post('/', validators, (req: any, res: any) => {
            const errors = WebhookValidator.validate(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            webhookController.post(req, res);
        })
    }
}
