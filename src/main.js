/**
 * 🚀 應用程式主入口文件 (Main Application Entry Point)
 *
 * 這是整個 Vue.js 應用程式的核心啟動文件，負責初始化所有系統和依賴。
 * 本文件採用模組化設計，確保各系統間的依賴關係清晰明確，提供穩定可靠的
 * 應用程式啟動流程和完整的系統整合。
 *
 * 🎯 核心職責：
 * 1. 🎨 樣式系統初始化：載入 Bootstrap 5、自定義主題和第三方 UI 庫樣式
 * 2. 🧩 Vue 3 應用程式核心：使用 Composition API 的現代化 Vue 架構
 * 3. 🗺️ 路由系統配置：Vue Router 4 單頁應用程式導航管理
 * 4. 📦 狀態管理系統：Pinia 全域狀態管理和數據持久化
 * 5. 🌍 DOM 掛載與渲染：將應用程式掛載到 HTML 容器中
 * 6. 🔧 第三方庫整合：Leaflet 地圖、Font Awesome 圖示、Bootstrap 組件
 *
 * 🏗️ 技術架構：
 * - Vue 3.3+：Composition API + <script setup> 語法，現代化開發模式
 * - Vue Router 4：聲明式路由配置，單頁應用程式導航
 * - Pinia 2+：輕量級狀態管理，替代 Vuex，提供更好的 TypeScript 支援
 * - Bootstrap 5.3+：響應式 UI 框架，提供完整的組件系統
 * - Leaflet 1.9+：開源地圖庫，輕量級、高性能的地圖解決方案
 * - Font Awesome 6+：向量圖示庫，豐富的圖示資源
 *
 * 🔄 初始化流程：
 * 1. 📦 依賴載入：載入所有必要的樣式和 JavaScript 依賴
 * 2. 🏗️ 應用程式創建：創建 Vue 應用程式實例和配置
 * 3. 🛣️ 路由註冊：配置並註冊 Vue Router 路由系統
 * 4. 📊 狀態管理：配置並註冊 Pinia 狀態管理系統
 * 5. 🌍 DOM 掛載：將應用程式掛載到 HTML 容器中
 * 6. ✅ 初始化完成：輸出系統初始化完成日誌
 *
 * 📁 相關文件：
 * - ./App.vue - 根組件，應用程式的主要容器
 * - ./router/index.js - 路由配置，定義應用程式的導航規則
 * - ./stores/ - Pinia 狀態管理模組，管理應用程式狀態
 * - ./assets/css/ - 自定義樣式文件，應用程式的視覺樣式
 *
 * 🔧 開發工具整合：
 * - Vue DevTools：瀏覽器開發者工具擴展
 * - ESLint：代碼質量檢查和格式化
 * - Prettier：代碼格式化工具
 * - Babel：JavaScript 編譯和轉換
 *
 * 🚀 性能優化：
 * - 代碼分割：按需載入組件和模組
 * - 依賴優化：移除未使用的依賴和資源
 * - 緩存策略：配置適當的 HTTP 緩存
 * - 壓縮優化：JavaScript 和 CSS 的壓縮和優化
 *
 * @author 30 Day Map Challenge Team
 * @version 1.0.0
 * @since 2024
 */

// 🔧 Vue 核心模組引入 (Vue Core Module Imports)
import { createApp } from 'vue';
import { createPinia } from 'pinia';

// 🧩 應用程式組件引入 (Application Component Imports)
import App from './App.vue';
import router from './router';

// 🎨 引入第三方樣式文件 (Import Third-Party Style Files)
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 5 CSS 框架
import 'leaflet/dist/leaflet.css'; // Leaflet 地圖核心樣式
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome 圖示庫

// 🎨 引入自定義樣式文件 (Import Custom Style Files)
import './assets/css/common.css'; // 共用樣式（已包含變數和主題配置）

// ⚙️ 引入第三方 JavaScript 文件 (Import Third-Party JavaScript Files)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS（含 Popper.js）
// 提供下拉選單、模態框、工具提示等互動功能

// 🐛 調試資訊輸出 (Debug Information Output)

// 🚀 創建並配置 Vue 應用程式實例 (Create and Configure Vue Application Instance)
const app = createApp(App);

// 📦 創建 Pinia 狀態管理實例 (Create Pinia State Management Instance)
const pinia = createPinia();

// 🗺️ 註冊 Vue Router 路由系統 (Register Vue Router Navigation System)
app.use(router);

// 📦 註冊 Pinia 狀態管理系統 (Register Pinia State Management System)
app.use(pinia);

// 🌍 掛載應用程式到 DOM 元素 (Mount Application to DOM Element)
// 將 Vue 應用程式掛載到 index.html 中 id="app" 的元素上
app.mount('#app');

// 🐛 應用程式啟動完成的調試資訊 (Application Startup Debug Information)
