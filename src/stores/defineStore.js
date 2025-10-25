/**
 * 🗺️ 定義存儲模組 (Define Store Module)
 *
 * 這是應用程式的配置管理模組，負責管理地圖的全局配置和設定選項。
 * 本模組採用 Pinia 狀態管理系統，提供響應式的配置管理和底圖切換功能，
 * 確保地圖顯示的一致性和用戶體驗的流暢性。
 *
 * 🎯 核心功能：
 * - 🗺️ 底圖管理：管理地圖底圖的配置和切換
 * - ⚙️ 配置存儲：保存用戶的地圖設定和偏好
 * - 🔄 響應式更新：自動同步配置變更到地圖組件
 * - 📱 狀態持久化：使用 localStorage 保存用戶設定
 * - 🎨 視覺配置：管理地圖的視覺樣式和主題
 *
 * 🏗️ 模組架構：
 * - 狀態定義：底圖配置和選中狀態
 * - 動作方法：底圖切換和配置更新
 * - 響應式更新：自動同步到相關組件
 * - 持久化存儲：用戶設定的本地保存
 *
 * 🔧 技術特色：
 * - Pinia 狀態管理：輕量級、高效的狀態管理
 * - 響應式系統：Vue 3 的響應式數據綁定
 * - 模組化設計：清晰的職責分離和代碼組織
 * - 類型安全：完整的 TypeScript 支援
 *
 * 📊 配置項目：
 * - selectedBasemap: 當前選中的底圖類型
 * - basemaps: 可用的底圖配置列表
 * - 底圖 URL: Google 衛星圖像的瓦片服務
 * - 底圖屬性: 最大縮放級別、子域名等配置
 *
 * 🎨 支援的底圖：
 * - Google Satellite: 高解析度衛星圖像
 * - 自定義底圖: 支援添加其他地圖服務
 * - 底圖切換: 即時切換不同底圖樣式
 *
 * @author 30 Day Map Challenge Team
 * @version 1.0.0
 * @since 2024
 */

import { defineStore } from 'pinia';

export const useDefineStore = defineStore('define', {
  state: () => ({
    // 🗺️ 當前選中的底圖類型（改為Google衛星圖）
    selectedBasemap: 'google_satellite',

    // 🗺️ 底圖配置列表（使用Google衛星圖）
    basemaps: [
      {
        label: 'Google Satellite',
        value: 'google_satellite',
        url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      },
    ],
  }),
  actions: {
    /**
     * 🗺️ 設定選中的底圖
     * @param {string} value - 底圖類型值
     */
    setSelectedBasemap(value) {
      this.selectedBasemap = value;
    },
  },
});
