export namespace cookieHp {
    export const setValue = (name: string, value: string, Days?: number, isForever?: boolean) => {
        if (isForever)
            Days = 300000;
        let exp: Date | null = null;
        if (Days) {
            exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        }

        document.cookie = name + "=" + encodeURIComponent(value) + (exp == null ? "" : (";expires=" + exp.toUTCString()));
    }
    export const getValue = (name: string) => {
        const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        const arr = document.cookie.match(reg);
        if (arr)
            return decodeURIComponent(arr[2]);
        else
            return null;
    }

    export const removeValue = (name: string) => {
        setValue(name, '', -1000);
    }
}