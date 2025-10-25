<script>
  /**
   * 🗺️ MapTab.vue - 地圖顯示組件 (Map Display Component)
   *
   * 這是應用程式的核心地圖組件，負責渲染世界地圖、處理用戶互動和提供導航功能。
   * 本組件整合了 Leaflet 地圖庫、Pinia 狀態管理和 Vue 3 響應式系統，
   * 提供流暢的地圖瀏覽體驗和豐富的互動功能。
   *
   * 🎯 核心功能：
   * - 🗺️ 地圖渲染：使用 Leaflet 渲染世界地圖和衛星圖像
   * - 🌍 國家導航：提供六大國家的快速導航功能
   * - 🎛️ 互動控制：處理地圖縮放、拖拽和視圖變更
   * - 📱 響應式適配：自動適應不同設備的螢幕尺寸
   * - 🎨 視覺效果：提供平滑的動畫和過渡效果
   * - 🔄 狀態同步：與 Pinia 狀態管理系統保持同步
   *
   * 🏗️ 組件架構：
   * - 地圖容器：提供地圖渲染的 DOM 容器
   * - 控制面板：國家導航按鈕和用戶控制
   * - 地圖實例：Leaflet 地圖對象和配置
   * - 事件處理：用戶互動和地圖事件監聽
   * - 狀態管理：與 Pinia Store 的數據同步
   *
   * 🔧 技術整合：
   * - Leaflet 1.9+：開源地圖庫，提供地圖渲染和互動
   * - Vue 3 Composition API：現代化的組件開發模式
   * - Pinia 狀態管理：響應式數據管理和狀態同步
   * - Bootstrap 5：響應式 UI 框架和樣式系統
   * - ResizeObserver：容器尺寸變更監聽和地圖刷新
   *
   * 📊 數據流：
   * 1. 組件掛載 → 初始化地圖實例
   * 2. 地圖準備 → 設定底圖和配置
   * 3. 用戶操作 → 觸發導航事件
   * 4. 狀態更新 → 響應式重新渲染
   * 5. 地圖同步 → 更新視圖和位置
   *
   * 🎨 視覺設計：
   * - Google 衛星底圖：提供真實的地理視覺效果
   * - 深色控制面板：半透明背景，突出地圖內容
   * - 白色中心點：固定標記，便於視覺定位
   * - 平滑動畫：地圖移動和視圖變更的流暢過渡
   *
   * 🚀 性能優化：
   * - 延遲初始化：等待容器準備就緒後創建地圖
   * - 重試機制：地圖創建失敗時自動重試
   * - 尺寸監聽：使用 ResizeObserver 優化容器變更處理
   * - 事件防抖：避免頻繁的地圖更新操作
   *
   * @author 30 Day Map Challenge Team
   * @version 1.0.0
   * @since 2024
   */

  import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import { useDataStore } from '@/stores/dataStore.js';
  import { useDefineStore } from '@/stores/defineStore.js';

  export default {
    name: 'MapTab',
    props: {},
    emits: ['map-ready'],
    setup(props, { emit }) {
      // 📦 存儲實例
      const dataStore = useDataStore();
      const defineStore = useDefineStore();

      // 🗺️ 地圖相關變數
      const mapContainer = ref(null);
      let mapInstance = null;
      let currentTileLayer = null;

      // 🎛️ 地圖控制狀態
      const isMapReady = ref(false);
      const mapContainerId = ref(`leaflet-map-${Math.random().toString(36).substr(2, 9)}`);
      const selectedCountryId = ref('taiwan'); // 預設選中台灣

      // 📊 計算屬性：檢查是否有任何圖層可見
      const isAnyLayerVisible = computed(() => dataStore.getAllLayers().length > 0);

      /**
       * 🌍 導航到指定國家
       * @param {string} countryId - 國家 ID
       */
      const navigateToCountry = (countryId) => {
        selectedCountryId.value = countryId; // 更新選中狀態
        dataStore.navigateToCountry(countryId);
      };

      // 📊 計算屬性：獲取所有國家圖層
      const countries = computed(() => dataStore.getAllLayers());

      /**
       * 🏗️ 創建地圖實例
       * 初始化 Leaflet 地圖並設定基本配置
       */
      const createMap = () => {
        if (!mapContainer.value) return false;

        const rect = mapContainer.value.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          console.warn('[MapTab] 容器尺寸為零，延遲初始化');
          return false;
        }

        try {
          // 從 layer 數據中讀取台灣的座標
          const taiwanLayer = dataStore.findLayerById('taiwan');
          const [lat, lng] = taiwanLayer ? taiwanLayer.center : [25.0457, 121.5196];

          mapInstance = L.map(mapContainer.value, {
            center: [lat, lng], // 從 layer 數據讀取台灣座標
            zoom: dataStore.FIXED_ZOOM_LEVEL,
            zoomControl: false, // 禁用縮放控制
            attributionControl: false,
            dragging: true, // 啟用拖拽
            touchZoom: false, // 禁用觸控縮放
            doubleClickZoom: false, // 禁用雙擊縮放
            scrollWheelZoom: false, // 禁用滾輪縮放
            boxZoom: false, // 禁用框選縮放
            keyboard: false, // 禁用鍵盤控制
            zoomSnap: 0, // 禁用縮放吸附
            zoomDelta: 0, // 禁用縮放增量
          });

          // 綁定地圖事件
          mapInstance.on('zoomend', handleZoomEnd);
          mapInstance.on('moveend', handleMoveEnd);

          // 移除地圖點擊事件處理

          // 設定圖層 z-index 順序（從底層到頂層）
          // 1. 底圖（世界地圖）- 最底層
          if (mapInstance.getPane('tilePane')) {
            mapInstance.getPane('tilePane').style.zIndex = 1000;
          }

          // 2. 標記圖層
          if (mapInstance.getPane('markerPane')) {
            mapInstance.getPane('markerPane').style.zIndex = 2000;
          }

          // 3. 覆蓋圖層（heatmap 等）
          if (mapInstance.getPane('overlayPane')) {
            mapInstance.getPane('overlayPane').style.zIndex = 2100;
          }

          // 4. 彈出視窗 - 最頂層
          mapInstance.getPane('popupPane').style.zIndex = 2200;

          isMapReady.value = true;
          emit('map-ready', mapInstance);

          return true;
        } catch (error) {
          console.error('[MapTab] 地圖創建失敗:', error);
          return false;
        }
      };

      /**
       * 📡 處理縮放結束事件
       * 更新地圖視圖狀態到存儲中
       */
      const handleZoomEnd = () => {
        if (mapInstance) {
          const zoom = mapInstance.getZoom();
          emit('update:zoomLevel', zoom);
        }
      };

      /**
       * 📡 處理移動結束事件
       * 更新地圖中心座標
       */
      const handleMoveEnd = () => {
        if (mapInstance) {
          const center = mapInstance.getCenter();
          emit('update:currentCoords', { lat: center.lat, lng: center.lng });
        }
      };

      /**
       * 🎨 設定底圖
       * 根據存儲中的設定載入對應的底圖圖層
       */
      const setBasemap = () => {
        if (!mapInstance) return;

        // 移除現有底圖
        if (currentTileLayer) {
          mapInstance.removeLayer(currentTileLayer);
        }

        const config = defineStore.basemaps.find((b) => b.value === defineStore.selectedBasemap);

        // 添加底圖圖層
        if (config && config.url) {
          currentTileLayer = L.tileLayer(config.url, {
            attribution: '© Google',
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          });
          mapInstance.addLayer(currentTileLayer);
        }

        // 使用預設的透明背景，不設定任何特殊背景色
      };

      // 移除未使用的高亮功能函數

      /**
       * 🔄 同步圖層（已移除標記功能）
       * 不再在地圖上創建標記，改為在 HTML 上顯示
       */
      const syncLayers = () => {
        // 移除地圖標記功能，不需要同步任何圖層
      };

      /**
       * 📏 刷新地圖尺寸
       * 當容器大小改變時重新計算地圖尺寸
       */
      const invalidateSize = () => {
        if (mapInstance) {
          setTimeout(() => {
            mapInstance.invalidateSize();
          }, 100);
        }
      };

      /**
       * 🚀 初始化地圖
       * 創建地圖並載入初始數據
       */
      const initMap = () => {
        let attempts = 0;
        const maxAttempts = 20;

        const tryCreateMap = () => {
          if (attempts >= maxAttempts) {
            console.error('[MapTab] 地圖初始化失敗，已達到最大嘗試次數');
            return;
          }

          attempts++;
          console.log(`[MapTab] 嘗試創建地圖 (${attempts}/${maxAttempts})`);

          if (createMap()) {
            setBasemap();
            syncLayers();
            // 預設導航到台灣
            setTimeout(() => {
              navigateToCountry('taiwan');
            }, 500);
          } else {
            setTimeout(tryCreateMap, 100);
          }
        };

        tryCreateMap();
      };

      // 📏 設置 ResizeObserver 監聽容器大小變化
      let resizeObserver = null;
      let resizeTimeout = null;

      const setupResizeObserver = () => {
        if (!mapContainer.value || !window.ResizeObserver) return;

        resizeObserver = new ResizeObserver(() => {
          if (resizeTimeout) {
            clearTimeout(resizeTimeout);
          }

          resizeTimeout = setTimeout(() => {
            invalidateSize();
          }, 200);
        });

        resizeObserver.observe(mapContainer.value);
      };

      // 🧹 生命週期：組件掛載
      onMounted(() => {
        nextTick(() => {
          initMap();
          setupResizeObserver();
        });
      });

      // 🧹 生命週期：組件卸載
      onUnmounted(() => {
        if (resizeTimeout) {
          clearTimeout(resizeTimeout);
        }

        if (resizeObserver) {
          resizeObserver.disconnect();
        }

        if (mapInstance) {
          mapInstance.remove();
          mapInstance = null;
        }

        currentTileLayer = null;
        isMapReady.value = false;
      });

      // 👀 監聽器：監聽資料存儲中的圖層變化
      watch(() => dataStore.layers, syncLayers, { deep: true });

      // 👀 監聽器：監聽底圖變化
      watch(
        () => defineStore.selectedBasemap,
        () => {
          if (isMapReady.value) {
            setBasemap();
          }
        }
      );

      // 📤 返回組件公開的屬性和方法
      return {
        mapContainer,
        mapContainerId,
        isAnyLayerVisible,
        invalidateSize,
        defineStore,
        navigateToCountry,
        countries,
        selectedCountryId,
      };
    },
  };
</script>

<template>
  <!-- 🗺️ 地圖主容器 -->
  <div id="map-container" class="h-100 w-100 position-relative bg-transparent z-0">
    <!-- 🎛️ 左側中間控制面板 -->
    <div
      class="position-absolute"
      style="top: 50%; left: 0; transform: translateY(-50%); z-index: 1000; padding: 1rem"
    >
      <div class="bg-dark bg-opacity-75 rounded-3 p-3">
        <!-- 🌍 國家導航區域 -->
        <div class="">
          <div class="d-flex flex-column gap-1">
            <button
              v-for="country in countries"
              :key="country.layerId"
              type="button"
              class="btn border-0 my-country-btn my-font-sm-white px-4 py-3 text-center"
              :class="[selectedCountryId === country.layerId ? 'active' : '']"
              @click="navigateToCountry(country.layerId)"
            >
              {{ country.layerName }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 🎯 地圖中心點標記 -->
    <div class="position-absolute map-center-point">
      <div class="center-dot"></div>
    </div>

    <!-- 🗺️ Leaflet 地圖容器 -->
    <div :id="mapContainerId" ref="mapContainer" class="h-100 w-100"></div>
  </div>
</template>

<style>
  @import '../assets/css/common.css';

  /* 🎯 地圖中心點樣式 */
  .map-center-point {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2000;
    pointer-events: none; /* 不影響地圖互動 */
  }

  .center-dot {
    width: 4px;
    height: 4px;
    background-color: red; /* Bootstrap 紅色 */
    border-radius: 50%;
  }
</style>
