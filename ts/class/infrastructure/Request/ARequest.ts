import { requestError } from '../Error';
import { InfrastructureFactory as f } from '../../Factory';

export abstract class ARequest {
    readonly errorName: '___request__';
    private hostUrl: string;

    protected abstract sealPostData(postData?: tCommon.anyObject, ...p: any[]): any;
    abstract postGlobalHandler<T>(url: string, postData?: tCommon.anyObject, ...p: any[]): Promise<T>;

    protected request<T>(type: string, url: string, postData?: tCommon.anyObject) {
        const p = f.AsyncOperation.createPromise<T>((resolve, reject) => {
            const postAjax = new XMLHttpRequest();
            postAjax.onreadystatechange = () => {
                if (postAjax.readyState !== 4) {
                    return;
                }

                if (postAjax.status === 200) {
                    try {
                        const data = JSON.parse(postAjax.responseText);
                        resolve(data);
                    }
                    catch (e) {
                        reject(postAjax);
                    }
                } else {
                    reject(postAjax);
                }
            };

            postAjax.open(type, url, true);
            postAjax.send('data=' + encodeURIComponent(JSON.stringify(this.sealPostData(postData))));
        });

        return p;
    }
    protected post<T>(url: string, postData?: tCommon.anyObject) {
        return this.request<T>('POST', url, postData)
    }
    protected get<T>(url: string, postData?: tCommon.anyObject) {
        return this.request<T>('GET', url, postData)
    }
    createError() {
        return new requestError(this.errorName);
    }
    setHostUrl(url: string) {
        this.hostUrl = url;
    }
    createFullUrl(url: string) {
        return this.hostUrl + url;
    }
}

