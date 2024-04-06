import XtxSwiper from '@/components/XtxSwiper.vue'
import XtxGuess from '@/components/XtxGuess.vue'
/**
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
// src/types/components.d.ts
import XtxSwiper from './XtxSwiper.vue'
declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
  }
}
//类型声明文件
