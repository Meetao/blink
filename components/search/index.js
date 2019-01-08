import {
    KeywordModel
} from '../../models/keyword'
import {
    BookModel
} from '../../models/book.js'
import {
    paginationBev
} from '../behaviors/pagination.js'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
    /**
     * 组件的属性列表
     */
    behaviors: [paginationBev],
    properties: {
        more: {
            type: String,
            observer: 'loadMore'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        historyWords: [],
        hotWords: [],
        //dataArray:[],
        searching: false,
        q: '',
        loading: false,
        loadingCenter:false
    },
    attached() {
        const historyWords = keywordModel.getHistory()
        this.setData({
            historyWords
        })
        keywordModel.getHot().then(res => {
            this.setData({
                hotWords: res.hot
            })
        })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onCancel() {
            this.triggerEvent('cancel', {}, {})
            this.initialize()
        },
        onConfirm(e) {
            this._showResult()
            this._showLoadingCenter()
            const q = e.detail.value || e.detail.text
            this.setData({
                q
            })
            bookModel.search(0, q).then(res => {
                this.setMoreData(res.books)
                this.setTotal(res.total)
                
                keywordModel.addToHistory(q)
                this._hideLoadingCenter()
            })
        },
        onDelete() {
            this._closeResult()
            this.initialize()
        },
        loadMore() {
            if (!this.data.q) {
                return
            }
            if (this.isLocked()) {
                return
            }
            //const length = this.data.dataArray.length

            if (this.hasMore()) {
                this.locked()
                bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
                    //const tempArray = this.data.dataArray.concat(res.books)
                    this.setMoreData(res.books)
                    this.unLocked()
                    // this.setData({
                    //     dataArray: tempArray,
                    //     loading: false
                    // })
                },()=>{
                    this.unLocked()
                })
            }

        },
        _showLoadingCenter(){
            this.setData({loadingCenter:true})
        },
        _hideLoadingCenter(){
            this.setData({loadingCenter:false})
        },
        _showResult(){
            this.setData({searching:true})
        },
        _closeResult(){
            this.setData({searching:false,q:''})
        }
    }
})