export default [
  {
    /*
     * 获取app基础数据
     * @param options
     * 请求方式 method: get
     * @returns {Promise}
     */
    fnName: 'getBaseData', // 函数名字
    method: 'get', // 请求方式
    url: '/api/pt/scenic/{sk}', // 请求链接
    needAuth: true
  },
  {
    /*
     * 获取新闻列表
     * @param options
     * 请求方式 method: get
     * @returns {Promise}
     */
    fnName: 'getNewsList', // 函数名字
    method: 'get', // 请求方式
    url: '/api/pt/information/{sk}', // 请求链接
    needAuth: true
  },
  {
    /*
     * 获取景区概括
     * @param options
     * 请求方式 method: get
     * @returns {Promise}
     */
    fnName: 'getScenicAbout', // 函数名字
    method: 'get', // 请求方式
    url: '/api/pt/scenic/scenicAbout/{sk}', // 请求链接
    needAuth: true
  },
  {
    /*
     * 获取新闻咨询
     * @param options
     * 请求方式 method: get
     * @returns {Promise}
     */
    fnName: 'getInformation', // 函数名字
    method: 'get', // 请求方式
    url: '/api/pt/information/{sk}', // 请求链接
    needAuth: true
  },
  {
    /*
     * 获取用户反馈错误项
     * @param options
     * 请求方式 method: get
     * @returns {Promise}
     */
    fnName: 'getProblemType', // 函数名字
    method: 'get', // 请求方式
    url: '/api/pb/userProblemTyp/action/list', // 请求链接
    needAuth: true
  },
  {
    /*
     * 提交反馈
     * @param options
     * 请求方式 method: get
     * @returns {Promise}
     */
    fnName: 'submitUserProblem', // 函数名字
    method: 'post', // 请求方式
    url: '/api/pt/scenic/userProblem', // 请求链接
    needAuth: true// 是否要需要授权
  },
  {
    /*
     * 获取服务点
     * @param options
     * 请求方式 method: get
     * @returns {Promise}
     */
    fnName: 'getServicePoint', // 函数名字
    method: 'get', // 请求方式
    url: '/api/pt/scenic/servicePoint/{sk}/{typeId}', // 请求链接
    needAuth: true// 是否要需要授权
  },
  {
    /*
     * 获取景点 活动列表
     * @param options
     * 请求方式 method: get
     * @returns {Promise}
     */
    fnName: 'getActivityList', // 函数名字
    method: 'get', // 请求方式
    url: '/api/pt/activity/{sk}', // 请求链接
    needAuth: true// 是否要需要授权
  },
  {
    /*
     * 获取景区 活动列表
     * @param options
     * 请求方式 method: get
     * @returns {Promise}
     */
    fnName: 'getScenicActivityList', // 函数名字
    method: 'get', // 请求方式
    url: '/api/pt/activity/{sk}', // 请求链接
    needAuth: true// 是否要需要授权
  },
  {
    /*
     * 传递参数给小程序层
     * @param options
     * 请求方式 method: get
     * @returns {Promise}
     */
    fnName: 'submitH5Information', // 函数名字
    method: 'post', // 请求方式
    url: '/api/pt/h5Information', // 请求链接
    needAuth: true// 是否要需要授权
  },
  {
    /*
     * 使用帮助
     * @param options
     * 请求方式 method: get
     * @returns {Promise}
     */
    fnName: 'getHelpList',
    method: 'get',
    url: '/api/pt/usingHelp/{sk}',
    needAuth: true
  },
  {
    /*
     * 获取景区列表
     * @param options
     * 请求方式 method: get
     * @returns {Promise}
     */
    fnName: 'getScenicList', // 函数名字
    method: 'get', // 请求方式
    url: '/api/pt/scenic/scenicPage', // 请求链接
    needAuth: true// 是否要需要授权
  },
  {
    /*
     * 获取config校验参数
     * @param options
     * 请求方式 method: get
     * @returns {Promise}
     */
    fnName: 'getJSSDKConfigData',                 // 函数名字
    method: 'post',                               // 请求方式
    url: '/api/pb/user/wechatConfig', // 请求链接
    needAuth: true// 是否要需要授权
  },
  {
    /*
     * 判断用户是否首次登陆
     * @param options
     * 请求方式 method: get
     * @returns {Promise}
     */
    fnName: 'checkUserInfo', // 函数名字
    method: 'get', // 请求方式
    url: '/api/pt/user/action/check', // 请求链接
    needAuth: true// 是否要需要授权
  },
  {
    /*
     * 获取用户的基本信息
     * @param options
     * 请求方式 method: get
     * @returns {Promise}
     */
    fnName: 'getUserInfo', // 函数名字
    method: 'get', // 请求方式
    url: '/api/pt/user/action/getBaseInfo', // 请求链接
    needAuth: true // 是否要需要授权
  },
  {
    /*
     * 更新用户基本信息
     * @param options
     * 请求方式 method: get
     * @returns {Promise}
     */
    fnName: 'updateUserInfo', // 函数名字
    method: 'put', // 请求方式
    url: '/api/pt/user', // 请求链接
    needAuth: true // 是否要需要授权
  },
  {
    /*
     * 更新用户基本信息
     * @param options
     * 请求方式 method: get
     * @returns {Promise}
     */
    fnName: 'uploadFile', // 函数名字
    method: 'post', // 请求方式
    url: '/pt/upload/file', // 请求链接
    needAuth: true// 是否要需要授权
  },
  {
    /*
     * 获取语言类型列表
     * @param options
     * 请求方式 method: get
     * @returns {Promise}
     */
    fnName: 'getLanguageList', // 函数名字
    method: 'get', // 请求方式
    url: '/api/pb/language/{sk}', // 请求链接
    needAuth: true// 是否要需要授权
  },
  // 搜索周边服务
  {
    fnName: 'searchService',
    method: 'get',
    url: '/api/pt/statistics/action/searchList/{sk}/{keyword}',
    needAuth: true
  },
  {
    fnName: 'searchRecord',
    method: 'post',
    url: '/api/pt/statistics/searchRecord/{sk}',
    needAuth: true
  },
  {
    fnName: 'reportListenInStatistics',
    method: 'post',
    url: '/api/pt/statistics/listenInStatistics',
    needAuth: true
  },
  {
    fnName: 'reportMovingTrack',
    method: 'post',
    url: '/api/pt/statistics/movingTrack/{sk}',
    needAuth: true
  },
  {
    fnName: 'getUserExtraProperty',
    method: 'get',
    url: '/api/pt/extraProperty/action/list',
    needAuth: true
  },
  {
    fnName: 'getAllScenicPoint',
    method: 'get',
    url: '/api/pt/scenic/{sk}/subScenics',
    needAuth: true
  },
  {
    fnName: 'getServiceDetail',
    method: 'get',
    url: '/api/pt/statistics/action/scenicPoiDetail/{id}',
    needAuth: true
  },
  {
    // 发起支付请求
    fnName: 'getburorder',
    method: 'post',
    url: '/api/pt/wxPay/unifiedOrder/{sk}/{languageId}',
    needAuth: true
  },
  {
    // 检查是否购买过语音包
    fnName: 'getorderstatus',
    method: 'get',
    url: '/api/pt/order/user/{sk}/{languageId}',
    needAuth: true
  },
  {
    fnName: 'getlanfggListdata',
    method: 'get',
    url: '/api/pb/language/buy/{sk}',
    needAuth: true
    ///
  },
  {
    // 获取景区相关信息
    fnName: 'getinfobuysecnic',
    method: 'get',
    url: '/api/pt/scenic/subScenics/buy/{sk}',
    needAuth: true
  },
  {
    // 获取天气数据
    fnName: 'getweatherdataApi',
    method: 'get',
    url: '/api/weather',
    needAuth: false
  },
  {
    // 获取当前车位
    fnName: 'getcurrentcar',
    method: 'get',
    url: '/api/carport/current',
    needAuth: false
  },
  {
    // 获取总车位
    fnName: 'getcarportsummary',
    method: 'get',
    url: '/api/carport/summary',
    needAuth: false
  },
  // 获取验证码
  {
    fnName: 'getloginAuthCode',
    method: 'post',
    url: '/api/pt/user/loginAuthCode',
    needAuth: true
  },
  // 绑定手机
  {
    fnName: 'getcheckAuthCode',
    method: 'post',
    url: '/api/pt/user/checkAuthCode',
    needAuth: true
  },
  // 根据景区主键获取可以领取的红包类型
  {
    fnName: 'getredpackList',
    method: 'get',
    url: '/api/pt/redPackType/{sk}',
    needAuth: true
  },
  // 获取广告信息列表
  {
    fnName: 'getadvertList',
    method: 'get',
    url: '/api/pt/advert/{sk}',
    needAuth: true
  },
  // 判断用户是否需要广告弹窗
  {
    fnName: 'getisneedadvertld',
    method: 'post',
    url: '/api/pt/advert/action/user/{sk}/{typeId}',
    needAuth: true
  },
  // 判断红包的状态 /api/pt/redPack/cashed/{typeId}
  {
    fnName: 'ishaveThemonryRdpack',
    method: 'get',
    url: '/api/pt/redPack/cashed/{typeId}',
    needAuth: true
  },
  // 更新广告点击量
  {
    fnName: 'advertClicks',
    method: 'post',
    url: '/api/pt/advert/statistic/clicks/{advertId}/{advertMerchantId}',
    needAuth: true
  },
   // 更新广告点击量
  {
    fnName: 'advertViews',
    method: 'post',
    url: '/api/pt/advert/statistic/views/{advertId}/{advertMerchantId}',
    needAuth: true
  }
]
