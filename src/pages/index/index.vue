<script setup lang="ts">
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import CustomNavbar from './components/CustomNavbar/CustomNavbar.vue'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { ref } from 'vue'
import type { XtxGuessInstance } from '@/types/component'
import CategoryPanel from './components/CategoryPanel/CategoryPanel.vue'
import HotPanel from './components/HotPanel/HotPanel.vue'
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
//获取前台分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}
//获取热门分类数据
const HotPanelList = ref<HotItem[]>([])
const getHotPanelData = async () => {
  const res = await getHomeHotAPI()
  HotPanelList.value = res.result
}
//页面加载
onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
  getHotPanelData()
})
// 获取猜你喜欢组件实例
const guessRef = ref<XtxGuessInstance>()
//滚动触底
const onScrolltolower = () => {
  guessRef.value?.getMore()
}
</script>

<template>
  <CustomNavbar /><!-- 自定义导航组件引入 -->
  <scroll-view @scrolltolower="onScrolltolower" class="scroll-view" scroll-y>
    <XtxSwiper :list="bannerList" /><!-- 自定义轮播图组件全局 -->
    <CategoryPanel :list="categoryList" />
    <HotPanel :list="HotPanelList" />
    <XtxGuess ref="guessRef" />
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
}
</style>
