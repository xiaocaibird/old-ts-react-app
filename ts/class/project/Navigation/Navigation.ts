import { AWebNavigation } from '../../web/Navigation';

export class Navigation extends AWebNavigation {
    static readonly instance: Navigation = new Navigation();
    private constructor() {
        super();
    }
    checkPreChange() {
        return true;
    }
}
