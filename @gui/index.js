import * as fmfs from './libs/format.js'

const $g = {
  fmfs
}

// $g挂载到uni对象上
// #ifndef APP-NVUE
uni.$g = $g
// #endif

const install = (Vue) => {
  Vue.prototype.$g = $g
}

export default {
  install
}
