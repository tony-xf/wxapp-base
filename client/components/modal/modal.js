Component({
  properties: {
      isOpen: {
          type: Boolean,
          value: !1,
          observer: function(t) {
              t ? this.show() : this.hide();
          }
      },
      title: String,
      modalStyle: String,
      layoutStyle: String,
      hdStyle: String,
      showCancel: {
          type: Boolean,
          value: !0
      },
      cancelText: {
          type: String,
          value: "取消"
      },
      showConfirm: {
          type: Boolean,
          value: !0
      },
      confirmText: {
          type: String,
          value: "确定"
      }
  },
  data: {
      visible: !1
  },
  methods: {
      handleTapCancel: function() {
          this.triggerEvent("cancel");
      },
      handleTapConfirm: function() {
          this.triggerEvent("confirm");
      },
      handleTapBackdrop: function() {
          this.triggerEvent("tapbackdrop");
      },
      show: function() {
          this.setData({
              visible: true,
              animateCss: "animate-fade-in"
          })
      },
      hide: function() {
          this.setData({
              animateCss: "animate-fade-out"
          }), setTimeout(() => {
              this.setData({
                  visible: false
              });
          }, 300);
      }
  }
});