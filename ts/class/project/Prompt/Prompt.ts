import { ANativePrompt } from '../../native/Prompt';

export class Prompt extends ANativePrompt {
    static readonly instance: Prompt = new Prompt();
    private constructor() {
        super();
    }
}
