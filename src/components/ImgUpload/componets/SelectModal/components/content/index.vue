<template>
  <div class="modal-content">
    <el-tabs
      v-model="tabCurrent"
      @tab-change="(name: string) => tabCurrent = name"
      class="modal-tabs"
    >
      <!-- 本地上传 -->
      <el-tab-pane label="本地上传" name="本地上传">
        <LocalUpload />
      </el-tab-pane>
      <!-- Todo: Chato图库 -->
      <el-tab-pane label="Chato图库" name="Chato图库">
        <ChatoResource />
      </el-tab-pane>
      <!-- Todo: 我的图库 -->
      <!-- <el-tab-pane label="我的图库" name="我的图库">
        <MyResource />
      </el-tab-pane> -->
      <!-- Todo: 我的视频库 -->
      <!-- <el-tab-pane label="我的视频库" name="我的视频库">
        <VideoResource />
      </el-tab-pane> -->
    </el-tabs>
    <el-icon size="20" class="close" @click="() => handleChangeAlbumVisible(false)"
      ><Close
    /></el-icon>
  </div>
</template>

<script setup lang="ts">
import type { InjectConfig } from '@/components/ImgUpload/data'
import { inject, ref } from 'vue'
import ChatoResource from './components/ChatoResource/index.vue'
import LocalUpload from './components/LocalUpload/index.vue'

const { handleChangeAlbumVisible } = inject<InjectConfig>('config')

const tabCurrent = ref<string>('本地上传')
</script>

<style lang="scss">
.local-uplaod {
  height: 315px;
  overflow-y: scroll;
}
</style>

<style scoped lang="scss">
.modal-content {
  position: relative;
  padding: 0 40px;
  .modal-tabs {
    :deep(.el-tabs__item) {
      height: 56px;
    }
  }
  .close {
    position: absolute;
    top: 20px;
    right: 40px;
    font-size: 14px;
    color: #999999;
    cursor: pointer;
  }
}
</style>
