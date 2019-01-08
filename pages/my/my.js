import {ClassicModel} from '../../models/classic.js'
import {BookModel} from '../../models/book.js'
let classicModel = new ClassicModel()
let bookModel = new BookModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorized: false,
        userInfo: null,
        bookCount:0,
        classics:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.userAuthorized()
        this.getMyBookCount()
        this.getMyFavor()
    },
    userAuthorized() {
        wx.getSetting({
            success: data => {
                if (data.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: data => {
                            this.setData({
                                userInfo: data.userInfo,
                                authorized: true
                            })
                        }
                    })
                }
            }
        })
    },
    onGetUserInfo(e) {
        const userInfo = e.detail.userInfo
        if (userInfo) {
            this.setData({
                userInfo,
                authorized: true
            })
        }

    },
    onJumpToAbout(e){
        wx.navigateTo({
            url: '/pages/about/about',
            
        })
    },
    onStudy(){
        wx.navigateTo({
            url: '/pages/course/course',    
            
        })
    },
    onJumpToDetail(e){
        const cid = e.detail.cid
        const type = e.detail.type
        wx.navigateTo({
            url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`    
            
        })
    },
    getMyBookCount(){
        bookModel.getMyBookCount().then(res => {
            this.setData({
                bookCount:res.count
            })
        })
    },
    getMyFavor(){
        classicModel.getMyFavor(res => {
            this.setData({
                classics:res
            })
            console.log(this.data.classics)
        })
    }
})