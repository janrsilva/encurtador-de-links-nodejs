import { eventMap } from './../events/events';
import { check, ValidationChain, validationResult, body } from "express-validator";

export class WebhookValidator {
    static getValidator(): ValidationChain[] {
        return [
            check('client_uuid').isUUID().withMessage(
                'É necessário informar um uuid válido!'
            ),
            check('url').isURL(
                {
                    protocols: ['https'],
                }
            ).withMessage(
                'A URL deve ser https!'
            ),
            check(
                'events'
            ).isLength(
                { min: 1 }
            ).withMessage(
                'É necessário informar ao menos um evento!'
            ),
            body('events').custom((events: string[]) => {
                const invalidEvent = events.some(event => {
                    return !eventMap[event];
                });
                if (invalidEvent) {
                    return Promise.reject();
                }
                return Promise.resolve();
            })
        ];
    }

    static validate (req: any) {
        return validationResult(req);
    }
}