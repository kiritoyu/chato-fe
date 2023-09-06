// eslint-disable-next-line semi
import type { UploadFile, UploadUserFile } from 'element-plus'
import type { Component, Ref } from 'vue'

export type MediaType = 'IMAGE' | 'VIDEO'
export type SelectModalType = 'FILE' | 'COVER'

interface CropProps {
  aspectRatio: number[] // width/height
  autoAspectRatio?: boolean // 是否允许修改设定好的 aspectRatio 裁剪比例
}

export interface imageCropProps extends CropProps {
  notSelectCrop?: boolean // 控制是否上传即裁剪, 默认上传即裁剪
}

export interface ExpandShowUploadListInterface {
  showCropIcon?: boolean // 是否显示裁剪icon
  showPreviewIcon?: boolean // 是否展示预览icon
  showRemoveIcon?: boolean // 是否展示删除icon
  showDownIco?: boolean // 是否展示下载icon
  showSortIcon?: booleam // 是否展示排序icon
}

export interface ImgUplaodProps {
  uploadType: 1 | 2 //1：直接上传  2：图库上传
  unique?: boolean // 是否禁止选择重复图片
  showImage?: boolean // 是否显示图片相关tab
  showVideo?: boolean // 是否显示视频相关tab
  value?: string | string[] | MediaItem | MediaItem[] | '' // 当前图片
  uploadBtnText?: string // 上传按钮上的提示文本
  maxSize?: number // 限制单个图片最大：MB
  maxLength: number // 最大上传个数
  disabled?: boolean | undefined // 是否禁用
  itemWidth?: number // 图片框宽度
  itemHeight?: number // 图片框高度
  showUploadList?: ExpandShowUploadListInterface // 图片上的功能按钮控制
  cropProps: imageCropProps // 裁剪参数
  apiUploadPath?: string // 上传路径
  uploadFillet?: boolean // 圆角上传框
  uploadBg?: string | Component // 上传底图
  // actionBtn?: ActionBtnListItem[] // 自定义图片上的功能
}

/**
 * url 媒体项的url
 * coverUrl 如果是视频则需要传入它的封面图
 * mediaType 媒体项类型
 */
export type MediaItem = {
  url: string
  mediaType: MediaType
  coverUrl?: string
}

export interface ImgUplaodEmit {
  (
    e: 'onChange',
    values: MediaItem | MediaItem[] | '',
    fileList: ImgVideoUploadFile[],
    oldFileList: ImgVideoUploadFile[]
  ): void
  (e: 'onFileChange', fileList: ImgVideoUploadFile[]): void
}

export interface ImgVideoUploadFile extends UploadFile {
  thumbUrl?: string
  type?: MediaType
  preview?: string
}

export interface ImgUploadContextInitConfig {
  uploadType?: 1 | 2 //1：直接上传  2：图库上传
  unique: boolean // 是否禁止选择重复图片
  showImage?: boolean // Todo: 是否显示图片相关tab
  showVideo?: boolean // Todo: 是否显示视频相关tab
  uploadBtnText: string // 上传按钮上的提示文本
  maxSize: number // 单个图片最大尺寸
  maxLength: number // 本次上传个数上限
  disabled: boolean // 是否禁用
  aspectRatio?: number // 图片不是正方形的时候通过传比例去设置长度
  itemWidth?: number
  itemHeight?: number
  showUploadList?: ExpandShowUploadListInterface // 按钮控制
  cropProps: imageCropProps // 裁剪参数  用户可能不需要裁剪 所以添加禁止裁剪
  apiUploadPath: string // 上传路径
  itemRender?: boolean // 判断是否需要展示picture-card中的list
  uploadFillet?: boolean // 是否圆角
  uploadBg?: string | Component // 上传底图
  // actionBtn?: ActionBtnListItem[] // 自定义图片上的功能
  // 当uploadType === 1 时的可选 开始
}

export interface InjectConfig {
  fileList: Ref<ImgVideoUploadFile[]>
  initConfig: ImgUploadContextInitConfig
  handlePreview: (file: ImgVideoUploadFile) => void
  handleRemove: (file: ImgVideoUploadFile, fileIndex: number) => void
  handleCrop: (file: ImgVideoUploadFile, fileIndex: number) => void
  handleMove: (file: ImgVideoUploadFile, fileIndex: number, order: -1 | 1) => void
  handleChangeAlbumVisible: (data: boolean) => void
  handleChangeFileList: (fileList: ImgVideoUploadFile[], oldFileList: ImgVideoUploadFile[]) => void
}

export interface SelectModalConfig {
  localFileList: Ref<ImgVideoUploadFile[]>
  setLocalFileList: (fileList: ImgVideoUploadFile[]) => void
}

export interface UploadResDataType {
  data: {
    url?: string
  }
}

export type UploadResType = UploadUserFile & { response: UploadResDataType }
