export default {
  plugins: {
    autoprefixer: {},
    // https://github.com/wswmsword/postcss-mobile-forever
    'postcss-mobile-forever': {
      appSelector: '#app',
      viewportWidth: 375,
      maxDisplayWidth: 600,
      mobileUnit: 'rem',
      unitPrecision: 3,
      border: true,
      selectorBlackList: ['.norem'],
      // rootContainingBlockSelectorList: ['*'],
      rootContainingBlockSelectorList: [
        '.van-tabbar',
        '.van-popup',
        '.van-popup--bottom',
        '.van-popup--top',
        '.van-popup--left',
        '.van-popup--right',
        '.tabbar-page',
        // 在这里添加你的选择器
      ],
    },
  },
}
