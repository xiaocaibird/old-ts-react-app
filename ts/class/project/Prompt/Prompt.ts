import { AWebPrompt } from '../../web/Prompt';

export class Prompt extends AWebPrompt {
    static readonly instance: Prompt = new Prompt();
    private constructor() {
        super();
    }
}
