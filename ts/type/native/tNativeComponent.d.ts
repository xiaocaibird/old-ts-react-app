declare namespace tNativeComponent {
    export namespace Picker {
        export type item = {
            value: string,
            lable: string,
            children?: dynamicData,
            mustGetNewChildrenEveryTime?: boolean
        }

        export type dynamicData = item[];

        export type branchPickers = item[][];

        export type props = {
            isDynamic?: boolean,
            data?: dynamicData | branchPickers,

            title?: string,
            topInfoCreateFun?: (selectItems: item[]) => string | null,
            branchTitles?: string[],
            titleStyle?: React.TextStyle,
            topInfoStyle?: React.TextStyle,
            branchTitleStyle?: React.TextStyle[] | React.TextStyle,
            branchPickersStyles?: React.ViewStyle[] | React.TextStyle,
            branchPickersItemStyles?: React.TextStyle[] | React.TextStyle,
            buttonStyle?: React.TextStyle,
            okButtonText?: string,
            cancelButtonText?: string,
            okCallBack?: tCommon.anyFun,
            cancelCallBack?: tCommon.anyFun,
            colunmMax?: number,
            defaultSelectValues?: string[],
            getDefaultSelectValuesFun?: () => string[],
            defaultValueButtonShow?: boolean,
            defaultValueButtonText?: string,
            getChildrenFuns?: ((selectItems: item[], index: number) => item[])[],

            pressMaskLayerToHide?: boolean
        };
    }

    export namespace TextInput {
        export type props = {
            setNowFocusNode?: (node: any) => void
        } & React.TextInputProperties;
    }
}