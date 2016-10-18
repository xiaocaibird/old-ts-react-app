/**
*在使用导航功能前，必需设置当前的navigator(调用this.setNavigator()或设置初始值)
*/
export abstract class ANavigation<TNavigator, TScene> {
    protected navigator: TNavigator;
    entryScene: TScene;
    loginScene: TScene;

    abstract toEntry(isReset?: boolean, ...param: any[]): any;
    abstract toLogin(isReset?: boolean, ...param: any[]): any;
    abstract pop(...param: any[]): any;
    abstract back(...param: any[]): any;
    abstract forward(...param: any[]): any;
    abstract push(...param: any[]): any;
    abstract resetTo(...param: any[]): any;
    abstract jumpTo(...param: any[]): any;
    abstract replace(...param: any[]): any;
    abstract openUrl(url: string, ...param: any[]): any;
    abstract reload(...param: any[]): any;
    abstract isEntry(...param: any[]): boolean;
    abstract checkPreChange(...param: any[]): boolean;

    setNavigator(nav: TNavigator) {
        this.navigator = nav;
    }
}
