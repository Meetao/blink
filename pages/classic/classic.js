// pages/classic/classic.js
import {ClassicModel} from '../../models/classic.js'
import {LikeModel} from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        classic: null,
        first: false,
        latest:true
    },
    onLike(e){
        console.log(e)
        let behavior = e.detail.behavior
        likeModel.like(behavior,this.data.classic.id,this.data.classic.type)
    },
    onNext(){
        
    },
    onPrevious(e){
        let index = this.data.classic.index
        classicModel.getPrevious(index,(res) => {
            //console.log(res)
            this.setData({
                classic:res
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        classicModel.getLatest((res) => {
            this.setData({
                classic: res
            })
            console.log(res)
        })
    
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