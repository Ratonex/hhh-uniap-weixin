<script setup lang="ts">
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import CustomNavbar from './components/CustomNavbar/CustomNavbar.vue'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { ref } from 'vue'
import { useGuessList } from '@/composables'
import CategoryPanel from './components/CategoryPanel/CategoryPanel.vue'
import HotPanel from './components/HotPanel/HotPanel.vue'
import PageSkeleton from './components/PageSkeleton/PageSkeleton.vue'
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
const isloding = ref(false)
//页面加载
onLoad(async () => {
  isloding.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHotPanelData()])

  isloding.value = false
})
// 猜你喜欢组合式函数调用
const { guessRef, onScrolltolower } = useGuessList()
// 当前下拉刷新状态
const Istriggered = ref(false)
//自定义下拉刷新被触发

const onRefresherrefresh = async () => {
  Istriggered.value = true
  // 重置猜你喜欢组件数据
  guessRef.value?.resetData() // 加载数据
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHotPanelData(),
    guessRef.value?.getMore(),
  ]) //同时发送数据完成后再进行关闭动画
  //结束动画
  Istriggered.value = false
}
</script>

<template>
  <CustomNavbar /><!-- 自定义导航组件引入 -->
  <scroll-view
    refresher-enabled
    :refresher-triggered="Istriggered"
    @refresherrefresh="onRefresherrefresh"
    @scrolltolower="onScrolltolower"
    class="scroll-view"
    scroll-y
  >
    <PageSkeleton v-if="isloding" />
    <template>
      <XtxSwiper :list="bannerList" /><!-- 自定义轮播图组件全局 -->
      <CategoryPanel :list="categoryList" /><!-- 分类 -->
      <HotPanel :list="HotPanelList" /><!-- 热门推荐 -->
      <XtxGuess ref="guessRef" /><!-- 猜你喜欢 -->
    </template>
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
