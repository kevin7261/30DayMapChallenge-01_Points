<script>
  /**
   * 🗺️ MapTab.vue - 簡化版地圖組件 (Simplified Map Component)
   *
   * 這是一個簡化的地圖組件，專為世界城市地圖展示設計。
   * 主要功能：
   * - 顯示世界六大城市的 GeoJSON 數據
   * - 提供城市導航功能
   * - 支援多種底圖切換
   * - 響應式設計
   *
   * 技術架構：
   * - Vue 3 Composition API
   * - Leaflet 地圖庫
   * - Pinia 狀態管理
   * - Bootstrap 5 樣式
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

      // 📊 計算屬性：檢查是否有任何圖層可見
      const isAnyLayerVisible = computed(() => dataStore.getAllLayers().length > 0);

      /**
       * 🌍 導航到指定國家
       * @param {string} countryId - 國家 ID
       */
      const navigateToCountry = (countryId) => {
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
          mapInstance = L.map(mapContainer.value, {
            center: defineStore.mapView.center,
            zoom: defineStore.mapView.zoom,
            zoomControl: false, // 禁用縮放控制
            attributionControl: false,
            dragging: true, // 啟用拖拽
            touchZoom: true, // 啟用觸控縮放
            doubleClickZoom: true, // 啟用雙擊縮放
            scrollWheelZoom: true, // 啟用滾輪縮放
            boxZoom: true, // 啟用框選縮放
            keyboard: true, // 啟用鍵盤控制
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

          console.log('[MapTab] 地圖創建成功');
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
          const center = mapInstance.getCenter();
          defineStore.setMapView([center.lat, center.lng], zoom);
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
          defineStore.setMapView([center.lat, center.lng], mapInstance.getZoom());
          emit('update:currentCoords', { lat: center.lat, lng: center.lng });

          // 更新中心點標記位置
          addCenterMarker();
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

      // 中心點標記
      let centerMarker = null;

      /**
       * 🔴 添加中心點標記
       * 在地圖中心添加一個紅色圓點
       */
      const addCenterMarker = () => {
        if (!mapInstance) return;

        // 移除現有的中心點標記
        if (centerMarker) {
          mapInstance.removeLayer(centerMarker);
        }

        // 創建紅色圓點圖標
        const redIcon = L.divIcon({
          className: 'center-marker',
          html: '<div style="width: 12px; height: 12px; background-color: red; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>',
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        });

        // 獲取地圖中心點
        const center = mapInstance.getCenter();

        // 添加中心點標記
        centerMarker = L.marker([center.lat, center.lng], { icon: redIcon }).addTo(mapInstance);

        console.log('[MapTab] 中心點標記已添加');
      };

      /**
       * 🎯 高亮顯示特定要素
       * 當用戶點擊地圖要素時高亮顯示
       */
      const highlightFeature = (feature) => {
        // 重置所有圖層樣式
        resetAllLayerStyles();

        // 高亮選中的要素
        if (feature && feature._leaflet_id) {
          // 這裡可以添加高亮邏輯
          console.log('高亮要素:', feature.properties.name);
        }
      };

      /**
       * 🔄 重置所有圖層樣式
       * 清除所有高亮效果
       */
      const resetAllLayerStyles = () => {
        // 這裡可以添加重置樣式的邏輯
        console.log('重置圖層樣式');
      };

      /**
       * 🔄 同步圖層（已移除標記功能）
       * 不再在地圖上創建標記，改為在 HTML 上顯示
       */
      const syncLayers = () => {
        // 移除地圖標記功能，不需要同步任何圖層
        console.log('圖層同步已禁用，使用 HTML 中心點顯示');
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
            console.log('[MapTab] 地圖創建成功，開始初始化');
            setBasemap();
            addCenterMarker();
            syncLayers();
          } else {
            console.log('[MapTab] 地圖創建失敗，100ms 後重試');
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
            console.log('🔄 容器大小變化，刷新地圖');
            invalidateSize();
          }, 200);
        });

        resizeObserver.observe(mapContainer.value);
        console.log('✅ ResizeObserver 已設置');
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
        highlightFeature,
        invalidateSize,
        defineStore,
        navigateToCountry,
        countries,
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
              @click="navigateToCountry(country.layerId)"
            >
              {{ country.layerName }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 🗺️ Leaflet 地圖容器 -->
    <div :id="mapContainerId" ref="mapContainer" class="h-100 w-100"></div>
  </div>
</template>

<style>
  @import '../assets/css/common.css';
</style>
