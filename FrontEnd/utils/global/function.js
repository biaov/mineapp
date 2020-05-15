/*!
 * Copyright (c) Author biaov
 * Email biaov@qq.com
 * Date 2020-03-05
 */

/**
 * 提示消息
 * @param {String} title - 标题
 * @param {Number} [duration=1500] - 延迟时间
 * @param {Boolean} [mask=true] - 是否需要mask
 * @param {String} [icon=none] - 图标
 * @returns {Void}
 */
const Msg = (title, duration = 1500, mask = true, icon = "none") => {
  //统一提示方便全局修改
  if (Boolean(title) === false) {
    return;
  }
  uni.showToast({
    title,
    duration,
    mask,
    icon
  });
}

/**
 * 加载框
 * @param {String} [title=] - 标题
 * @param {Boolean} [mask=true] - 是否需要mask
 * @returns {Void}
 */
const Loading = (title = "", mask = true) => {
  uni.showLoading({
    title,
    mask
  });
  setTimeout(() => {
    uni.hideLoading();
  }, 1000);
}

/**
 * 下拉刷新
 * @param {Void}
 * @returns {Void}
 */
const PullDownRefresh = () => {
  setTimeout(function() {
    uni.stopPullDownRefresh();
  }, 1000);
}

/**
 * 截取屏幕
 * @param {Void}
 * @returns {Void}
 */
const DrawScreen = async () => {
  return new Promise((resolve, reject) => {
    let pages = getCurrentPages();
    let page = pages[pages.length - 1];
    let ws = page.$getAppWebview();
    let bitmap = new plus.nativeObj.Bitmap('drawScreen');
    // 将webview内容绘制到Bitmap对象中
    ws.draw(bitmap, () => {
      bitmap.save("_doc/drawScreen.jpg", {
        overwrite: true
      }, res => {
        resolve(res.target);
      }, error => {
        reject(error);
      });
      bitmap.clear();
    }, error => {
      reject(error);
    }, {
      check: true, // 设置为检测白屏
    });
  })
}

/**
 * 模态框
 * @param {String} content - 提示内容
 * @param {String} [title=提示] - 提示标题
 */
const ShowModal = async (content, title = "提示") => {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title,
      content,
      cancelColor: "#676666",
      confirmColor: "#DB0404",
      success: function(res) {
        if (res.confirm) {
          resolve();
        } else {
          reject();
        }
      }
    });
  });
}

/**
 * 获取本地图片
 * @param {Void}
 * @returns {Void}
 */
const SelectImg = async () => {
  return new Promise((resolve, reject) => {
    // 调用上传图片方法
    uni.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    });
  });
}

/**
 * 时间转化
 * @param {String|Date} str - 时间字符串或者Date对象 
 * @returns {Object} - 返回时间对象
 * @returns {String|Number} {Object}.Y - 年
 * @returns {String|Number} {Object}.M - 年
 * @returns {String|Number} {Object}.D - 年
 * @returns {String|Number} {Object}.h - 年
 * @returns {String|Number} {Object}.m - 年
 * @returns {String|Number} {Object}.s - 年
 */
const FormatTime = str => {
  let data = new Date(str);
  let Y = data.getFullYear();
  let M = data.getMonth() + 1;
  let D = data.getDate();
  let h = data.getHours();
  let m = data.getMinutes();
  let s = data.getSeconds();
  M = M < 10 ? "0" + M : M;
  D = D < 10 ? "0" + D : D;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  return {
    Y,
    M,
    D,
    h,
    m,
    s
  }
}

/**
 * 预览图片
 * @param {String} url - 图片地址
 * @returns {Void}
 */
const PreviewImg = url => {
  uni.previewImage({
    urls: [url]
  });
}

/**
 * 返回数据统一处理
 * @param {Object} data - 数据对象
 * @param {Number} data.code - 状态码
 * @param {String} data.msg - 提示语
 * @param {Any} data.data - 具体数据
 * @param {Boolean} [isMsg=true] - 是否显示message
 * @returns {Object} - Promise Object
 */
const RequestMsg = (data, isMsg = true) => {
  return new Promise((resolve, reject) => {
    if (data.code == 1) {
      resolve(data.data);
    } else {
      if (isMsg) {
        Msg(data.msg);
      } else {
        console.log(data.msg);
      }
      reject(data);
    }
  });
}
/**
 * 获取本地版本信息
 * @returns {Object} - Promise Object
 */
const VersionInfo = () => {
  return new Promise((resolve, reject) => {
    plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
      resolve(widgetInfo);
    });
  });
}
/**
 * 随机数字
 * @param {Number} [num=6] - 几位数字
 * @param {String} [str=""] - 返回字符串
 * @returns {String} - 几位随机数字拼接字符串
 */
const RandomNumber = (num = 6, str = "") => {
  str += Math.ceil(Math.random() * 9);
  return str.length === num ? str : RandomNumber(num, str);
}
/**
 * ​显示操作菜单
 * @param {Array} array - 按钮数组
 * @returns {Object} - Promise Object
 */
const ShowActionSheet = array => {
  return new Promise((resolve, reject) => {
    // 显示菜单按钮
    uni.showActionSheet({
      itemList: array,
      success: res => {
        resolve(res.tapIndex);
      },
      fail: error => {
        reject(error);
      }
    });
  });
}
/**
 * 页面传值加解密
 * @param {Any} data - 需要传递的值
 * @param {Boolean} [type=false] - 加解密,true:解密,false:加密
 * @returns {Any} - 加密，解密结果
 */
const EnDnCodeURL = (data, type = false) => {
  return type ? JSON.parse(decodeURIComponent(data)) : encodeURIComponent(JSON.stringify(data));
}
export default {
  Msg, // 提示消息
  Loading, // 加载框
  PullDownRefresh, // 下拉刷新
  DrawScreen, // 截取屏幕
  ShowModal, // 模态框
  SelectImg, // 获取本地图片
  FormatTime, // 时间转化
  PreviewImg, // 预览图片
  RequestMsg, // 返回数据统一处理
  VersionInfo, // 获取本地版本信息
  RandomNumber, // 随机数字
  ShowActionSheet, // 显示操作菜单
  EnDnCodeURL // 页面传值加解密
}