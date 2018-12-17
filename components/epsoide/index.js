// components/epsoide/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        index: {
            type:String,
            observer:function(newVal,oldVal,changeedPath){
                let val = newVal<10?newVal.padStart(2,'0'):newVal
                this.setData({
                    _index: val
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        months:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一','十二'],
        year: 0,
        month: '',
        _index:''
    },
    attached() {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth()
        console.log(year+' '+month)
        this.setData({
            year: year,
            month:this.data.months[month]
        })
    },
    /**
     * 组件的方法列表
     */
    methods: {

    }
})