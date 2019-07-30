export default {
  // 主机地址
  // apiHostUrl: './',//product环境
  apiHostUrl: process.env.API_HOST, // 根据环境自动设置路径,dev下代理到 "https://map.365daoyou.cn/web",//设置需查看config/index.js
  // apiHostUrl: 'http://testmap.365daoyou.cn/web/',//远程服务器环境
  // 高德地图逆地理编码  url 企业账号key
  gaodeApiKeyUrl: 'https://restapi.amap.com/v3/geocode/regeo?key=f3288ae97e6adaa02555e5ebf5b32fde',
  // 高德地图ip定位编码  url 企业账号key
  gaodeIpKeyUrl: 'https://restapi.amap.com/v3/ip?output=json&key=490cd315c643014c555dd49d4454cc76',
  // 驴迹GPS
  lvjiCoords: [113.404759, 23.164571],
  lvjiGPS: [113.39927, 23.16685],

  /** ********************** 操作 localStorage ***********************************/
  /*
   * 操作cookie
   * @setCookie :写入 localStorage
   * @getCookie :读取 localStorage
   * @removeCookie :删除 localStorage
   * @clearCookie : 清空 localStorage
   * @returns {{setCookie: setCookie, getCookie: setCookie, removeCookie: removeCookie, clearCookie: removeCookie}}
   */

  localStorage: {
    setLocalStorage: function (key, value) {
      if (window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
    },
    // 获取 localStorage
    getLocalStorage: function (key) {
      if (window.localStorage) {
        let valuArr = window.localStorage.getItem(key) || '';
        // console.log(valuArr);
        (valuArr != '') && (valuArr = JSON.parse(valuArr))
        return valuArr
      }
    },
    // 删除 localStorage
    removeLocalStorage: function (key) {
      if (window.localStorage) {
        window.localStorage.removeItem(key)
        return true
      }
    },
    // 清空 localStorage
    clearLocalStorage: function (key) {
      if (window.localStorage) {
        window.localStorage.setItem(key, [])
        return true
      }
    }

  },

  deepCopy: function (obj) {
    // Handle the 3 simple types, and null or undefined or function
    if (obj == null || typeof obj !== 'object') return obj

    // Handle Date
    if (obj instanceof Date) {
      var copy = new Date()
      copy.setTime(obj.getTime())
      return copy
    }
    // Handle Array or Object
    if (obj instanceof Array | obj instanceof Object) {
      var copy = (obj instanceof Array) ? [] : {}
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = this.deepCopy(obj[attr])
        }
      }
      return copy
    }
    throw new Error('Unable to clone obj! Its type isn\'t supported.')
  },

  cookie: {
    setCookie: function (c_name, value, expiredays) {
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + (expiredays || 100000))
      if (window.localStorage) { // 如果支持localstorage,则使用localstorage保存数据
        window.localStorage[c_name] = JSON.stringify({val: value, date: exdate})
      } else { // 否则使用cookies保存数据
        document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
      }
    }, // 佳锦

    getCookie: function (name) {
      var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      if (arr = document.cookie.match(reg)) {
        return unescape(arr[2])
      } else {
        return null
      }
    },
    romoveCookie: function (name) {
      var exp = new Date()
      exp.setTime(exp.getTime() - 1)
      var cval = getCookie(name)
      if (cval != null) {
        document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
      }
    }

  },

  /** ********************** 判断浏览器 ios，安卓，pc ***********************************/
  os: (function () {
    let ua = navigator.userAgent,
      isWindowsPhone = /(?:Windows Phone)/.test(ua),
      isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
      isAndroid = /(?:Android)/.test(ua),
      isFireFox = /(?:Firefox)/.test(ua),
      isChrome = /(?:Chrome|CriOS)/.test(ua),
      isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
      isPhone = /(?:iPhone)/.test(ua) && !isTablet,
      isPc = !isPhone && !isAndroid && !isSymbian,
      isWechat = /(MicroMessenger)/i.test(ua),
      isUC = /(UCBrowser)/i.test(ua),
      isIOS = /(iPhone|iPad|iPod|iOS)/i.test(ua),
      isMobile = !isPc,
      isMiniWechat = window.__wxjs_environment === 'miniprogram' || /(miniProgram)/i.test(ua)

    return {
      isTablet: isTablet,
      isPhone: isPhone,
      isAndroid: isAndroid,
      isPc: isPc,
      isMobile: isMobile,
      isUC: isUC,
      isIOS: isIOS,
      isWechat: isWechat,
      isChrome: isChrome,
      isMiniWechat: isMiniWechat
    }
  })(),
  /** *********************************** GPS信号处理 转换 *************************************/
  /*
   * gps转换相关的方法。。 主要对GPS进行纠偏计算,将基于国际标准(WGS-84)的坐标转换成中国的国家标准(GCJ-02)的坐标系的坐标
   * 使用案例: GPS.gcj_encrypt(coords.latitude, coords.lnggitude)   //WGS-84 to GCJ-02
   * @returns {{gcj_encrypt, outOfChina, transformLat, transformlng}}
   * @constructor
   */
  GPS:
  {
    PI: 3.14159265358979324,
    x_pi:
        3.14159265358979324 * 3000.0 / 180.0,
    delta:

        function (lat, lng) {
          var a = 6378245.0 //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
          var ee = 0.00669342162296594323 //  ee: 椭球的偏心率。
          var dLat = this.transformLat(lng - 105.0, lat - 35.0)
          var dlng = this.transformlng(lng - 105.0, lat - 35.0)
          var radLat = lat / 180.0 * this.PI
          var magic = Math.sin(radLat),
            magic = 1 - ee * magic * magic
          var sqrtMagic = Math.sqrt(magic),
            dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI),
            dlng = (dlng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI)
          var pt = {
            'lat': dLat,
            'lng': dlng
          }
          return pt
        },

      // WGS-84 to GCJ-02
    gcj_encrypt: function (wgsLat, wgslng) {
        if (this.outOfChina(wgsLat, wgslng)) {
          return {
            'lat': wgsLat,
            'lng': wgslng
          }
        }

        var d = this.delta(wgsLat, wgslng)
        var pt = {
          'lat': wgsLat + d.lat,
          'lng': wgslng + d.lng
        }

        return pt
      },

      // GCJ-02 to WGS-84
    gcj_decrypt: function (gcjLat, gcjlng) {
        if (this.outOfChina(gcjLat, gcjlng)) {
          return {'lat': gcjLat, 'lng': gcjlng}
        }

        var d = this.delta(gcjLat, gcjlng)
        return {'lat': gcjLat - d.lat, 'lng': gcjlng - d.lng}
      },
    outOfChina: function (lat, lng) {
      if (lng < 72.004 || lng > 137.8347) {
          return true
        }
      if (lat < 0.8293 || lat > 55.8271) {
          return true
        }
      return false
    },

    transformLat: function (x, y) {
        var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0
        ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0
        ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0
        return ret
      },

    transformlng: function (x, y) {
        var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0
        ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0
        ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0
        return ret
      }
  },

  getUrlParam: function (url, name) {
    var rul = url || window.location.href
    var reg = new RegExp('(^|&|#?)' + name + '=([^&|#]*)(/|&|$|#)')
    // var reg = new RegExp("(^|&?)" + name + "=([^&]*)(/|&|$)");
    var r = url
      .substr(1)
      .match(reg)
    if (r != null) {
      return r[2]
    }
    return null
  },
  appendParamsToUrl (url, query) {
    url += '?'
    for (let key in query) {
      url += key + '=' + query[key] + '&'
    }
    return url.substr(0, url.length - 1)
  },
  // 将Url的参数转换为一个对象
  getUrlParamToObj (pageUrl) {
    var argObj = {},
      argStr
    argStr = pageUrl.split('?')
    if (!argStr[1]) return {}
    argStr[1].replace(/([^\/?&=]*)=([^\/?&=]*)/g, (match, $1, $2) => {
      if ($1) {
        argObj[$1] = $2.replace('#', '')
      }
      if ($1 == 'token') {
        sessionStorage.setItem('token', $2.replace('#', ''))
      }
    })
    return argObj
  },
  getVerityCode: function (key) {
    let verifyCode = {
      codeInUrl: null,
      codeInLocatStorage: null,
      codeInCookie: null
    }
    /*
    * 1. 获取授权码的规则是:优先获取url中的授权码
    * 2. 然后如果浏览器支持,则获取localStorage中的授权码
    * 3. 如果浏览器不支持localStorage,则获取document.cookie中的授权码
    * 保存格式:{  "val":"1231321","date":"1231321545" }
    * */
    // 1. 获取url中的授权码
    if (location.href.match(/\&c\=([0-9]+)/)) { // 判断url中有没有code
      verifyCode.codeInUrl = location
        .href
        .match(/\&c\=([0-9]+)/)[1] // 取出同程给的url参数上的授权码
    } else {
      // 2. 获取localStrorage中的授权码
      if (window.localStorage) {
        let codeInLocatStorage = JSON.parse(window.localStorage.getItem(key)) || ''
        if (codeInLocatStorage != '') {
          verifyCode.codeInLocatStorage = codeInLocatStorage.val
        }
      } else {
        // 3. 获取cookie中的授权码
        let codeInCookie = (function () {
          let name = key//
          var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
          if (arr = document.cookie.match(reg)) {
            return unescape(arr[2])
          } else {
            return null
          }
        })();
        (codeInCookie != null) && (codeInCookie != '') && (verifyCode.codeInCookie = verifyCode.val)
      }
    }
    return verifyCode
  },
  saveVerityCode: function (c_name, value, expiredays) {
    /*
     * 1. 保存授权码的规则是:优先保存在localStorage
     * 2. 然后如果浏览器不支持localStorage,则保存在document.cookie
     *    保存格式:{ "val":"1231321","date":"1231321545" }
     * */
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + (expiredays || 100000))
    if (window.localStorage) { // 如果支持localstorage,则使用localstorage保存数据
      // 保存格式:{  "val":"1231321","date":"1231321545" }
      window.localStorage[c_name] = JSON.stringify({val: value, date: exdate})
    } else { // 否则使用cookies保存数据
      document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
    }
  },

  /**
   * 判断某个点是否在polygon里面 piont=[latitude,lnggitude];
   * APoints=[piont,piont,piont,piont.....]
   * 使用案例: IsPtInPoly([lat, lng], marker.area)
   * */

  IsPtInPoly: function (point, APoints) {
    var iSum = 0,
      iCount,
      ALat = point[0],
      Alng = point[1]

    var dlng1, dlng2, dLat1, dLat2, dlng
    if (APoints.length < 3) return false
    iCount = APoints.length
    for (var i = 0; i < iCount; i++) {
      if (i == iCount - 1) {
        dlng1 = APoints[i][1]
        dLat1 = APoints[i][0]
        dlng2 = APoints[0][1]
        dLat2 = APoints[0][0]
      } else {
        dlng1 = APoints[i][1]
        dLat1 = APoints[i][0]
        dlng2 = APoints[i + 1][1]
        dLat2 = APoints[i + 1][0]
      }
      // 以下语句判断A点是否在边的两端点的水平平行线之间，在则可能有交点，开始判断交点是否在左射线上
      if ((ALat >= dLat1 && ALat < dLat2) || (ALat >= dLat2 && ALat < dLat1)) {
        if (Math.abs(dLat1 - dLat2) > 0) {
          // 得到 A点向左射线与边的交点的x坐标：
          dlng = dlng1 - (dlng1 - dlng2) * (dLat1 - ALat) / (dLat1 - dLat2)
          if (dlng < Alng) iSum++
        }
      }
    }
    if (iSum % 2 != 0) return true
    return false
  },

  // https://github.com/substack/point-in-polygon/blob/master/index.js
  inside: function (point, vs) {
    var x = point[0], y = point[1]
    var inside = false
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1]
      var xj = vs[j][0], yj = vs[j][1]

      var intersect = ((yi > y) != (yj > y)) &&
        (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
      if (intersect) inside = !inside
    }
    return inside
  },
  JSONSafeParse: (str, defaultVal) => {
    let ret = defaultVal
    try {
      ret = JSON.parse(str)
    } catch (e) {
      console.warn('parse err when parse', str)
    }
    return ret
  },
  getNetworkType (cb) {
    if (typeof WeixinJSBridge !== 'undefined') {
      WeixinJSBridge.invoke('getNetworkType', {}, e => {
        // blabla
        let msg = e.err_msg
        if (msg === 'network_type:wifi') {
          cb({type: 'wifi'})
        } else if (msg == 'network_type:edge' || msg == 'network_type:wwan') {
          cb({type: '4g'})
        } else {
          cb({type: 'none'})
        }
      })
    } else if (this.os.isWechat) {
      // 微信小程序
      wx && wx.getNetworkType({
        success: res => {
          let type = res.networkType
          if (type === 'wifi') {
            cb({type: 'wifi'})
          } else if (type === '2g' || type == '3g' || type == '4g') {
            cb({type: '2g/3g/4g'})
          } else {
            cb({type: 'none'})
          }
        }
      })
    } else {
      cb({type: 'wifi'})
    }
  },
  throttle: function (func, wait, options) {
    var context, args, result
    var timeout = null
    var previous = 0
    if (!options) options = {}
    var later = function () {
      previous = options.leading === false ? 0 : Date.now()
      timeout = null
      result = func.apply(context, args)
      if (!timeout) context = args = null
    }
    return function () {
      var now = Date.now()
      if (!previous && options.leading === false) previous = now
      var remaining = wait - (now - previous)
      context = this
      args = arguments
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }
        previous = now
        result = func.apply(context, args)
        if (!timeout) context = args = null
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining)
      }
      return result
    }
  },
  getBase64 (img) {
    function getBase64Image (img, width, height) { // width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
      var canvas = document.createElement('canvas')
      canvas.width = width || img.width
      canvas.height = height || img.height

      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      var dataURL = canvas.toDataURL()
      return dataURL
    }
    var image = new Image()
    image.crossOrigin = 'Anonymous'
    // eslint-disable-next-line no-undef
    var deferred = $.Deferred()
    if (img) {
      image.onload = function () {
        deferred.resolve(getBase64Image(image))// 将base64传给done上传处理
      }
      image.src = img
      return deferred.promise()// 问题要让onload完成后再return sessionStorage['imgTest']
    }
  }
}
