<script>
  /**
   * 🏠 App.vue - 應用程式根組件 (Application Root Component)
   *
   * 這是整個 Vue.js 應用程式的根組件，負責提供應用程式的整體框架和佈局結構。
   * 作為應用程式的入口點，本組件整合了路由系統、狀態管理和全域樣式，
   * 為整個應用程式提供統一的基礎架構。
   *
   * 🎯 核心功能：
   * 1. 🏗️ 應用程式框架：提供整體佈局結構和容器
   * 2. 🛣️ 路由管理：整合 Vue Router 進行頁面導航
   * 3. 📱 響應式佈局：實現滿版無邊距的響應式設計
   * 4. 🎨 全域樣式：管理應用程式層級的樣式和主題
   * 5. 🔧 組件註冊：註冊全域組件和插件
   *
   * 🏗️ 架構設計：
   * - 根容器：提供應用程式的根 DOM 節點
   * - 路由視圖：動態顯示不同頁面的組件內容
   * - 全域樣式：引入和管理應用程式層級的 CSS
   * - 狀態管理：整合 Pinia 狀態管理系統
   *
   * 🎨 設計理念：
   * - 滿版佈局：100vh 高度，無邊距和空隙
   * - 模組化：清晰的組件分離和職責劃分
   * - 響應式：適配各種設備和螢幕尺寸
   * - 可維護：簡潔的代碼結構和清晰的註解
   *
   * 📱 響應式特性：
   * - 桌面端：完整功能展示，最佳用戶體驗
   * - 平板端：適配中等螢幕，保持功能完整性
   * - 手機端：優化觸控操作，簡化界面元素
   *
   * 🔧 技術整合：
   * - Vue 3 Composition API：現代化的組件開發模式
   * - Vue Router 4：單頁應用程式路由管理
   * - Pinia：輕量級狀態管理
   * - Bootstrap 5：響應式 UI 框架
   *
   * @author 30 Day Map Challenge Team
   * @version 1.0.0
   * @since 2024
   */

  // 🔧 Vue Composition API 引入
  // import { ref } from 'vue'; // 目前未使用，已註解

  export default {
    name: 'App',

    /**
     * 🧩 組件註冊 (Component Registration)
     * 註冊應用程式層級使用的組件
     */
    components: {},

    /**
     * 🔧 組件設定函數 (Component Setup)
     * 使用 Composition API 設定應用程式層級的狀態管理
     */
    setup() {
      // 📤 返回響應式數據和函數給模板使用 (Return Reactive Data and Functions)
      return {
        // 目前沒有需要返回的狀態
      };
    },
  };
</script>

<template>
  <!-- 🏠 App.vue - 主應用程式組件 (Main Application Component) -->
  <!-- 提供應用程式整體框架，使用 Bootstrap 實現滿版無空隙佈局 -->
  <div id="app" class="d-flex flex-column vh-100">
    <!-- 📱 主要內容區域 (Main Content Area) -->
    <div class="d-flex flex-column overflow-hidden">
      <router-view />
    </div>
  </div>
</template>

<style>
  /**
 * 🎨 應用程式全域樣式 (Application Global Styles)
 *
 * 引入共用 CSS 並定義應用程式層級的樣式
 * 注意：大部分樣式已移至 common.css 中統一管理
 */

  /* 📦 引入共用樣式表 (Import Common Stylesheets) */
  @import './assets/css/common.css';

  /* 📱 應用程式特定樣式 (App-Specific Styles) */
  /* 其他樣式已整合至 common.css 中，避免重複定義 */
</style>
