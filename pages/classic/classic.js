// pages/classic/classic.js
import {HTTP} from '../../util/http.js'
let http = new HTTP()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        http.request({
            url:'classic/latest',
            success: (res) => {
                console.log(res)
            }
        })
        // wx.request({
        //     url: 'http://bl.7yue.pro/v1/classic/latest',
        //     data: {},
        //     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        //     header: {
        //         "appkey":"AbhC31IG7ruCDp57"
        //     }, 
        //     success: function(res){
        //         // success
        //         console.log(res.data)
        //     },
        //     fail: function() {
        //         // fail
        //     },
        //     complete: function() {
        //         // complete
        //     }
        // })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})