// components/score/score.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [
      '../../imgs/star1.png',
        '../../imgs/star1.png',
        '../../imgs/star1.png',
        '../../imgs/star1.png',
        '../../imgs/star1.png',
    ],
    number: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    scoring: function (e) {   
      let idx = e.target.dataset.index
      let list = [
        '../../imgs/star1.png',
        '../../imgs/star1.png',
        '../../imgs/star1.png',
        '../../imgs/star1.png',
        '../../imgs/star1.png',
      ]
      for (let i = 0; i <= idx; i++) {
        list[i] = '../../imgs/star2.png'
      }
      this.setData({
        list,
        number: idx + 1
      })
      this.triggerEvent('scoring', {fraction: this.data.number})
    }
  }
})