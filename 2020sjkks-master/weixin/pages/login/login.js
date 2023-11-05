// pages/login/index.js！！！！！！！
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    password:'',
    curfId: -1,
    selectedId: null, // 初始化为null，表示未选择
    selectedName: '', // 初始化为空字符串
    fruits: [{name: "普通用户" ,id: 1},
    {name: "商家" ,id: 2},
    {name: "骑手" ,id: 3}
   ],
   curfruitName:"" ,
   title: "请选择您的身份"
  },

  changeFruit(e){
    const { selectId, select } = e.detail; // 从事件对象中获取子组件传递的值
    this.setData({
      curfId: selectId, // 保存选中的id
      curfruitName: select, // 保存选中的name
    });
  },

  login:function(){
    let name = this.data.name
    let password = this.data.password
    let status=this.data.curfId
    if (name == '') {
      wx: wx.showToast({
        title: '请输入姓名',
        icon:'none'
      })
      return false
    }
    else if ( password== '') {
      wx: wx.showToast({
        title: '请输入密码',
        icon:"none"
      })
      return false
    }
    else if (name=='admin' && password=='12345'){
      wx.redirectTo({
        url: '/pages/business_home/business_home'
      })
    }
    else{
      wx.request({
      url: getApp().globalData.server + '/login',
      data: {
        name:name,
        password:password,
        status:status
      },
      method:"POST",
      success: (res) => {
        console.log(res.data['state'])
        if(res.data['state']=='not_exist'){
          wx: wx.showToast({
            title: '用户不存在',
            icon:"none"
          })
          return false
        }
        else if(res.data['state']=='fail'){
          wx: wx.showToast({
            title: '密码不正确',
            icon:"none"
          })
          return false
        }
        else if(res.data['state']='succeed'){
          var app=getApp(); 
          app.globalData.uid=res.data['user_info'][0] 
          app.globalData.uname=res.data['user_info'][1] 
          app.globalData.uphoto=res.data['user_info'][2] 
          app.globalData.uaddress=res.data['user_info'][3] 
          app.globalData.upassword=res.data['user_info'][4] 
          console.log(app.globalData.upassword)
          app.globalData.uphone=res.data['user_info'][5]
          wx.switchTab({
            url: "/pages/index/index",
          })
        }
      }
    })
  }
  },
  //注册
  register:function(){
    let name = this.data.name
    let password = this.data.password
    let status=this.data.curfId
    if (name == '') {
      wx: wx.showToast({
        title: '请输入姓名',
        icon:"none"
      })
      return false
    }
    else if ( password== '') {
      wx: wx.showToast({
        title: '请输入密码',
        icon:"none"
      })
      return false
    }
    else if (name=='admin'){
      wx: wx.showToast({
        title: '用户名存在',
        icon:"none"
      })
      this.setData({
        name:'',
        password:'',
      })
      return false
    }
    else{
      wx.request({
      url: getApp().globalData.server + '/register',
      data: {
        name:this.data.name,
        password:this.data.password,
        status:status
      },
      method:"POST",
      success: (res) => {
        console.log(res.data)
        if(res.data=='succeed'){
          wx: wx.showToast({
            title: '成功请登录',
            icon:"none"
          })
          return false
        }
        else if(res.data=='exist'){
          wx: wx.showToast({
            title: '用户名存在',
            icon:"none"
          })
          this.setData({
            name:'',
            password:'',
          })
          return false
        }
      }
    })}
  },
  //获取用户名
  getUsername:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  //获取密码
  getPassword:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  }
})