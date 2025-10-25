<script>
  /**
   * 🏠 HomeView.vue - 主頁面組件 (Main Page Component)
   *
   * 這是應用程式的主頁面組件，負責整合地圖顯示功能和用戶互動。
   * 作為應用程式的核心頁面，本組件協調地圖組件、狀態管理和用戶操作，
   * 提供完整的地圖瀏覽和導航體驗。
   *
   * 🎯 核心功能：
   * - 🗺️ 地圖顯示：整合 MapTab 組件展示世界地圖
   * - 🎛️ 狀態管理：協調 dataStore 和 defineStore 的狀態
   * - 🌍 國家導航：提供國家間的快速導航功能
   * - 📱 響應式設計：適配各種設備的螢幕尺寸
   * - 🔄 數據同步：確保地圖實例與狀態管理的同步
   *
   * 🏗️ 組件架構：
   * - 容器層：提供頁面的整體佈局結構
   * - 地圖層：整合 MapTab 組件進行地圖渲染
   * - 控制層：處理用戶互動和狀態管理
   * - 數據層：協調 Pinia 狀態管理
   *
   * 🔧 技術整合：
   * - Vue 3 Composition API：現代化的組件開發模式
   * - Pinia 狀態管理：響應式數據管理和狀態同步
   * - 組件通信：父子組件間的事件傳遞和數據共享
   * - 生命週期管理：組件掛載和卸載的狀態管理
   *
   * 📊 數據流：
   * 1. 用戶操作 → 組件方法
   * 2. 組件方法 → Pinia Store
   * 3. Store 狀態變更 → 響應式更新
   * 4. 地圖組件接收更新 → 重新渲染
   *
   * 🎨 設計特色：
   * - 滿版佈局：100vh 高度，無邊距設計
   * - 響應式適配：自動適應不同螢幕尺寸
   * - 直觀操作：簡潔的用戶界面和操作流程
   * - 視覺一致性：統一的設計語言和視覺風格
   *
   * @author 30 Day Map Challenge Team
   * @version 1.0.0
   * @since 2024
   */

  import MapTab from '../tabs/MapTab.vue';
  import { useDataStore } from '@/stores/dataStore.js';
  import { useDefineStore } from '@/stores/defineStore.js';
  import { computed } from 'vue';

  export default {
    name: 'HomeView',
    components: { MapTab },
    setup() {
      // 📦 存儲實例
      const dataStore = useDataStore();
      const defineStore = useDefineStore();

      /**
       * 🗺️ 設定地圖實例
       * 將 Leaflet 地圖實例傳遞給 dataStore
       * @param {Object} map - Leaflet 地圖實例
       */
      const setMapInstance = (map) => dataStore.setMapInstance(map);

      /**
       * 🌍 導航到指定國家
       * @param {string} countryId - 國家 ID
       */
      const navigateToCountry = (countryId) => {
        dataStore.navigateToCountry(countryId);
      };

      // 📊 計算屬性：獲取所有國家圖層
      const countries = computed(() => dataStore.getAllLayers());

      return {
        setMapInstance,
        defineStore,
        navigateToCountry,
        countries,
      };
    },
  };
</script>

<template>
  <!-- 🏠 主應用程式容器 -->
  <div id="app" class="d-flex flex-column vh-100">
    <!-- 🗺️ 地圖區域容器 -->
    <div class="flex-grow-1 overflow-hidden position-relative">
      <!-- 🗺️ 地圖組件 -->
      <MapTab @map-ready="setMapInstance" />
    </div>
  </div>
</template>

<style>
  @import '../assets/css/common.css';
</style>
