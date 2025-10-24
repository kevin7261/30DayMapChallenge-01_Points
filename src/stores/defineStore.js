/**
 * 🗺️ 定義存儲模組 (Define Store Module)
 *
 * 管理應用程式的全局配置和設定，包括底圖選擇和地圖視圖狀態。
 * 主要功能：
 * - 管理底圖配置和選擇
 * - 保存地圖視圖狀態（中心點、縮放級別）
 * - 提供底圖切換功能
 *
 * 技術架構：
 * - Pinia 狀態管理
 * - 響應式狀態更新
 * - 模組化配置管理
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
