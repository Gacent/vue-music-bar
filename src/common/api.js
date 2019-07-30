import {AjaxPlugin, AlertPlugin, ToastPlugin, cookie} from 'vux'
import Vue from 'vue'
import utils from './../common/utils.js'

const urlObj = utils.getUrlParamToObj(decodeURIComponent(window.location.href))

Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
// 根据环境自动设置路径,dev下代理到 "https://map.365daoyou.cn/web",//设置需查看config/index.js
export const apiHostUrl = process.env.API_HOST
// 高德地图逆地理编码  url 企业账号key
export const gaoDeGeocodeUrl =
  'https://restapi.amap.com/v3/geocode/regeo?key=f3288ae97e6adaa02555e5ebf5b32fde'
export const gaoDeDirection =
  'http://restapi.amap.com/v3/direction/walking?key=f3288ae97e6adaa02555e5ebf5b32fde&origin=116.434307,39.90909&destination=116.434446,39.90816'

export const gaodeApikey = {
  direction: '8f26a54028b1ae774c7a269bd3f3ead8',
  geocode: 'f3288ae97e6adaa02555e5ebf5b32fde'
}
// lvji坐标
export const lvjiCoords = [113.404759, 23.164571]

export const redirectAuthUrl = '.#'
// export const redirectAuthUrl = "http://hb.lvjidy.cn/wechat/web/userAuthorization";

// H5定位方法
export const getCoord = function () {
  // let watchPositionID = null; //watchPosition看门狗
  return new Promise(function (resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // 1.获取GPS成功的函数
          let coords = position.coords
          console.log('获取GPS成功!')
          resolve(coords)
        },
        function (err) {
          /** ************************ GPS定位 不成功 处理   **********************************/
          console.log('获取GPS失败!')
          reject(err)
        },
        {
          // 指示浏览器获取高精度的位置，默认为false
          enableHighAccuracy: true,
          // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
          timeout: 4000,
          // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
          maximumAge: 3000
        }
      )
    } else {
      // alert("浏览器不支持定位!");
      reject(err)
    }
  })
}

// 授权信息
const authorization = {
  // token: process.env.NODE_ENV === 'development' ? 'b2c8388d3050715a0e89f96989c30e17' : window.urlObj("token"),
  // sk: process.env.NODE_ENV === 'development' ? 'C58rImzGkPg%3D' : window.urlObj("sk"),
  token: urlObj['token'],
  sk: urlObj['sk'],
  userId: urlObj['userId']
}

// 存放api接口数据
import apiArray from './apiArray'
import {debug} from 'util'

let api = {}
api.authorization = authorization

apiArray.map(function (ele, index) {
  api[ele['fnName']] = new ApiCreateFn(ele)
})

// api 构造函数
function ApiCreateFn (options) {
  if (options.method == 'post' || options.method == 'put') {
    return function (reqParams) {
      reqParams = (reqParams || {})
      let headers = null
      if (!authorization.token) {
        let params = utils.getUrlParamToObj(location.href)
        authorization.token = params['token']
      }
      return new Promise(function (resolve, reject) {
        if (options.needAuth == true) {
          headers = {
            'Content-Type': 'application/json',
            token: sessionStorage.getItem('token')
          }
        }
        AjaxPlugin.$http({
          url: replaceUrl(apiHostUrl + process.env.URL_PATH + options.url, reqParams),
          method: options.method,
          data: reqParams,
          headers: headers
        }
        ).then(res => {
          if (res.data.code == 200) {
            let data = res.data.data
            resolve({data: data, msg: res.data.msg, status: res.data.status, ...res.data})
          } else {
            let data = res.data
            console.log(res.data.msg, '请求错误!url=' + options.url)
            // if (data.msg == "need_wechat_user_authorization" || data.msg === "token_error" || data.msg == "userId_error" || data.msg == "userId_token_is_not_null") {
            //   window.location.href = redirectAuthUrl
            // }
            reject({
              code: res.data.code,
              msg: data.msg
            })
          }
        }, err => {
          console.log(err.msg, '请求错误!url=' + options.url)
          reject(err)
        })
      })
    }
  } else if (options.method == 'get') {
    return function (reqParams) {
      reqParams = (reqParams || {})
      let headers = null

      if (!authorization.token) {
        let params = utils.getUrlParamToObj(location.href)
        authorization.token = params['token']
      }

      return new Promise(function (resolve, reject) {
        if (options.needAuth == true) {
          headers = {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            token: sessionStorage.getItem('token')
          }
        }

        function reqParamsHandler (reqParams) {
          let tempUrl = ''
          if (Object.keys(reqParams).length) {
            tempUrl = '?'
            Object.keys(reqParams).map((item, index) => {
              if (reqParams[item]) {
                tempUrl += item + '=' + reqParams[item]
              }
            })
          }
          return tempUrl
        }

        AjaxPlugin.$http.get(replaceUrl(apiHostUrl + process.env.URL_PATH + options.url, reqParams) + reqParamsHandler(reqParams), { headers: headers }).then(res => {
          if (res.data.code == 200) {
            let data = res.data.data
            resolve({data: data, msg: res.data.msg})
          } else {
            let data = res.data
            console.log(res.data.msg, '请求错误!url=' + options.url)
            // if (data.msg == "need_wechat_user_authorization" || data.msg === "token_error" || data.msg == "userId_error" || data.msg == "userId_token_is_not_null") {
            //   window.location.href = redirectAuthUrl
            // }
            reject({
              code: res.data.code,
              msg: data.msg
            })
          }
        }, err => {
          console.log(err.msg, '请求错误!url=' + options.url)
          reject(err)
        })
      })
    }
  }
}

function replaceUrl (url, reqParams = {}) {
  let re = /{(\w+)}/, match
  while (match = re.exec(url)) {
    var str = match[0], key = match[1].trim()
    url = url.replace(str, encodeURI(authorization[key] || reqParams[key]))
    delete reqParams[key]
  }
  return url
}

export default api
