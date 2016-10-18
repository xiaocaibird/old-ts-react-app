import { APrompt } from '../../infrastructure/Prompt';
import { Alert } from 'react-native';
import Toast from 'react-native-root-toast';
import * as hp from '../../../helper';
import { NativeFactory as f } from '../../Factory';

export abstract class ANativePrompt extends APrompt {
    protected createPopUp(title: string, msg: string, type: eCommon.popUp,
        okCallBack: tCommon.anyFun = hp.funHp.noop,
        cancelCallBack: tCommon.anyFun = hp.funHp.noop) {
        const buttons = type == eCommon.popUp.confirm ?
            [
                { text: '确定', onPress: okCallBack },
                { text: '取消', onPress: cancelCallBack },
            ] :
            [
                { text: '确定', onPress: okCallBack }
            ];
        Alert.alert(title, msg, buttons);
    }

    protected createToast(msg: string, onShow: tCommon.anyFun = hp.funHp.noop, onHide: tCommon.anyFun = hp.funHp.noop) {
        Toast.show(msg, {
            duration: Toast.durations.LONG,
            position: -f.Device.getActualSize(30),
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            onShow: onShow,
            onHide: onHide,
            onHidden: (t: any) => {
                setTimeout(() => {
                    try {
                        t.destroy()
                    }
                    catch (e) {

                    }
                }, 500);
            }
        });
    }
}
