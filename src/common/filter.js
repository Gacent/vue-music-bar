var dayjs = require('dayjs')

export function toCurrency (v) {
  return isNaN(parseFloat(v)) ? 'NaN' : Number(v).toFixed(2)
}

export const timeFromat = (time) => {
  //typeof time
  let remoteTime = new Date(time).getTime(),
    nowTime = new Date().getTime(),
    minute = (nowTime - remoteTime) / (1000 * 60),
    hours = minute / 60,
    days = hours / 24,
    years = days / 365

  //0-60分钟显示“XX分钟前“
  //1-24小时显示”XX小时前“
  //超过1天显示”XX天前“
  if (minute > 0 && minute < 60) {
    return Math.floor(minute) + '分钟前'
  } else if (hours >= 1 && hours <= 24) {
    return Math.floor(hours) + '小时前'
  } else if (days > 1 && days < 365) {
    return Math.floor(days) + '天前'
  } else if (years > 1) {
    return Math.floor(days) + '年前'
  } else {
    return '几分钟前'
  }
}

export const formatTime = (time = Date.now, unit) => {
  return dayjs(time).format(unit)
}


export function formatSeconds (value) {
  var theTime = parseInt(value)// 需要转换的时间秒
  var theTime1 = 0// 分
  var theTime2 = 0// 小时
  var theTime3 = 0// 天

  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60)
    theTime = parseInt(theTime % 60)
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60)
      theTime1 = parseInt(theTime1 % 60)
      if (theTime2 > 24) {
        //大于24小时
        theTime3 = parseInt(theTime2 / 24)
        theTime2 = parseInt(theTime2 % 24)
      }
    }
  }
  var result = ''
  if (theTime >= 0) {
    result = parseInt(theTime)
    result = result == 0
      ? '00'
      : result >= 10
        ? result
        : '0' + result
    result = '' + result
  }
  if (theTime1 >= 0) {
    result = '' + (parseInt(theTime1) >= 10 ? parseInt(theTime1) : '0' + parseInt(theTime1)) + ':' + (result <= 0 ? '00' : result)
  }
  return result
}
