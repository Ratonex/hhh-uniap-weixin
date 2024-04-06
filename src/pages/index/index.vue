<script setup lang="ts">
import { getHomeBannerAPI } from '@/services/home'
import CustomNavbar from './components/CustomNavbar/CustomNavbar.vue'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem } from '@/types/home'
import { ref } from 'vue'
import CategoryPanel from './components/CategoryPanel/CategoryPanel.vue'

const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

onLoad(() => {
  getHomeBannerData()
})
</script>

<template>
  <CustomNavbar /><!-- 自定义导航组件引入 -->
  <XtxSwiper :list="bannerList" /><!-- 自定义轮播图组件全局 -->
  <view class="index"></view>
  <CategoryPanel />
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
</style>
