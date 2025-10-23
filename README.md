# 🌍 30DayMapChallenge-01_Points - 世界國家地圖

[![Vue.js](https://img.shields.io/badge/Vue.js-3.2+-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9+-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Pinia](https://img.shields.io/badge/Pinia-2.1+-FFD859?logo=pinia&logoColor=black)](https://pinia.vuejs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3+-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一個基於 **Vue 3** 和 **Leaflet** 的互動式世界國家地圖應用程式，專為
**#30DayMapChallenge**
第一天「Points（點）」主題設計。展示六大國家的座標點，提供流暢的地圖導航體驗。

> 🎯
> **專案理念**：以極簡的「點」為核心，探索世界六大國家的地理位置，體現地圖製作中「少即是多」的設計哲學。

---

## 📋 目錄

- [功能特色](#-功能特色)
- [在線演示](#-在線演示)
- [技術架構](#️-技術架構)
- [專案結構](#-專案結構)
- [快速開始](#-快速開始)
  - [環境要求](#環境要求)
  - [安裝步驟](#安裝步驟)
  - [開發服務器](#開發服務器)
  - [生產構建](#生產構建)
- [使用說明](#-使用說明)
- [核心組件文檔](#-核心組件文檔)
  - [MapTab 組件](#maptab-組件)
  - [dataStore 狀態管理](#datastore-狀態管理)
  - [defineStore 配置管理](#definestore-配置管理)
- [開發指南](#️-開發指南)
  - [添加新國家](#添加新國家)
  - [自定義樣式](#自定義樣式)
  - [修改底圖](#修改底圖)
- [部署說明](#-部署說明)
  - [GitHub Pages 部署](#github-pages-部署)
  - [環境變數配置](#環境變數配置)
- [專案架構深度解析](#-專案架構深度解析)
- [常見問題](#-常見問題)
- [性能優化](#-性能優化)
- [瀏覽器支援](#-瀏覽器支援)
- [貢獻指南](#-貢獻指南)
- [版本歷史](#-版本歷史)
- [授權條款](#-授權條款)
- [聯繫方式](#-聯繫方式)
- [致謝](#-致謝)

---

## ✨ 功能特色

### 🗺️ 地圖核心功能

- **六大國家展示**：覆蓋亞洲、歐洲、北美洲的代表性國家

  - 🏝️ 台灣（TAIWAN）- 台北市中心
  - 🏛️ 中國（CHINA）- 北京市中心
  - 🏯 日本（JAPAN）- 東京市中心
  - 🗽 美國（UNITED STATES）- 華盛頓特區
  - 🗼 法國（FRANCE）- 巴黎市中心
  - 🏰 德國（GERMANY）- 柏林市中心

- **一鍵導航**：點擊國家按鈕快速飛行至目標位置
- **固定視角**：禁用所有地圖互動，確保截圖的一致性
- **中心點標記**：HTML 層級的白色圓點，精確標示地圖中心
- **深色底圖**：使用 Carto Dark Matter 底圖，提供專業視覺效果

### 🎨 用戶界面

- **現代化設計**：基於 Bootstrap 5 的響應式界面
- **直觀操作**：左側中央控制面板，符合人體工學
- **視覺回饋**：選中國家時按鈕高亮顯示
- **無縫切換**：瞬間切換國家視圖，無延遲動畫

### 🚀 技術亮點

- **Vue 3 Composition API**：現代化開發模式，更好的代碼組織
- **Pinia 狀態管理**：輕量級、類型安全的狀態管理方案
- **Leaflet 地圖引擎**：輕量、高性能、可擴展
- **模組化架構**：清晰的代碼分層，易於維護和擴展
- **響應式設計**：適配桌面、平板、手機等各種設備

---

## 🌐 在線演示

🔗
**線上版本**：[https://kevin7261.github.io/30DayMapChallenge-01_Points/](https://kevin7261.github.io/30DayMapChallenge-01_Points/)

> 📸 **使用建議**：本應用專為截圖和展示設計，地圖互動已禁用以確保視覺一致性。

---

## 🏗️ 技術架構

### 前端技術棧

| 技術             | 版本    | 用途         |
| ---------------- | ------- | ------------ |
| **Vue 3**        | 3.2.13+ | 前端框架核心 |
| **Leaflet**      | 1.9.0+  | 地圖渲染引擎 |
| **Pinia**        | 2.1.0+  | 狀態管理     |
| **Bootstrap 5**  | 5.3.0+  | UI 框架      |
| **Vue Router**   | 4.5.1+  | 路由管理     |
| **Font Awesome** | 6.7.2+  | 圖標庫       |
| **Vue CLI**      | 5.0.8+  | 構建工具     |

### 核心依賴

```json
{
  "vue": "^3.2.13",
  "leaflet": "^1.9.0",
  "pinia": "^2.1.0",
  "bootstrap": "^5.3.0",
  "vue-router": "^4.5.1",
  "@fortawesome/fontawesome-free": "^6.7.2"
}
```

### 開發工具

- **ESLint**：代碼質量檢查
- **Prettier**：代碼格式化
- **Babel**：JavaScript 轉譯
- **gh-pages**：GitHub Pages 部署

---

## 📁 專案結構

```
30DayMapChallenge-01_Points/
├── public/                      # 靜態資源目錄
│   ├── index.html              # HTML 模板
│   ├── favicon.ico             # 網站圖標
│   ├── 404.html                # GitHub Pages 404 頁面
│   └── data/                   # 數據文件目錄
│       └── README.md
│
├── src/                         # 源代碼目錄
│   ├── main.js                 # 應用入口文件
│   ├── App.vue                 # 根組件
│   │
│   ├── assets/                 # 資源文件
│   │   ├── css/               # 樣式文件
│   │   │   ├── common.css     # 通用樣式
│   │   │   └── variables.css  # CSS 變數定義
│   │   └── logo.png           # Logo 圖片
│   │
│   ├── components/            # 通用組件目錄（預留）
│   │
│   ├── views/                 # 頁面組件
│   │   └── HomeView.vue       # 主頁面
│   │
│   ├── tabs/                  # 功能組件
│   │   └── MapTab.vue         # 地圖組件
│   │
│   ├── stores/                # Pinia 狀態管理
│   │   ├── dataStore.js       # 數據存儲（國家數據、導航）
│   │   └── defineStore.js     # 配置存儲（底圖、地圖狀態）
│   │
│   ├── router/                # 路由配置
│   │   └── index.js           # 路由定義
│   │
│   └── utils/                 # 工具函數
│       └── utils.js           # 通用工具函數
│
├── dist/                       # 構建輸出目錄
│   ├── index.html             # 構建後的 HTML
│   ├── css/                   # 編譯後的 CSS
│   ├── js/                    # 編譯後的 JavaScript
│   └── fonts/                 # 字體文件
│
├── node_modules/              # 依賴包目錄
│
├── .gitignore                 # Git 忽略文件
├── babel.config.js            # Babel 配置
├── jsconfig.json              # JavaScript 配置
├── package.json               # NPM 包配置
├── package-lock.json          # NPM 鎖定文件
├── vue.config.js              # Vue CLI 配置
└── README.md                  # 專案說明文件
```

### 目錄說明

- **`public/`**：靜態資源，構建時會直接複製到 `dist/`
- **`src/`**：源代碼，所有開發工作在此進行
- **`src/stores/`**：Pinia 狀態管理，管理全域數據
- **`src/tabs/`**：功能組件，獨立的功能模組
- **`src/views/`**：頁面組件，對應路由的頁面
- **`dist/`**：構建輸出，部署到生產環境的文件

---

## 🚀 快速開始

### 環境要求

在開始之前，請確保您的開發環境滿足以下要求：

- **Node.js**：16.0 或更高版本
- **npm**：7.0 或更高版本（或 yarn 1.22+）
- **Git**：用於版本控制
- **現代瀏覽器**：Chrome 90+、Firefox 88+、Safari 14+、Edge 90+

### 安裝步驟

#### 1. 克隆專案

```bash
# 使用 HTTPS
git clone https://github.com/kevin7261/30DayMapChallenge-01_Points.git

# 或使用 SSH
git clone git@github.com:kevin7261/30DayMapChallenge-01_Points.git

# 進入專案目錄
cd 30DayMapChallenge-01_Points
```

#### 2. 安裝依賴

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

> 💡 **提示**：首次安裝可能需要幾分鐘時間，請耐心等待。

### 開發服務器

啟動本地開發服務器，支持熱重載（Hot Module Replacement）：

```bash
# 使用 npm
npm run serve

# 或使用 yarn
yarn serve
```

開發服務器啟動後，您可以通過以下地址訪問應用：

- **本地訪問**：`http://localhost:8080/30DayMapChallenge-01_Points/`
- **局域網訪問**：`http://[你的IP地址]:8080/30DayMapChallenge-01_Points/`

> 🔥 **熱重載**：修改代碼後，瀏覽器會自動刷新，無需手動重新整理。

### 生產構建

構建生產版本，優化代碼和資源：

```bash
# 使用 npm
npm run build

# 或使用 yarn
yarn build
```

構建完成後，所有文件將輸出到 `dist/` 目錄，可直接部署到靜態文件服務器。

### 其他命令

```bash
# 代碼檢查
npm run lint

# 代碼格式化
npm run format

# 僅檢查格式（不修改文件）
npm run prettier:check

# 部署到 GitHub Pages
npm run deploy
```

---

## 📖 使用說明

### 基本操作

#### 1. 國家導航

- 位置：左側中央控制面板
- 操作：點擊國家名稱按鈕
- 效果：地圖立即切換到對應國家的中心位置
- 視覺回饋：選中的按鈕會高亮顯示

#### 2. 地圖交互

本應用專為截圖和展示設計，已禁用所有地圖交互功能：

- ❌ 拖拽移動
- ❌ 滾輪縮放
- ❌ 雙擊縮放
- ❌ 觸控縮放
- ❌ 鍵盤控制
- ❌ 框選縮放

#### 3. 中心點標記

- **位置**：地圖正中央
- **樣式**：4px × 4px 白色圓點
- **用途**：精確標示當前國家的中心位置
- **技術**：HTML 層級覆蓋，非地圖標記

### 支援的國家

| 國家名稱 | 圖層 ID      | 中心座標（經度, 緯度） | 縮放級別 |
| -------- | ------------ | ---------------------- | -------- |
| 🏝️ 台灣  | Taiwan       | 121.519639, 25.045694  | 16       |
| 🏛️ 中國  | China        | 116.39162, 39.89898    | 16       |
| 🏯 日本  | Japan        | 139.774167, 35.684444  | 16       |
| 🗽 美國  | UnitedStates | -77.036548, 38.895108  | 16       |
| 🗼 法國  | France       | 2.3488, 48.8534        | 16       |
| 🏰 德國  | Germany      | 13.399, 52.5108        | 16       |

> 📌 **座標說明**：所有座標皆指向各國首都或重要城市的中心點。

---

## 📚 核心組件文檔

### MapTab 組件

**文件位置**：`src/tabs/MapTab.vue`

**功能說明**：

- 負責 Leaflet 地圖的初始化和渲染
- 管理底圖圖層的載入和切換
- 處理地圖事件（縮放、移動）
- 提供中心點標記

**Props**：

```javascript
{
  currentCountry: {
    type: String,
    default: '國家名稱',
    description: '當前選中的國家名稱'
  }
}
```

**Emits**：

```javascript
{
  'map-ready': '地圖初始化完成時觸發，傳遞 Leaflet 地圖實例',
  'update:zoomLevel': '縮放級別改變時觸發',
  'update:currentCoords': '地圖中心座標改變時觸發'
}
```

**關鍵方法**：

- `createMap()`：創建 Leaflet 地圖實例
- `setBasemap()`：設定底圖圖層
- `handleZoomEnd()`：處理縮放結束事件
- `handleMoveEnd()`：處理移動結束事件
- `invalidateSize()`：刷新地圖尺寸

### dataStore 狀態管理

**文件位置**：`src/stores/dataStore.js`

**功能說明**：

- 管理國家圖層配置數據
- 提供國家導航功能
- 管理地圖實例引用

**狀態（State）**：

```javascript
{
  layers: Array,           // 圖層配置數組
  mapInstance: Object,     // Leaflet 地圖實例
  selectedFeature: Object  // 當前選中的要素
}
```

**Getters**：

```javascript
{
  visibleLayers: () => Array; // 返回所有可見圖層
}
```

**Actions**：

```javascript
{
  findLayerById(layerId: string): Object | null
  // 根據圖層 ID 查找圖層對象

  getAllLayers(): Array
  // 獲取所有圖層的扁平陣列

  setMapInstance(map: Object): void
  // 設定 Leaflet 地圖實例

  setSelectedFeature(feature: Object): void
  // 設定選中的地圖要素

  navigateToCountry(countryId: string): void
  // 導航到指定國家
}
```

**使用示例**：

```javascript
import { useDataStore } from '@/stores/dataStore.js';

const dataStore = useDataStore();

// 導航到台灣
dataStore.navigateToCountry('Taiwan');

// 獲取所有國家
const allCountries = dataStore.getAllLayers();

// 查找特定國家
const japan = dataStore.findLayerById('Japan');
```

### defineStore 配置管理

**文件位置**：`src/stores/defineStore.js`

**功能說明**：

- 管理底圖配置
- 管理地圖視圖狀態（中心座標、縮放級別）

**狀態（State）**：

```javascript
{
  selectedBasemap: String,  // 當前選中的底圖
  mapView: {
    center: Array,          // 地圖中心座標 [lat, lng]
    zoom: Number            // 縮放級別
  },
  basemaps: Array           // 底圖配置列表
}
```

**Actions**：

```javascript
{
  setSelectedBasemap(value: string): void
  // 設定選中的底圖

  setMapView(center: Array, zoom: Number): void
  // 設定地圖視圖狀態
}
```

**使用示例**：

```javascript
import { useDefineStore } from '@/stores/defineStore.js';

const defineStore = useDefineStore();

// 切換底圖
defineStore.setSelectedBasemap('carto');

// 設定地圖視圖
defineStore.setMapView([25.045694, 121.519639], 16);
```

---

## 🛠️ 開發指南

### 添加新國家

#### 步驟 1：更新國家配置

編輯 `src/stores/dataStore.js`，在 `layers` 陣列中添加新國家：

```javascript
{
  layerId: 'Brazil',              // 唯一標識符
  layerName: 'BRAZIL',            // 顯示名稱
  center: [-47.9292, -15.7797],   // [經度, 緯度] - 巴西利亞
}
```

#### 步驟 2：驗證功能

1. 重新啟動開發服務器
2. 左側面板會自動顯示新國家按鈕
3. 點擊按鈕測試導航功能

#### 步驟 3：調整樣式（可選）

如需自定義按鈕樣式，編輯 `src/assets/css/common.css`：

```css
.my-country-btn {
  /* 自定義樣式 */
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease;
}

.my-country-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.my-country-btn.active {
  background-color: rgba(255, 255, 255, 0.3);
  font-weight: bold;
}
```

### 自定義樣式

#### 修改中心點樣式

編輯 `src/tabs/MapTab.vue`，找到中心點標記：

```vue
<template>
  <div
    class="position-absolute top-50 start-50 translate-middle"
    style="z-index: 1000; pointer-events: none"
  >
    <!-- 修改此處：調整大小、顏色、形狀 -->
    <div
      class="rounded-circle bg-white"
      style="width: 8px; height: 8px; opacity: 0.8;"
    ></div>
  </div>
</template>
```

#### 修改控制面板樣式

編輯 `src/views/HomeView.vue`，調整控制面板位置和樣式：

```vue
<template>
  <div
    class="position-absolute"
    style="top: 50%; left: 0; transform: translateY(-50%); z-index: 1000; padding: 1rem"
  >
    <div class="bg-dark bg-opacity-75 rounded-3 p-3">
      <!-- 控制面板內容 -->
    </div>
  </div>
</template>
```

### 修改底圖

#### 步驟 1：更新底圖配置

編輯 `src/stores/defineStore.js`，修改 `basemaps` 陣列：

```javascript
basemaps: [
  {
    value: 'carto',
    label: 'Carto Dark',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  },
  {
    value: 'osm',
    label: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
  // 添加新底圖
  {
    value: 'satellite',
    label: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  },
];
```

#### 步驟 2：設定預設底圖

在 `defineStore.js` 中修改 `selectedBasemap`：

```javascript
selectedBasemap: ref('satellite'), // 使用衛星底圖
```

---

## 🚀 部署說明

### GitHub Pages 部署

#### 步驟 1：配置 GitHub Pages

1. 進入 GitHub 倉庫設置
2. 導航到 **Settings** > **Pages**
3. **Source** 選擇 `gh-pages` 分支
4. 點擊 **Save**

#### 步驟 2：構建並部署

```bash
# 自動構建並部署
npm run deploy
```

此命令會執行以下操作：

1. 運行 `npm run build` 構建生產版本
2. 將 `dist/` 目錄推送到 `gh-pages` 分支
3. 觸發 GitHub Pages 自動部署

#### 步驟 3：訪問網站

部署完成後（通常需要 1-5 分鐘），訪問：

```
https://[你的用戶名].github.io/30DayMapChallenge-01_Points/
```

### 環境變數配置

創建 `.env` 文件（不同環境可創建 `.env.development`、`.env.production`）：

```env
# 應用標題
VUE_APP_TITLE=30DayMapChallenge - Points

# API 基礎 URL（如有需要）
VUE_APP_API_URL=https://your-api-domain.com

# 地圖相關配置
VUE_APP_DEFAULT_ZOOM=16
VUE_APP_DEFAULT_CENTER=25.045694,121.519639

# 開發模式配置
NODE_ENV=development
```

在代碼中使用：

```javascript
const apiUrl = process.env.VUE_APP_API_URL;
const appTitle = process.env.VUE_APP_TITLE;
```

### 其他部署平台

#### Vercel

```bash
# 安裝 Vercel CLI
npm install -g vercel

# 部署
vercel
```

#### Netlify

1. 登入 Netlify
2. 點擊 **New site from Git**
3. 選擇 GitHub 倉庫
4. 設定構建命令：`npm run build`
5. 設定發佈目錄：`dist`
6. 點擊 **Deploy site**

---

## 🔍 專案架構深度解析

### 狀態管理流程

```
用戶點擊國家按鈕
    ↓
HomeView.navigateToCountry()
    ↓
dataStore.navigateToCountry()
    ↓
Leaflet 地圖執行 setView()
    ↓
觸發 moveend 事件
    ↓
defineStore.setMapView() 更新狀態
    ↓
UI 更新（按鈕高亮）
```

### 組件通訊機制

```
HomeView (父組件)
    ├─ 傳遞 props: currentCountry
    ├─ 監聽 emit: map-ready
    └─ MapTab (子組件)
        ├─ 接收 props
        ├─ 觸發 emit
        └─ 渲染地圖
```

### 地圖初始化流程

```
1. MapTab onMounted()
    ↓
2. initMap()
    ↓
3. createMap() - 創建 Leaflet 實例
    ↓
4. setBasemap() - 載入底圖
    ↓
5. emit('map-ready') - 通知父組件
    ↓
6. HomeView.setMapInstance() - 保存實例
    ↓
7. dataStore.setMapInstance() - 全域可用
    ↓
8. navigateToCountry('Taiwan') - 初始導航
```

---

## ❓ 常見問題

### Q1: 為什麼地圖無法拖拽和縮放？

**A**：這是有意的設計。本應用專為截圖和展示設計，禁用所有互動以確保視覺一致性。如需啟用互動，請修改
`src/tabs/MapTab.vue` 中的地圖初始化配置：

```javascript
mapInstance = L.map(mapContainer.value, {
  dragging: true, // 啟用拖拽
  scrollWheelZoom: true, // 啟用滾輪縮放
  // ... 其他選項
});
```

### Q2: 如何更改預設國家？

**A**：編輯 `src/views/HomeView.vue`：

```javascript
// 將預設國家從台灣改為日本
const currentCountry = ref('JAPAN');

onMounted(() => {
  navigateToCountry('Japan');
});
```

### Q3: 可以添加更多國家嗎？

**A**：可以！請參考 [添加新國家](#添加新國家) 章節。

### Q4: 中心點標記可以自定義嗎？

**A**：可以！請參考 [修改中心點樣式](#修改中心點樣式) 章節。

### Q5: 開發服務器啟動後顯示空白頁面？

**A**：請確認您訪問的 URL 是否包含子路徑：

```
✅ 正確：http://localhost:8080/30DayMapChallenge-01_Points/
❌ 錯誤：http://localhost:8080/
```

### Q6: 部署後地圖無法顯示？

**A**：請檢查 `vue.config.js` 中的 `publicPath` 是否與 GitHub Pages 設定一致：

```javascript
module.exports = defineConfig({
  publicPath: '/30DayMapChallenge-01_Points/', // 倉庫名稱
});
```

---

## ⚡ 性能優化

### 已實施的優化

1. **代碼分割**：使用 Vue Router 的懶加載
2. **底圖緩存**：Leaflet 自動緩存已載入的圖磚
3. **事件防抖**：ResizeObserver 使用 200ms 防抖
4. **狀態持久化**：Pinia 狀態自動保存到 localStorage

### 建議的優化

1. **圖片優化**：使用 WebP 格式圖片
2. **字體優化**：使用字體子集（font subsetting）
3. **CDN 加速**：將靜態資源部署到 CDN
4. **Gzip 壓縮**：伺服器端啟用 Gzip

---

## 🌐 瀏覽器支援

| 瀏覽器  | 最低版本 |
| ------- | -------- |
| Chrome  | 90+      |
| Firefox | 88+      |
| Safari  | 14+      |
| Edge    | 90+      |
| Opera   | 76+      |

> ⚠️ **不支援 Internet Explorer**：本應用使用現代 JavaScript 特性，不支援 IE
> 11 及更早版本。

---

## 🤝 貢獻指南

歡迎貢獻！請遵循以下步驟：

### 1. Fork 專案

點擊 GitHub 頁面右上角的 **Fork** 按鈕。

### 2. 克隆到本地

```bash
git clone https://github.com/[你的用戶名]/30DayMapChallenge-01_Points.git
cd 30DayMapChallenge-01_Points
```

### 3. 創建功能分支

```bash
git checkout -b feature/AmazingFeature
```

### 4. 提交更改

```bash
git add .
git commit -m '✨ Add some AmazingFeature'
```

**提交訊息規範**：

- `✨ feat`: 新功能
- `🐛 fix`: 修復 Bug
- `📝 docs`: 文檔更新
- `💄 style`: 樣式調整
- `♻️ refactor`: 代碼重構
- `⚡ perf`: 性能優化
- `✅ test`: 測試相關
- `🔧 chore`: 構建/工具相關

### 5. 推送到 GitHub

```bash
git push origin feature/AmazingFeature
```

### 6. 開啟 Pull Request

前往 GitHub 倉庫頁面，點擊 **New Pull Request**。

---

## 📜 版本歷史

### v0.1.0 (2025-10-19)

- 🎉 初始版本發布
- ✨ 支援 6 個國家導航
- 🗺️ 整合 Leaflet 地圖
- 🎨 Bootstrap 5 界面
- 📦 Pinia 狀態管理
- 🚀 GitHub Pages 部署

---

## 📄 授權條款

本專案採用 **MIT License** 授權條款。

```
MIT License

Copyright (c) 2025 Kevin Cheng

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 聯繫方式

- **專案維護者**：Kevin Cheng
- **GitHub**：[@kevin7261](https://github.com/kevin7261)
- **專案連結**：[https://github.com/kevin7261/30DayMapChallenge-01_Points](https://github.com/kevin7261/30DayMapChallenge-01_Points)
- **線上演示**：[https://kevin7261.github.io/30DayMapChallenge-01_Points/](https://kevin7261.github.io/30DayMapChallenge-01_Points/)

---

## 🙏 致謝

### 開源專案

- **[Vue.js](https://vuejs.org/)**：漸進式 JavaScript 框架
- **[Leaflet](https://leafletjs.com/)**：開源互動式地圖庫
- **[Pinia](https://pinia.vuejs.org/)**：Vue 狀態管理庫
- **[Bootstrap](https://getbootstrap.com/)**：CSS 框架
- **[Font Awesome](https://fontawesome.com/)**：圖標庫

### 地圖服務

- **[Carto](https://carto.com/)**：提供 Dark Matter 底圖
- **[OpenStreetMap](https://www.openstreetmap.org/)**：開放街圖數據

### 靈感來源

- **[#30DayMapChallenge](https://30daymapchallenge.com/)**：每日地圖挑戰
- **地圖社群**：全球地圖愛好者

---

## 🌟 Star History

如果這個專案對您有幫助，請給我們一個 ⭐️！

[![Star History Chart](https://api.star-history.com/svg?repos=kevin7261/30DayMapChallenge-01_Points&type=Date)](https://star-history.com/#kevin7261/30DayMapChallenge-01_Points&Date)

---

<div align="center">

**Made with ❤️ for #30DayMapChallenge**

**探索世界國家的點之美** 🌍✨

[⬆ 回到頂部](#-30daymapchallenge-01_points---世界國家地圖)

</div>
