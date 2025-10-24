<script>
  /**
   * 🏠 HomeView.vue - 主頁面組件 (Main Page Component)
   *
   * 這是應用程式的主頁面，整合了地圖顯示功能。
   * 主要功能：
   * - 顯示世界地圖
   * - 響應式佈局設計
   *
   * 組件結構：
   * - MapTab: 地圖顯示組件
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
