const metaSettings = {
  title: 'Ant Design Pro',
  footer: {
    copyright: 'Test Copyright Info',
    links: [
      { name: 'github', url: '#' },
      { name: 'twitter', url: '#' },
    ],
  },
};

const themeSettings = {
  navTheme: 'light', // Theme for nav menu
  primaryColor: '#52C41A', // Primary color of ant design
  layout: 'sidemenu', // Nav menu position: sidemenu or topmenu

  // Layout of content: Fluid or Fixed, only works when layout is topmenu
  contentWidth: 'Fluid',
  fixedHeader: false, // sticky header
  autoHideHeader: false, // auto hide header
  fixSiderbar: false, // sticky siderbar

  menu: {
    disableLocal: false,
  },

  // your iconfont Symbol Scrip Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont图标项目里要进行批量去色处理
  iconfontUrl: '',
}

module.exports = {
  ...metaSettings,
  ...themeSettings,
};
