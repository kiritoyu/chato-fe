<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode'
/*
  参考文档：https://vueuse.org/integrations/useQRCode/
  https://www.npmjs.com/package/qrcode#qr-code-options
*/
interface Props {
  value?: string // 扫描后的文本或地址
  size?: number // 二维码大小
  color?: string // 二维码颜色，Value must be in hex format (十六进制颜色值)
  backgroundColor?: string // 二维码背景色，Value must be in hex format (十六进制颜色值)
  bordered?: boolean // 是否有边框
  borderColor?: string // 边框颜色
  scale?: number // 每个black dots多少像素
  /*
    纠错等级也叫纠错率，就是指二维码可以被遮挡后还能正常扫描，而这个能被遮挡的最大面积就是纠错率。
    通常情况下二维码分为 4 个纠错级别：L级 可纠正约 7% 错误、M级 可纠正约 15% 错误、Q级 可纠正约 25% 错误、H级 可纠正约30% 错误。
    并不是所有位置都可以缺损，像最明显的三个角上的方框，直接影响初始定位。中间零散的部分是内容编码，可以容忍缺损。
    当二维码的内容编码携带信息比较少的时候，也就是链接比较短的时候，设置不同的纠错等级，生成的图片不会发生变化。
  */
  errorLevel?: 'L' | 'M' | 'Q' | 'H' // 二维码纠错等级
}
const props = withDefaults(defineProps<Props>(), {
  value: '',
  size: 160,
  color: '#000',
  backgroundColor: '#FFF',
  bordered: true,
  borderColor: '#0505050f',
  scale: 8,
  errorLevel: 'H' // 可选 L M Q H
})

// `qrcode` will be a ref of data URL
const qrcode = useQRCode(props.value, {
  errorCorrectionLevel: props.errorLevel,
  type: 'image/png',
  quality: 1,
  margin: 3,
  scale: props.scale, // 8px per modules(black dots)
  color: {
    dark: props.color, // 像素点颜色
    light: props.backgroundColor // 背景色
  }
})
</script>
<template>
  <div class="m-qrcode" :class="{ bordered: bordered }" :style="`border-color: ${borderColor};`">
    <img :src="qrcode" class="u-qrcode" alt="QRCode" />
    <a :href="qrcode" download="Chato.png" class="description text-sm text-[#7C5CFC] mt-2.5">{{
      $t('保存')
    }}</a>
  </div>
</template>
<style lang="less" scoped>
.m-qrcode {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  .u-qrcode {
    width: 120px;
    height: 120px;
    margin-right: 10px;
    border-radius: 8px;
  }
}
.bordered {
  border-width: 1px;
  border-style: solid;
}
</style>
