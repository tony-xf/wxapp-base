Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的对外属性，是属性名到属性设置的映射表
     */
    properties: {
        list: {
           type: Array,
           value: []
       },
        total: {
            type: Number,
            value: 0
        }
    },
    /**
     * 组件的内部数据，和 properties 一同用于组件的模板渲染
     */
    data: {
        visible: false,
        attributeIdsArr: [],
    },

    /**
     * 组件生命周期函数-在组件实例刚刚被创建时执行，注意此时不能调用 setData )
     */
    created() {

    },

    /**
     * 组件生命周期函数-在组件实例进入页面节点树时执行)
     */
    attached() {

    },

    /**
     * 	组件生命周期函数-在组件布局完成后执行)
     */
    ready() {
    },

    /**
     * 组件生命周期函数-在组件实例被移动到节点树另一个位置时执行)
     */
    moved() {

    },

    /**
     * 组件生命周期函数-在组件实例被从页面节点树移除时执行)
     */
    detached() {

    },

    /**
     *  组件的方法，包括事件响应函数和任意的自定义方法，关于事件响应函数的使用
     */
    methods: {
        labelChoose(e){
            var newAttributeList= this.data.list;
            var newAttributeIdsArr=[];
            newAttributeList.forEach(item=>{
                if(item.id===e.currentTarget.dataset.groupid){
                    item.attribute.forEach(jtem=>{
                        if(jtem.id===e.currentTarget.dataset.id){
                            jtem.chooseStatus=!jtem.chooseStatus;
                            if(jtem.chooseStatus){
                                //选中筛选条件后,将同分类的另一个条件从数组中去除
                                newAttributeIdsArr=this.data.attributeIdsArr;
                                newAttributeIdsArr = newAttributeIdsArr.filter((v,i) => {
                                    return item.id !== v.pid
                                })
                                newAttributeIdsArr.push({
                                    pid:item.id,
                                    id:jtem.id
                                });
                                this.setData({
                                    attributeIdsArr:newAttributeIdsArr
                                });
                            }else{
                                newAttributeIdsArr=this.data.attributeIdsArr;
                                for(var i=0;i<newAttributeIdsArr.length;i++){
                                    if(newAttributeIdsArr[i].id===jtem.id){
                                        newAttributeIdsArr.splice(i,1);
                                    }
                                }
                                this.setData({
                                    attributeIdsArr:newAttributeIdsArr
                                });
                            }
                        }else{
                            jtem.chooseStatus=false;
                        }
                    });
                }
            });
            this.setData({
                list: newAttributeList,
            });
            this.triggerEvent('selected', {value: this.data.attributeIdsArr})
        },
        switchIsAll(e){
            var newAttributeList=this.data.list;
            newAttributeList.forEach(item=>{
                if(item.id===e.currentTarget.dataset.id){
                    item.isAll=!item.isAll;
                }
            });
            this.setData({
                list:newAttributeList
            });
        },
        reset(){
            var newAttributeList=this.data.list;
            newAttributeList.forEach(item=>{
                item.attribute.forEach(jtem=>{
                    jtem.chooseStatus=false;
                });
            });
            this.setData({
                list: newAttributeList,
                attributeIdsArr: []
            })
            this.triggerEvent('selected', {value: []})
            this.search('reset')
        },
        search(mode = 'confirm'){
            this.triggerEvent('confirm',{mode})
        },
        show(){
            this.setData({
                visible: true
            })
        },
        close(){
            this.setData({
                visible: false
            })
        }
    }

});
