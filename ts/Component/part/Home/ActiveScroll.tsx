import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
    View,
    TouchableOpacity,
    Image,
} from '../../common/native';
import ViewPager from 'react-native-viewpager';
import { baseNativeComponent } from '../../base';
import ActiveWeb from '../../scene/ActiveWeb';
import { Factory as f } from '../../../class/Factory';
import { httpHp } from '../../../helper';

type props = {
    list: tComponent.activeList,
    activeCallBack: (type: string) => void
};
type state = tCommon.reactState;


export class ActiveScroll extends baseNativeComponent<props, state> {
    render() {
        const {list} = this.props;

        const dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1: any, p2: any) => p1 !== p2,
        });

        return (
            <View style={styles.container}>
                <ViewPager
                    style={styles.flex1}
                    dataSource={dataSource.cloneWithPages(list)}
                    renderPage={this.renderPage}
                    isLoop={list.length > 1 ? true : false}
                    autoPlay={true}
                    locked={false} />
            </View>)
    }

    private renderPage = (data: tComponent.active, pageID: number | string) => {
        return <TouchableOpacity style={styles.flex1}
            onPress={() => {
                if (!data.active_url) {
                    return;
                }
                f.Navigation.push({
                    component: ActiveWeb,
                    params: {
                        url: data.active_url + '&isios=1',
                        onShouldStartLoadWithRequest: f.Device.IsIOS ? this.onShouldStartLoadWithRequest : undefined,
                        onLoadStart: f.Device.IsAndroid ? this.onLoadStart : undefined
                    }
                })
            } }>
            <Image key={pageID} source={{ uri: data.img_path }} style={styles.flex1} resizeMode='stretch' />
        </TouchableOpacity>
    }
    private onShouldStartLoadWithRequest = (p: React.WebViewIOSLoadRequestEvent) => {
        if (!p) return true;
        const type = httpHp.getUrlParams(p.url)["ycyactivetype"];
        if (type) {
            this.props.activeCallBack(type);
            return false;
        }
        return true;
    }

    private onLoadStart = (p: { nativeEvent: React.NavState }) => {
        if (!p || !p.nativeEvent || !p.nativeEvent.url)
            return true;
        const type = httpHp.getUrlParams(p.nativeEvent.url)["ycyactivetype"];
        if (type) {
            this.props.activeCallBack(type);
            return false;
        }
        return true;
    }
}

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    flex1: React.ViewStyle
}>({
    container: {
        flex: 1
    },
    flex1: {
        flex: 1
    }
});
