<template>
  <el-skeleton style="width: 100%" animated>
    <template #template>
      <div class="skeleton-container">
        <div class="s-c-left">
          <header>
            <el-skeleton-item variant="image" class="header-image" style="flex-shrink: 0" />
            <el-skeleton-item variant="p" style="height: 30px" />
          </header>
          <el-skeleton-item
            variant="p"
            class="skeleto-item"
            v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
            :key="item"
          />
        </div>
        <div class="s-c-right">
          <header>
            <el-skeleton-item variant="image" class="header-image" />
            <el-skeleton-item variant="p" style="width: 50px; height: 30px" />
          </header>
          <div>
            <el-skeleton-item
              variant="p"
              v-for="item in [2, 3, 4, 5, 6, 7, 8]"
              :key="item"
              class="skeleto-item"
              :style="{ width: `${item}0%` }"
            />
          </div>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup></script>

<style lang="scss" scoped>
.skeleton-container {
  display: flex;
  justify-content: flex-start;
  .skeleto-item {
    width: 100%;
    height: 30px;
    margin-bottom: 20px;
  }
  .header-image {
    width: 34px;
    height: 34px;
    border-radius: 100%;
    margin-right: 20px;
  }
  .s-c-left {
    padding: 16px;
    width: 200px;
    header {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 20px;
    }
  }
  .s-c-right {
    width: 100%;
    header {
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      padding: 20px 30px 20px 0;
    }
  }
}
</style>
