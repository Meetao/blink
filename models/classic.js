import {
    HTTP
} from '../util/http.js';
class ClassicModel extends HTTP {
    getLatest(sCallback) {
        this.request({
            url: 'classic/latest',
            success: (res) => {
                sCallback(res)
                this._setLatestIndex(res.index)
                let key = this._getKey(res.index)
                wx.setStorageSync(key, res)
            }
        })
    }
    getClassic(index, nextOrPrevious, sCallback) {
        //缓存思路
        // 1.先到缓存中寻找数据
        // 2.如果有就从缓存中拿数据 如果没有调用接口
        // 3.再把新数据写入缓存
        let key = this._getKey(nextOrPrevious == 'next' ? index + 1 : index - 1)
        let classic = wx.getStorageSync(key)
        if (!classic) {
            this.request({
                url: 'classic/' + index + '/' + nextOrPrevious,
                success: (res) => {
                    wx.setStorageSync(this._getKey(res.index),res)
                    sCallback(res)
                }
            })
        } else {
            sCallback(classic)
        }

    }
    // getPrevious(index, sCallback) {
    //     this.request({
    //         url: 'classic/' + index + '/previous',
    //         success: (res) => {
    //             sCallback(res)
    //         }
    //     })
    // }
    // getNext(index,sCallback){
    //     this.request({
    //         url: 'classic/' + index + '/next',
    //         success: (res) => {
    //             sCallback(res)
    //         }
    //     })
    // }
    isFirst(index) {
        return index == 1 ? true : false
    }
    isLatest(index) {
        let latestIndex = this._getLatestIndex()
        return latestIndex == index ? true : false
    }
    getMyFavor(success){
        const params = {
            url: 'classic/favor',
            success:success
        }
        this.request(params)
    }
    getById(cid, type, success) {
        let params = {
            url: `classic/${type}/${cid}`,
            success: success
        }
        this.request(params)
    }
    _setLatestIndex(index) {
        wx.setStorageSync('latest', index);
    }
    _getLatestIndex() {
        let index = wx.getStorageSync('latest')
        return index
    }
    _getKey(index) {
        let key = 'classic-' + index
        return key
    }
}
export {
    ClassicModel
}