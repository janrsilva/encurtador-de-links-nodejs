import { check, ValidationChain, validationResult } from "express-validator";

export class LinkValidator {
    static getValidator(): ValidationChain[] {
        return [
            check('full_link').isURL(
                {
                    protocols: ['http', 'https'],
                }
            ).withMessage(
                'O link informado não tem formato válido!'
            ),
            check(
                'short_name'
            ).isLength(
                { min: 2 }
            ).withMessage(
                'O nome do seu link deve ter tamanho minímo de dois caracteres!'
            ).matches(
                /^[a-zA-Z\d\-]+$/
            ).withMessage(
                'O nome do seu link deve conter apenas letras, números ou traço!'
            )
        ];
    }

    static validate (req: any) {
        return validationResult(req);
    }
}