import * as React from 'react';
import {
    ScrollView as RNScrollView,
    RefreshControl,
    StyleSheet,
    Keyboard
} from 'react-native';
import { baseNativeComponent } from '../../base';
import { funHp, nComponentHp } from '../../../helper';
import { NativeFactory as f } from '../../../class/Factory';

type props = {
    onRefreshCallBack?: tCommon.anyPromiseFun,
    needTrim?: boolean,
    refreshWillTitle?: string,
    refreshingTitle?: string,
    refreshedTitle?: string,
    needTrimWhenKeyboardShow?: boolean,

    RefreshColors?: string[],
    RefreshProgressBackgroundColor?: string,
    RefreshSize?: number,
    RefreshProgressViewOffset?: number,

    RefreshTitleColor?: string,
    RefreshTintColor?: string,
} & React.ScrollViewProperties;
type state = {
    isRefreshing?: boolean,
    refreshTitle?: string
}

export class ScrollView extends baseNativeComponent<props, state> {
    private keyboardWillShowListener: React.EmitterSubscription;
    private keyboardWillHideListener: React.EmitterSubscription;

    private nowFocusNode: any;

    get instance() {
        return ((this.refs['ScrollView'] as any) as RNScrollView);
    }

    constructor(props: props) {
        super(props);
        this.state = {
            refreshTitle: props.refreshWillTitle
        }
    }
    componentWillUnmount() {
        if (this.keyboardWillShowListener) {
            this.keyboardWillShowListener.remove();
        }

        if (this.keyboardWillHideListener) {
            this.keyboardWillHideListener.remove();
        }
    }
    componentDidMount() {
        if (this.props.needTrimWhenKeyboardShow && f.Device.IsIOS) {
            this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow, null);
            this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide, null);
        }
        if (this.props.needTrim) {
            const param = this.props.horizontal ?
                { x: -1, y: 0, animated: false } :
                { x: 0, y: -1, animated: false };
            this.instance.scrollTo(param);
        }
    }
    render() {
        const {
            onRefreshCallBack,
            horizontal,
            style,
            contentContainerStyle,

            RefreshColors = ['#2ecc71'],
            RefreshProgressBackgroundColor = '#FFFFFF',
            RefreshSize,
            RefreshProgressViewOffset,

            RefreshTitleColor = '#2ecc71',
            RefreshTintColor = '#2ecc71'
        } = this.props;
        const {refreshTitle = '下拉刷新', isRefreshing = false} = this.state;

        const topProps = nComponentHp.createInfrastructureComponentTopProps({
            onRefreshCallBack: undefined,
            needTrim: undefined,
            refreshWillTitle: undefined,
            refreshingTitle: undefined,
            refreshedTitle: undefined,
            ref: 'ScrollView',
            style: [defaultStyles.style, style],
            contentContainerStyle: [defaultStyles.contentContainerStyle, contentContainerStyle],
            onTouchStart: this.onTouchStart,
            refreshControl: !horizontal && funHp.isFun(onRefreshCallBack) ? <RefreshControl
                refreshing={isRefreshing}
                onRefresh={this.onRefresh}
                tintColor={RefreshTintColor}
                title={refreshTitle}
                titleColor={RefreshTitleColor}
                colors={RefreshColors}
                progressBackgroundColor={RefreshProgressBackgroundColor}
                size={RefreshSize}
                progressViewOffset={RefreshProgressViewOffset}
                />
                : undefined
        });

        return <RNScrollView {...defaultProps} {...this.props} {...topProps} />
    }
    setNowFocusNode = (node: any) => {
        this.nowFocusNode = node;
    }
    private keyboardWillShow = (frames: any) => {
        if (this.nowFocusNode != null) {
            try {
                let scrollResponder = this.instance.getScrollResponder();
                (scrollResponder as any).scrollResponderScrollNativeHandleToKeyboard(
                    this.nowFocusNode,
                    frames.endCoordinates.height * 0.5,
                    true
                );
            }
            catch (e) {

            }
        }
    }
    private keyboardWillHide = (frames: any) => {
        if (this.nowFocusNode != null) {
            try {
                let scrollResponder = this.instance.getScrollResponder();
                (scrollResponder as any).scrollResponderScrollNativeHandleToKeyboard(
                    this.nowFocusNode,
                    frames.endCoordinates.height,
                    true
                );
            }
            catch (e) {

            }
        }
    }
    private onTouchStart = (event: React.GestureResponderEvent) => {
        const {refreshWillTitle = '下拉刷新', onTouchStart} = this.props;
        this.setState(
            {
                refreshTitle: refreshWillTitle
            }
        );

        if (funHp.isFun(onTouchStart)) {
            onTouchStart!(event);
        }
    }
    private onRefresh = () => {
        const {refreshingTitle = '正在刷新...', refreshedTitle = '刷新完成'} = this.props;
        this.setState({
            isRefreshing: true,
            refreshTitle: refreshingTitle
        });
        try {
            this.props.onRefreshCallBack!().then(
                () => {
                    setTimeout(() => {
                        this.setState(
                            {
                                isRefreshing: false,
                                refreshTitle: refreshedTitle
                            }
                        );
                        setTimeout(() => {
                            this.instance.scrollTo({ x: 0, y: 0, animated: true });
                        }, 200);
                    }, 500);

                }
            )
        }
        catch (e) {
            this.setState(
                {
                    isRefreshing: false,
                    refreshTitle: refreshedTitle
                }
            );
        }
    }
}

const defaultStyles = StyleSheet.create<{
    style: React.ScrollViewStyle
    contentContainerStyle: React.ViewStyle
}>({
    style: {

    },
    contentContainerStyle: {

    }
});

const defaultProps: React.ScrollViewProperties = {
    horizontal: false,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    bouncesZoom: false,
    directionalLockEnabled: true
}