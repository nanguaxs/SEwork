Page({
  data:{
    good_id:null,
    good_name:null,
    good_detail:null,
    good_price:null,
    img_path:'',
    good_photo:'-1',
    title:'菜品编辑',
    random:''
  },
  onLoad:function(options){
    console.log(options.good_id)
    this.setData({
      random:Math.random() / 9999
    })
    if(options.good_id==undefined){
      this.setData({
        img_path:"/imgs/photo.png",
        title:"菜品添加"
      });
    }
    else{
      this.setData({
        good_id:options.good_id,
        good_price:options.good_price,
        good_name:options.good_name,
      });
      this.get_goodinfo();
    }
  },
  get_goodinfo(){
    wx.request({
      url: getApp().globalData.server + '/goodinfo',
      method:'POST',
      data: {
        good_id:this.data.good_id,
      },
      success: (res)=>{
        console.log(res.data);
        console.log(res.data)
        this.setData({
          good_name:res.data.info[0][1],
          good_detail:res.data.info[0][2],
          good_price:res.data.info[0][4],
          img_path:getApp().globalData.server+'/image/'+res.data.info[0][3]+'.jpg'+'?'+this.data.random,
          gphoto:res.data.info[0][3]
        })
      }
  })
  },
  choosePhoto:function(){
    wx.chooseImage({
      count:1,
      success:(res)=>{
        console.log(res.tempFiles);
        this.setData({
          img_path:res.tempFilePaths[0]
        })
      }
    })
  },
  finish:function(){ //完成修改
    if(this.data.good_detail.length>200){
      wx.showToast({
        title: '简介限制在两百字内',
        icon:'none'
      });
      return;
    }
    // if(this.data.good_photo=='-1'){
    //   wx: wx.showToast({
    //     title: '请加载商品图片',
    //     icon:"none"
    //   });
    //   return;
    // }
    if(this.data.good_name==null){
      wx: wx.showToast({
        title: '请输入商品名称',
        icon:"none"
      });
      return;
    }
    if(this.data.good_detail==null){
      wx: wx.showToast({
        title: '请输入商品描述',
        icon:"none"
      });
      return;
    }
    if(this.data.good_price==null){
      wx: wx.showToast({
        title: '请输入商品价格',
        icon:"none"
      });
      return;
    }
    if(this.data.good_id==null){//添加商品
      wx.request({
        url: getApp().globalData.server + '/add_good',
        method:'POST',
        data: {
          gname:this.data.good_name,
          gdetail:this.data.good_detail,
          gprice:this.data.good_price,
          gphoto:this.data.good_photo
        },
        success: (res)=>{
          if(res.data.state=='succeed'){
            wx.showToast({
              title: '添加成功,商品号为'+res.data.gid,
              icon:"none"
            });
            console.log(res.data.gid);
            this.editPhoto(res.data.gid);
            wx.redirectTo({
              url: '/pages/business_good/business_good'
            })
          }
          else if(res.data=='fail'){
            wx.showToast({
              title: '修改失败,请检查网络',
              icon:'none'
            });
          }
          else{
            wx.showToast({
              title: '价格不能为负或价格格式错误',
              icon:'none'
            });
          }
        }
      })
    }
    else { //修改商品
      console.log("提交修改");
      wx.request({
        url: getApp().globalData.server + '/edit_good',
        method:'POST',
        data: {
          gid:this.data.good_id,
          gname:this.data.good_name,
          gdetail:this.data.good_detail,
          gprice:this.data.good_price,
          gphoto:this.data.good_id
        },
        success: (res)=>{
          if(res.data=='succeed'){
            wx.showToast({
              title: '修改成功',
            });
            this.editPhoto(this.data.good_id);
            wx.redirectTo({
              url: '/pages/business_good/business_good'
            })
          }
          else if(res.data=='fail'){
            wx.showToast({
              title: '修改失败,请检查网络',
              icon:'none'
            });
          }
          else{
            wx.showToast({
              title: '价格不能为负或价格格式错误',
              icon:'none'
            });
          }
        }
      })
      
    }
  },
  editPhoto:function(gid){
    wx.uploadFile({
      filePath: this.data.img_path,
      name: 'file',
      url: getApp().globalData.server + '/upload_photo',
      formData:{
        gid:gid
      }
    });
    var pages = getCurrentPages()                //获取加载的页面( 页面栈 )
    var prevPage = pages[pages.length - 2]       //获取上一个页面
    prevPage.setData({
      goods:prevPage.data.goods
    })
  },
  getGoodname:function(e){
    this.setData({
      good_name:e.detail.value
    })
  },
  getPrice:function(e){
    this.setData({
      good_price:e.detail.value
    })
  },
  getDetail:function(e){
    this.setData({
      good_detail:e.detail.value
    })
  }
})
