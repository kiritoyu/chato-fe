<template>
  <div class="fl-title">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.fl-title {
  font-size: 18px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 32px;
  letter-spacing: 0.13px;
  position: relative;
  padding-left: 12px;
  line-height: 28px;

  &::after {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    content: '';
    background-color: #303133;
    width: 3px;
    height: 14px;
  }
}
</style>
