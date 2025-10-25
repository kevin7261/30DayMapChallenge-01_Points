/**
 * 📦 數據存儲模組 (Data Store Module)
 * 
 * 這是 30 Day Map Challenge - Points 專案的核心狀態管理模組，負責管理世界地圖的
 * 國家數據、地圖導航功能以及用戶互動狀態。本模組採用現代化的 Vue 3 Composition API
 * 和 Pinia 狀態管理系統，提供響應式的數據管理和高效的狀態更新機制。
 * 
 * 🎯 主要功能：
 * - 🌍 世界六大國家數據管理（台灣、中國、日本、美國、法國、德國）
 * - 🗺️ 地圖導航和視圖控制
 * - 📍 國家中心座標和縮放級別管理
 * - 🔄 響應式狀態更新和數據持久化
 * - 🎛️ 地圖實例管理和生命週期控制
 * 
 * 🏗️ 技術架構：
 * - Vue 3 Composition API：提供更好的 TypeScript 支援和代碼組織
 * - Pinia 狀態管理：輕量級、模組化的狀態管理解決方案
 * - 響應式數據：使用 ref 和 computed 實現自動更新
 * - 數據持久化：使用 Pinia 的 persist 插件保存用戶狀態
 * 
 * 📋 數據結構：
 * - layers: 分組結構的國家圖層配置
 * - selectedFeature: 當前選中的地圖要素
 * - mapInstance: Leaflet 地圖實例引用
 * - FIXED_ZOOM_LEVEL: 固定縮放級別常數
 * 
 * 🔧 核心方法：
 * - findLayerById(): 根據 ID 查找圖層
 * - getAllLayers(): 獲取所有圖層的扁平陣列
 * - navigateToCountry(): 導航到指定國家
 * - setMapInstance(): 設定地圖實例
 * - setSelectedFeature(): 設定選中的地圖要素
 * 
 * @author 30 Day Map Challenge Team
 * @version 1.0.0
 * @since 2024
 */

// 🔧 核心依賴引入 (Core Dependencies Import)
import { defineStore } from 'pinia';        // Pinia 狀態管理庫
import { ref, computed } from 'vue';       // Vue 3 響應式 API

/**
 * 🏪 數據存儲商店定義 (Data Store Definition)
 *
 * 使用 Pinia 的 defineStore 創建一個名為 'data' 的狀態管理商店。
 * 採用 Composition API 語法，提供更好的 TypeScript 支援和代碼組織。
 *
 * @returns {Object} 包含所有狀態和方法的商店對象
 */
export const useDataStore = defineStore(
  'data', // 商店唯一標識符
  () => {
    // 🎯 固定縮放級別常數 - 唯一設定點
    const FIXED_ZOOM_LEVEL = 17;
    /**
     * 🗺️ 圖層配置數據 (Layer Configuration Data)
     *
     * 定義所有可用的地圖圖層，採用分組結構組織，每個圖層包含完整的配置信息。
     * 使用 ref 創建響應式數據，當圖層狀態改變時會自動更新相關 UI 組件。
     *
     * 📋 圖層結構說明：
     * - groupName: 圖層組名稱，用於 UI 分組顯示
     * - groupLayers: 該組下的所有圖層列表
     *   - layerId: 圖層唯一標識符
     *   - layerName: 圖層顯示名稱
     *   - colorName: 圖層顏色名稱（對應 CSS 變數）
     *   - geoJsonData: GeoJSON 格式的地理數據
     *   - loader: 數據載入函數
     *   - fileName: 數據文件路徑
     *   - fieldName: 主要字段名稱
     *   - center: 國家中心座標
     *   - zoom: 縮放級別
     */
    // 🌍 六大國家數據配置
    const layers = ref([
      {
        groupName: '世界國家',
        groupLayers: [
          {
            layerId: 'taiwan',
            layerName: 'TAIWAN',
            center: [25.0457, 121.5196],
          },
          {
            layerId: 'china',
            layerName: 'CHINA',
            center: [39.89877, 116.39167],
          },
          {
            layerId: 'japan',
            layerName: 'JAPAN',
            center: [35.684580490329374, 139.77440880399962],
          },
          {
            layerId: 'usa',
            layerName: 'UNITED STATES',
            center: [38.89511, -77.03655],
          },
          {
            layerId: 'france',
            layerName: 'FRANCE',
            center: [48.8534, 2.3488],
          },
          {
            layerId: 'germany',
            layerName: 'GERMANY',
            center: [52.5108, 13.399],
          },
        ],
      },
    ]);

    /**
     * 🔍 根據圖層 ID 查找圖層對象 (Find Layer by ID)
     *
     * 在分組結構的圖層配置中搜索指定 ID 的圖層，返回完整的圖層配置對象。
     * 使用嵌套循環遍歷所有圖層組和圖層，確保能夠找到正確的圖層。
     *
     * @param {string} layerId - 要查找的圖層唯一標識符
     * @returns {Object|null} 找到的圖層對象，如果未找到則返回 null
     *
     * @example
     * const layer = findLayerById('安養機構');
     * if (layer) {
     *   console.log('找到圖層:', layer.layerName);
     * }
     */
    const findLayerById = (layerId) => {
      // 遍歷所有圖層組
      for (const group of layers.value) {
        // 遍歷當前組的所有圖層
        for (const layer of group.groupLayers) {
          // 檢查圖層 ID 是否匹配
          if (layer.layerId === layerId) {
            return layer; // 返回找到的圖層對象
          }
        }
      }
      return null; // 未找到指定 ID 的圖層
    };

    /**
     * 📋 獲取所有圖層的扁平陣列 (Get All Layers as Flat Array)
     *
     * 將分組結構的圖層配置轉換為扁平的一維陣列，便於進行批量操作和遍歷。
     * 使用展開運算符將每個圖層組的所有圖層合併到一個陣列中。
     *
     * @returns {Array} 包含所有圖層的扁平陣列
     *
     * @example
     * const allLayers = getAllLayers();
     * console.log('總共有', allLayers.length, '個圖層');
     */
    const getAllLayers = () => {
      const allLayers = []; // 初始化結果陣列
      // 遍歷所有圖層組
      for (const group of layers.value) {
        // 使用展開運算符將當前組的所有圖層添加到結果陣列
        allLayers.push(...group.groupLayers);
      }
      return allLayers; // 返回扁平化的圖層陣列
    };

    /**
     * 🔄 切換圖層可見性狀態 (Toggle Layer Visibility)
     *
     * 控制指定圖層的顯示/隱藏狀態，並在圖層首次顯示時自動載入相關數據。
     * 這是圖層管理的核心方法，負責處理圖層狀態變更和數據載入邏輯。
     *
     * @param {string} layerId - 要切換狀態的圖層唯一標識符
     * @returns {Promise<void>} 異步操作，無返回值
     *
     * @example
     * // 切換安養機構圖層的顯示狀態
     * await toggleLayerVisibility('安養機構');
     */
    // 移除圖層可見性切換（城市圖層永久可見，且無需勾選切換）

    // 移除 GeoJSON 載入功能，現在直接使用座標點

    // ------------------------------------------------------------
    // 選中的地圖物件（用於清除選取狀態）
    const selectedFeature = ref(null);

    const setSelectedFeature = (feature) => {
      selectedFeature.value = feature;
    };

    // ------------------------------------------------------------
    // 地圖導航功能
    const mapInstance = ref(null);

    const setMapInstance = (map) => {
      mapInstance.value = map;
    };

    /**
     * 🌍 導航到指定國家
     *
     * 將地圖視圖移動到指定國家的中心位置
     *
     * @param {string} countryId - 國家圖層的唯一標識符
     * @returns {void}
     */
    const navigateToCountry = (countryId) => {
      // 查找國家圖層
      const countryLayer = findLayerById(countryId);
      if (!countryLayer) {
        console.error('❌ 找不到國家圖層:', countryId);
        return;
      }

      // 檢查地圖實例是否準備就緒
      if (!mapInstance.value) {
        console.error('❌ 地圖實例未準備就緒，等待地圖初始化...');
        // 延遲重試機制
        setTimeout(() => {
          if (mapInstance.value) {
            console.log('🌍 地圖已準備就緒，重新嘗試移動');
            navigateToCountry(countryId);
          } else {
            console.error('❌ 地圖實例仍未準備就緒');
          }
        }, 1000);
        return;
      }

      // 使用國家中心座標
      const [lat, lng] = countryLayer.center;
      const targetCenter = [lat, lng]; // Leaflet 需要 [lat, lng] 格式
      const optimalZoom = FIXED_ZOOM_LEVEL; // 使用固定的縮放級別

      // 執行地圖導航
      try {
        mapInstance.value.setView(targetCenter, optimalZoom, { animate: false });
        console.log(`🌍 成功導航到國家: ${countryLayer.layerName}，縮放等級: ${optimalZoom}`);
      } catch (error) {
        console.error('❌ 地圖導航失敗:', error);
      }
    };

    return {
      layers,
      findLayerById, // 根據 ID 尋找圖層
      getAllLayers, // 獲取所有圖層的扁平陣列
      selectedFeature, // 選中的地圖要素
      setSelectedFeature, // 設定選中的地圖要素
      mapInstance, // 地圖實例
      setMapInstance, // 設定地圖實例
      navigateToCountry, // 導航到指定國家
      // 所有圖層都是可見的，所以直接返回所有圖層
      visibleLayers: computed(() => getAllLayers()),
      FIXED_ZOOM_LEVEL, // 固定縮放級別常數
    };
  },
  {
    persist: true,
  }
);
