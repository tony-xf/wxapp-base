import worksServices from "../../../../api/works";

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
           value: [],
            observer: function(val) {
                val && this.setData({
                    curCategoryOption: val
                })
            }
       }
    },
    /**
     * 组件的内部数据，和 properties 一同用于组件的模板渲染
     */
    data: {
        visible: false,
        attributeIdsArr: [],
        attributeList: [], //分类属性选项
        extensionList: [],  //分类扩展属性选项
        curCategoryOption: [],  //当前分类选项
        selectCategoryArr: [],  //已选分类数组
        form: {
            categoryId: '',
            categoryAttribute: [],
            categoryExtensionField: [],
        },
        categoryText: '',
        checkedLabel: '',
        categoryExtensionField: {} //扩展属性对象，用于存填写或选择的属性值
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
        selectCategory({currentTarget: {dataset: {id, index}}}){
            const item = this.data.curCategoryOption[index];
            if(item.selected){
                return;
            }
            this.data.curCategoryOption.forEach(item=>{
                if(item.id === id){
                    item.selected = true
                }else{
                    item.selected = false
                }
            })
            this.setData({
                'form.categoryId': id,
                categoryText: item.name,
                curCategoryOption: this.data.curCategoryOption
            })
            if(item.children && item.children.length > 0){
                this.data.selectCategoryArr.push(item)
                item.children.forEach(item=>{
                    item.selected = false
                })
                this.setData({
                    curCategoryOption: item.children,
                    selectCategoryArr: this.data.selectCategoryArr
                })
            }
            this.getAttr(id)
            this.getExtension(id)
        },
        delSelectCategory({currentTarget: {dataset: {index}}}){
            this.data.selectCategoryArr.splice(index, 1)
            const length = this.data.selectCategoryArr.length;
            let arr = this.data.list
            if(length > 0){
                arr = this.data.selectCategoryArr[length-1].children
            }
            this.setData({
                curCategoryOption: arr,
                selectCategoryArr: this.data.selectCategoryArr
            })
        },
        selectAttr({currentTarget: {dataset: {id, index}}}){
            const attr = this.data.attributeList[index]
            if(attr.maxChose){
                attr.attribute.forEach(item=>{
                    if(item.id === id){
                        item.selected = !item.selected
                    }
                })
            }else{
                attr.attribute.forEach(item=>{
                    if(item.id === id){
                        item.selected = true
                    }else{
                        item.selected = false
                    }
                })
            }
            this.setData({
                ['attributeList.['+index+']']: attr
            })
        },
        selectExtension({currentTarget: {dataset: {id, index}}}){
            const attr = this.data.extensionList[index]
            const arr = [];
            if(attr.type === 'multiple'){
                attr.attribute.forEach(item=>{
                    if(item.id === id){
                        item.selected = !item.selected
                    }
                })
            }else{
                attr.attribute.forEach(item=>{
                    if(item.id === id){
                        item.selected = true
                    }else{
                        item.selected = false
                    }
                })
            }
            attr.attribute.forEach(item=>{
                if(item.selected){
                    arr.push(item.name);
                }
            })
            this.setData({
                ['extensionList.['+index+']']: attr,
                ['categoryExtensionField.'+attr.id]: attr.type === 'multiple'?arr: arr[0]
            })
        },
        bindInputFiled(e){
            const id = e.currentTarget.dataset.obj
            this.setData({
                ['categoryExtensionField.'+id]: e.detail
            })
        },
        bindInput(e){
            const id = e.currentTarget.dataset.obj
            this.setData({
                ['categoryExtensionField.'+id]: e.detail.value
            })
        },
        getAttr(id){
            return new Promise((resolve, reject)=>{
                worksServices.worksAttribute(id).then(({data})=>{
                    const obj = {}
                    data.data.forEach(item=>{
                        item.attribute.forEach(val=>{
                            const index = this.data.form.categoryAttribute.findIndex(v=>{return v.value.indexOf(val.id) > -1})
                            if(index > -1){
                                val.selected = true
                            }else{
                                val.selected = false
                            }
                        })
                        obj[item.id] = ''
                    })
                    this.setData({
                        attributeList: data.data,
                        attributeForm: obj
                    })
                    resolve()
                })
            })

        },
        getExtension(id){
            return new Promise((resolve, reject)=>{
                worksServices.worksExtension(id).then(({data})=>{
                    let obj = {};
                    data.data.forEach((item, index)=>{
                        let value = null;
                        if(item.type === 'multiple'){
                            value = this.data.categoryExtensionField[item.id] || []
                        }else{
                            value = this.data.categoryExtensionField[item.id] || ''
                        }
                        if(item.type === 'select' || item.type === 'multiple'){
                            const arr = []
                            item.dataSource.split(',').forEach((val,i)=>{
                                let selected = false;
                                if(value && value.indexOf(val) > -1){
                                    selected = true
                                }
                                arr.push({selected: selected, name: val, id: i})
                            })
                            item.attribute = arr
                        }
                        obj[item.id] = value;
                    })

                    this.setData({
                        extensionList: data.data,
                        categoryExtensionField: obj
                    })
                    resolve()
                })
            })
        },
        tidyAttrData(){
            let checkedLabel = ''
            const obj = [];
            const categoryExtensionField = []
            this.data.attributeList.forEach(item=>{
                const arr = [];
                item.attribute.forEach(val=>{
                    if(val.selected){
                        arr.push(val.id)
                    }
                })
                if(item.chose && arr.length <= 0){
                    checkedLabel = item.label
                }
                obj.push({key: item.id, value: arr.join(',')})
            })
            for(let i in this.data.categoryExtensionField){
                categoryExtensionField.push({key: i, value: this.data.categoryExtensionField[i]})
            }
            this.setData({
                checkedLabel,
                'form.categoryAttribute': obj,
                'form.categoryExtensionField': categoryExtensionField
            })
        },
        getExtensionRequire(){
            const map = {}
            this.data.extensionList.forEach(item=>{
                const val = this.data.categoryExtensionField[item.id]
                if(item.required === 1 && val ===''){
                    let msg = '请输入'
                    if(item.type === 'select'|| item.type ==='multiple'){
                        msg = '请选择'
                    }
                    map[item.id] = msg+item.label
                }
                if(item.rang){
                    const arr = item.rang.split('-');
                    if(val && (val < parseInt(arr[0]) || val > parseInt(arr[1]))){
                        map[item.id] = '请输入'+item.rang+'之间的'+item.label
                    }
                }
            })
            return map
        },
        checkForm(){
            if(!this.data.form.categoryId){
                wx.showToast({title: '请选择分类',icon: 'none'})
                return false;
            }
            if(this.data.checkedLabel){
                wx.showToast({title: `请选择${this.data.checkedLabel}`,icon: 'none'})
                return false
            }
            const extensionMap = this.getExtensionRequire()
            console.log(extensionMap)
            for(let i in extensionMap){
                wx.showToast({title: extensionMap[i],icon: 'none'})
                return false;
            }
            return true;
        },
        handleConfirm(){
            this.tidyAttrData()
            const checked = this.checkForm()
            if(checked){
                this.triggerEvent('confirm', {value: this.data.form, categoryText: this.data.categoryText})
                this.close()
            }
        },
        setCurCategoryOption(obj){
            let selectArr = this.getSelectCategoryArr(obj.categoryId);
            let arr = []
            if(selectArr.length > 0){
                arr = selectArr[selectArr.length-1].children
            }else{
                arr = this.data.list
            }
            arr.forEach(item=>{
                if(item.id === obj.categoryId){
                    item.selected = true
                }else{
                    item.selected = false
                }
            })
            //设置默认扩展属性
            const categoryExtensionField = {}
            if(obj.categoryExtensionField.length > 0){
                obj.categoryExtensionField.forEach(item=>{
                    categoryExtensionField[item.key] = item.value
                })
            }
            this.setData({
                curCategoryOption: arr,
                selectCategoryArr: selectArr,
                form: obj,
                categoryExtensionField
            },()=>{
                console.log(this.data.categoryExtensionField)
                Promise.all([this.getAttr(obj.categoryId), this.getExtension(obj.categoryId)])
            })
        },
        getSelectCategoryArr(id){ //找出所有已选分类
            let tempArr = []
            const item = this.findNode(id, this.data.list)
            const find = (item)=>{
                const parent = this.findNode(item.parent, this.data.list)
                if(parent){
                    tempArr.push(parent)
                    find(parent)
                }
            }
            if(item){
                find(item)
            }
            return tempArr
        },
        findNode(id, list){ //查找父级
            let obj = null;
            const find = (arr)=>{
                for(let i = 0; i < arr.length; i++){
                    const item = arr[i]
                    if(item.id === id){
                        obj = item
                        return;
                    }
                    if(item.children && item.children.length > 0){
                        find(item.children);
                    }
                }
            }
            find(list)
            return obj
        },
        show(obj){
            if(obj.categoryId){
                this.setData({
                    visible: true
                })
                this.setCurCategoryOption(obj)
            }else{
                this.setData({
                    visible: true
                })
            }
        },
        close(){
            this.setData({
                visible: false
            })
        }
    }

});
