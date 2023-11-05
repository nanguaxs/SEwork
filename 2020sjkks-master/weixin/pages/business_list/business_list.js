Page({
  data: {
    // 数据源
    business_users:[//0:uid,1:uname,2:uphoto
    ],
    sales:[],
    business_user_list:{     //购物车商品 {菜品Aid:数量,菜品Bid:数量...}
    },
    best:[],
    random:'',
    swiperIdx: 0,
    url:getApp().globalData.server,
  },
  onLoad:function(options){ 
    this.setData({
      random:Math.random() / 9999
    })
    this.show_business();
  //   this.get_sales();
  },
  show_business:function(){ //获取菜品信息
    console.log("tap");
    wx.request({
      url: getApp().globalData.server + '/show_business',
      method:'POST',
      complete: (res) => {
        console.log(res.data);
        this.setData({
          business_users:res.data.data
        })
      }
        //创建选菜单表
      //   for (var item of res.data) { //获取热门推荐
      //     //console.log(item);
      //     this.setData(
      //       {
      //         ['business_user_list.'+item[0]]:0,
      //       })
          //   wx.request({
          //     url: getApp().globalData.server + '/get_best_good',
          //     method:'POST',
          //     success:(res1)=>{
          //       var best=[]
          //       if(res1.data.state=='succeed'){
          //         for(var index in res1.data.data){
          //           for(var i in res.data){
          //             if(res.data[i][0]==res1.data.data[index][0])
          //               best.push(i);
          //               //console.log(best);
          //           }
          //         }
          //         this.setData({
          //           best:best
          //         })
          //       //console.log(this.data.best)
          //       }
          //     }
          //   })
      //   }},
    })
  },
  goto_business_page:function(){
      wx.navigateTo({
          url: "/pages/index/index",})
  },
  onShow:function(){
  }
})