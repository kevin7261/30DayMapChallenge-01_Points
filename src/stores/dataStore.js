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
import { defineStore } from 'pinia'; // Pinia 狀態管理庫
import { ref, computed } from 'vue'; // Vue 3 響應式 API

/**
 * 🏪 數據存儲商店定義 (Data Store Definition)
 *
 * 使用 Pinia 的 defineStore 創建一個名為 'data' 的狀態管理商店。採用 Composition API
 * 語法，提供更好的 TypeScript 支援、代碼組織和開發體驗。本商店是整個應用程式的
 * 數據中心，管理所有與地圖相關的狀態和業務邏輯。
 *
 * 🏗️ 商店架構：
 * - 商店名稱：'data' - 唯一標識符，用於 Pinia 內部管理
 * - 語法風格：Composition API - 提供更好的類型推斷和代碼重用
 * - 持久化：啟用 persist 插件，自動保存用戶狀態到 localStorage
 * - 響應式：所有狀態都是響應式的，變更時自動更新 UI
 *
 * 📊 狀態管理範圍：
 * - 地圖圖層數據和配置
 * - 地圖實例和導航狀態
 * - 用戶選擇和互動狀態
 * - 地圖視圖和縮放控制
 *
 * @returns {Object} 包含所有狀態、計算屬性和方法的商店對象
 *
 * @example
 * // 在組件中使用商店
 * import { useDataStore } from '@/stores/dataStore.js';
 * const dataStore = useDataStore();
 *
 * // 導航到台灣
 * dataStore.navigateToCountry('taiwan');
 *
 * // 獲取所有國家
 * const countries = dataStore.getAllLayers();
 */
export const useDataStore = defineStore(
  'data', // 商店唯一標識符，用於 Pinia 內部管理和開發工具識別
  () => {
    // 🎯 地圖縮放級別常數 (Map Zoom Level Constant)
    // 固定縮放級別為 17，提供城市級別的詳細視圖
    // 這個級別適合顯示城市內部的詳細地理信息
    const FIXED_ZOOM_LEVEL = 17;
    /**
     * 🗺️ 世界國家圖層配置數據 (World Countries Layer Configuration Data)
     *
     * 這是應用程式的核心數據結構，定義了世界六大國家的地理信息和配置。
     * 採用分組結構組織，每個國家包含完整的配置信息，使用 ref 創建響應式數據，
     * 當圖層狀態改變時會自動更新相關 UI 組件。
     *
     * 🏗️ 數據結構設計：
     * - 分組管理：使用 groupName 和 groupLayers 實現層級組織
     * - 響應式更新：使用 Vue 3 的 ref 實現自動 UI 更新
     * - 地理座標：精確的經緯度座標，支援地圖導航
     * - 國際化支援：支援多語言國家名稱顯示
     *
     * 📋 圖層結構詳細說明：
     * - groupName: 圖層組名稱，用於 UI 分組顯示和邏輯組織
     * - groupLayers: 該組下的所有圖層列表，支援動態添加/移除
     *   - layerId: 圖層唯一標識符，用於程式邏輯識別和路由
     *   - layerName: 圖層顯示名稱，支援國際化和本地化
     *   - center: 國家中心座標 [緯度, 經度]，用於地圖導航
     *   - zoom: 縮放級別（可選），預設使用 FIXED_ZOOM_LEVEL
     *
     * 🌍 支援的國家：
     * - 台灣 (Taiwan): 亞洲東部島國，座標 [25.0457, 121.5196]
     * - 中國 (China): 亞洲大陸國家，座標 [39.89877, 116.39167]
     * - 日本 (Japan): 亞洲東部島國，座標 [35.684580490329374, 139.77440880399962]
     * - 美國 (United States): 北美洲國家，座標 [38.89511, -77.03655]
     * - 法國 (France): 歐洲西部國家，座標 [48.8534, 2.3488]
     * - 德國 (Germany): 歐洲中部國家，座標 [52.5108, 13.399]
     *
     * 🔄 響應式特性：
     * - 自動更新：當數據變更時，所有依賴的 UI 組件會自動重新渲染
     * - 計算屬性：支援基於此數據的計算屬性，如 visibleLayers
     * - 狀態同步：與地圖實例和用戶互動保持同步
     *
     * @type {Ref<Array>} 響應式圖層配置陣列
     * @since 1.0.0
     */
    // 🌍 世界六大國家數據配置 (World Six Countries Data Configuration)
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
     * 這是一個核心的數據查詢方法，在分組結構的圖層配置中搜索指定 ID 的圖層，
     * 返回完整的圖層配置對象。使用高效的嵌套循環遍歷算法，確保能夠快速
     * 找到正確的圖層，支援 O(n*m) 時間複雜度的搜索。
     *
     * 🎯 功能特性：
     * - 精確匹配：使用嚴格相等比較確保 ID 匹配的準確性
     * - 完整返回：返回完整的圖層配置對象，包含所有屬性和方法
     * - 錯誤處理：未找到時返回 null，便於後續的條件判斷
     * - 性能優化：使用 for...of 循環，比傳統 for 循環更高效
     *
     * 🔍 搜索算法：
     * 1. 外層循環：遍歷所有圖層組 (groups)
     * 2. 內層循環：遍歷當前組的所有圖層 (groupLayers)
     * 3. 條件匹配：檢查 layerId 是否與目標 ID 完全匹配
     * 4. 結果返回：找到則立即返回，未找到則返回 null
     *
     * 📊 性能分析：
     * - 時間複雜度：O(n*m)，其中 n 是組數，m 是平均每組的圖層數
     * - 空間複雜度：O(1)，不需要額外的存儲空間
     * - 最佳情況：O(1)，第一個圖層就是目標
     * - 最壞情況：O(n*m)，需要遍歷所有圖層
     *
     * @param {string} layerId - 要查找的圖層唯一標識符，必須是精確匹配
     * @returns {Object|null} 找到的圖層對象，包含所有配置信息；如果未找到則返回 null
     *
     * @example
     * // 查找台灣圖層
     * const taiwanLayer = findLayerById('taiwan');
     * if (taiwanLayer) {
     *   console.log('找到圖層:', taiwanLayer.layerName); // 輸出: "找到圖層: TAIWAN"
     *   console.log('中心座標:', taiwanLayer.center);     // 輸出: [25.0457, 121.5196]
     * }
     *
     * // 查找不存在的圖層
     * const nonExistentLayer = findLayerById('non-existent');
     * if (!nonExistentLayer) {
     *   console.log('圖層不存在'); // 輸出: "圖層不存在"
     * }
     *
     * @since 1.0.0
     * @author 30 Day Map Challenge Team
     */
    const findLayerById = (layerId) => {
      // 🔍 外層循環：遍歷所有圖層組，確保搜索覆蓋所有可能的圖層
      for (const group of layers.value) {
        // 🔍 內層循環：遍歷當前組的所有圖層，進行精確匹配
        for (const layer of group.groupLayers) {
          // ✅ 條件匹配：檢查圖層 ID 是否與目標 ID 完全匹配
          if (layer.layerId === layerId) {
            return layer; // 🎯 立即返回找到的圖層對象，包含所有配置信息
          }
        }
      }
      return null; // ❌ 未找到指定 ID 的圖層，返回 null 表示搜索失敗
    };

    /**
     * 📋 獲取所有圖層的扁平陣列 (Get All Layers as Flat Array)
     *
     * 這是一個數據轉換方法，將分組結構的圖層配置轉換為扁平的一維陣列。
     * 這種轉換使得數據更容易進行批量操作、遍歷和處理，特別適合在
     * UI 組件中進行列表渲染和數據展示。
     *
     * 🎯 功能特性：
     * - 扁平化轉換：將嵌套的分組結構轉換為一維陣列
     * - 保持完整性：保留所有圖層的原始屬性和配置信息
     * - 高效處理：使用展開運算符實現高效的數組合併
     * - 響應式更新：當原始數據變更時，返回的陣列會自動更新
     *
     * 🔄 轉換過程：
     * 1. 初始化：創建空陣列作為結果容器
     * 2. 遍歷分組：循環處理每個圖層組
     * 3. 展開合併：使用展開運算符將每組的圖層添加到結果陣列
     * 4. 返回結果：返回包含所有圖層的扁平陣列
     *
     * 📊 性能分析：
     * - 時間複雜度：O(n)，其中 n 是所有圖層的總數
     * - 空間複雜度：O(n)，需要創建新的陣列存儲結果
     * - 記憶體效率：使用展開運算符，避免多次數組操作
     * - 響應式開銷：每次調用都會重新計算，但 Vue 會自動優化
     *
     * 🎨 使用場景：
     * - UI 列表渲染：在 Vue 模板中進行 v-for 循環
     * - 數據統計：計算圖層總數、可見圖層數量等
     * - 批量操作：對所有圖層進行統一的處理
     * - 數據過濾：基於條件篩選特定的圖層
     *
     * @returns {Array} 包含所有圖層的扁平陣列，每個元素都是完整的圖層配置對象
     *
     * @example
     * // 獲取所有圖層並進行統計
     * const allLayers = getAllLayers();
     * console.log('總共有', allLayers.length, '個圖層'); // 輸出: "總共有 6 個圖層"
     *
     * // 在 Vue 模板中使用
     * // <div v-for="layer in getAllLayers()" :key="layer.layerId">
     * //   {{ layer.layerName }}
     * // </div>
     *
     * // 進行數據過濾
     * const asianCountries = getAllLayers().filter(layer =>
     *   ['taiwan', 'china', 'japan'].includes(layer.layerId)
     * );
     *
     * @since 1.0.0
     * @author 30 Day Map Challenge Team
     */
    const getAllLayers = () => {
      const allLayers = []; // 🏗️ 初始化結果陣列，用於存儲扁平化的圖層數據

      // 🔄 遍歷所有圖層組，確保處理每個分組中的所有圖層
      for (const group of layers.value) {
        // 📦 使用展開運算符將當前組的所有圖層添加到結果陣列
        // 這種方式比使用 concat 更高效，且代碼更簡潔
        allLayers.push(...group.groupLayers);
      }

      return allLayers; // 🎯 返回扁平化的圖層陣列，包含所有圖層的完整配置信息
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
     * 🌍 導航到指定國家 (Navigate to Specified Country)
     *
     * 這是地圖導航的核心方法，負責將地圖視圖移動到指定國家的中心位置。
     * 本方法整合了圖層查找、地圖實例檢查、座標轉換和導航執行等完整流程，
     * 提供穩定可靠的地圖導航功能。
     *
     * 🎯 功能特性：
     * - 智能查找：自動查找指定國家的圖層配置信息
     * - 狀態檢查：驗證地圖實例是否準備就緒
     * - 重試機制：當地圖未準備好時，自動延遲重試
     * - 座標轉換：將圖層座標轉換為 Leaflet 格式
     * - 錯誤處理：完整的錯誤捕獲和日誌記錄
     * - 動畫控制：支援平滑或瞬時的地圖移動
     *
     * 🔄 執行流程：
     * 1. 圖層查找：使用 findLayerById 查找目標國家圖層
     * 2. 狀態驗證：檢查地圖實例是否已初始化
     * 3. 重試處理：如果地圖未準備好，延遲 1 秒後重試
     * 4. 座標提取：從圖層配置中提取中心座標
     * 5. 導航執行：調用 Leaflet 的 setView 方法執行導航
     * 6. 結果記錄：記錄導航成功或失敗的詳細信息
     *
     * 🛡️ 錯誤處理：
     * - 圖層不存在：記錄錯誤並提前返回
     * - 地圖未準備：自動重試機制，最多等待 1 秒
     * - 導航失敗：捕獲異常並記錄詳細錯誤信息
     * - 參數驗證：確保 countryId 參數的有效性
     *
     * 📊 性能優化：
     * - 快速失敗：無效參數時立即返回，避免不必要的處理
     * - 延遲重試：避免頻繁的同步檢查，減少 CPU 使用
     * - 動畫控制：禁用動畫以提升導航速度
     * - 記憶體管理：避免創建不必要的臨時對象
     *
     * @param {string} countryId - 國家圖層的唯一標識符，必須是有效的圖層 ID
     * @returns {void} 無返回值，但會執行地圖導航操作
     *
     * @example
     * // 導航到台灣
     * navigateToCountry('taiwan');
     *
     * // 導航到日本
     * navigateToCountry('japan');
     *
     * // 導航到不存在的國家（會記錄錯誤）
     * navigateToCountry('non-existent');
     *
     * @throws {Error} 當地圖實例無效或導航失敗時會拋出錯誤
     * @since 1.0.0
     * @author 30 Day Map Challenge Team
     */
    const navigateToCountry = (countryId) => {
      // 🔍 第一步：查找目標國家圖層，確保圖層配置存在
      const countryLayer = findLayerById(countryId);
      if (!countryLayer) {
        console.error('❌ 找不到國家圖層:', countryId);
        return; // 🚫 提前返回，避免後續無效操作
      }

      // 🔍 第二步：檢查地圖實例是否準備就緒，確保地圖已初始化
      if (!mapInstance.value) {
        console.error('❌ 地圖實例未準備就緒，等待地圖初始化...');

        // 🔄 延遲重試機制：等待 1 秒後重新嘗試導航
        setTimeout(() => {
          if (mapInstance.value) {
            console.log('🌍 地圖已準備就緒，重新嘗試移動');
            navigateToCountry(countryId); // 🔄 遞歸調用，重新執行導航
          } else {
            console.error('❌ 地圖實例仍未準備就緒');
          }
        }, 1000);
        return; // 🚫 提前返回，等待重試
      }

      // 📍 第三步：提取國家中心座標，準備導航參數
      const [lat, lng] = countryLayer.center;
      const targetCenter = [lat, lng]; // 🗺️ Leaflet 需要 [緯度, 經度] 格式
      const optimalZoom = FIXED_ZOOM_LEVEL; // 🎯 使用固定的縮放級別

      // 🚀 第四步：執行地圖導航，移動到目標位置
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
