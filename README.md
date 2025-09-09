# 🗺️ 臺北市長照資訊視覺化平台

[![Vue.js](https://img.shields.io/badge/Vue.js-3.3+-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3+-7952B3?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9+-199900?style=flat-square&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Pinia](https://img.shields.io/badge/Pinia-2+-FFD859?style=flat-square&logo=pinia&logoColor=white)](https://pinia.vuejs.org/)

> 一個基於 Vue.js
> 3 的現代化長照資訊視覺化平台，提供直觀的地圖介面和豐富的數據分析功能。

## 📋 目錄

- [🎯 專案概述](#-專案概述)
- [✨ 主要功能](#-主要功能)
- [🏗️ 技術架構](#️-技術架構)
- [🚀 快速開始](#-快速開始)
- [📁 專案結構](#-專案結構)
- [🗺️ 圖層配置](#-圖層配置)
- [🔧 開發指南](#-開發指南)
- [📊 數據格式](#-數據格式)
- [🎨 自定義主題](#-自定義主題)
- [🤝 貢獻指南](#-貢獻指南)
- [📄 授權條款](#-授權條款)

## 🎯 專案概述

本專案是一個專為臺北市長照服務設計的資訊視覺化平台，整合了多種長照機構的空間數據，提供直觀的地圖展示和數據分析功能。平台採用現代化的前端技術棧，確保良好的用戶體驗和系統性能。

### 🎪 核心特色

- **🗺️ 互動式地圖** - 基於 Leaflet 的高性能地圖展示
- **📊 多維度數據** - 整合多種長照機構的空間和屬性數據
- **🎨 響應式設計** - 適配各種設備尺寸的現代化 UI
- **⚡ 即時載入** - 動態載入圖層數據，優化性能
- **🔍 智能搜索** - 支援圖層和數據的快速搜索
- **📱 移動友好** - 完整的移動端支援

## ✨ 主要功能

### 🗺️ 地圖功能

- **多底圖支援** - 提供多種地圖底圖選擇
- **圖層管理** - 動態控制圖層的顯示/隱藏
- **空間查詢** - 點擊地圖要素查看詳細資訊
- **縮放控制** - 流暢的地圖縮放和導航

### 📊 數據分析

- **統計摘要** - 各圖層的數據統計資訊
- **表格視圖** - 結構化的數據表格展示
- **屬性面板** - 詳細的要素屬性資訊
- **圖例系統** - 清晰的圖層圖例說明

### 🎛️ 用戶介面

- **圖層控制面板** - 直觀的圖層開關控制
- **響應式佈局** - 適配桌面和移動設備
- **載入狀態** - 清晰的載入進度指示
- **錯誤處理** - 友好的錯誤提示和處理

## 🏗️ 技術架構

### 前端技術棧

| 技術             | 版本 | 用途                           |
| ---------------- | ---- | ------------------------------ |
| **Vue.js**       | 3.3+ | 前端框架，使用 Composition API |
| **Vue Router**   | 4+   | 單頁應用路由管理               |
| **Pinia**        | 2+   | 狀態管理，替代 Vuex            |
| **Bootstrap**    | 5.3+ | UI 框架和響應式佈局            |
| **Leaflet**      | 1.9+ | 地圖庫和地理資訊展示           |
| **Font Awesome** | 6+   | 圖示庫                         |

### 開發工具

| 工具        | 用途                 |
| ----------- | -------------------- |
| **Vue CLI** | 專案建構和開發伺服器 |
| **ESLint**  | 代碼品質檢查         |
| **Babel**   | JavaScript 編譯      |
| **Webpack** | 模組打包             |

### 架構設計

```
┌─────────────────────────────────────────────────────────────┐
│                    🎨 表現層 (Presentation Layer)            │
├─────────────────────────────────────────────────────────────┤
│  Vue Components (Views, Tabs, Components)                   │
│  ├── HomeView.vue (主頁面)                                  │
│  ├── MapTab.vue (地圖組件)                                  │
│  ├── DataTableTab.vue (數據表格)                            │
│  └── PropertiesTab.vue (屬性面板)                           │
├─────────────────────────────────────────────────────────────┤
│                    🧠 業務邏輯層 (Business Logic Layer)      │
├─────────────────────────────────────────────────────────────┤
│  Pinia Stores (狀態管理)                                    │
│  ├── dataStore.js (圖層數據管理)                            │
│  ├── defineStore.js (系統配置)                              │
│  └── mapStore.js (地圖狀態)                                 │
├─────────────────────────────────────────────────────────────┤
│                    🔧 工具層 (Utility Layer)                │
├─────────────────────────────────────────────────────────────┤
│  Utils (工具函數)                                           │
│  ├── dataProcessor.js (數據處理)                            │
│  └── utils.js (通用工具)                                    │
├─────────────────────────────────────────────────────────────┤
│                    📊 數據層 (Data Layer)                   │
├─────────────────────────────────────────────────────────────┤
│  Static Data Files (靜態數據文件)                           │
│  ├── CSV Files (機構數據)                                   │
│  └── GeoJSON Files (地理數據)                               │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 快速開始

### 環境要求

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0 或 **yarn** >= 1.22.0

### 安裝步驟

1. **克隆專案**

   ```bash
   git clone <repository-url>
   cd 30DayMapChallenge-02_Lines
   ```

2. **安裝依賴**

   ```bash
   npm install
   # 或
   yarn install
   ```

3. **啟動開發伺服器**

   ```bash
   npm run serve
   # 或
   yarn serve
   ```

4. **建構生產版本**
   ```bash
   npm run build
   # 或
   yarn build
   ```

### 開發指令

```bash
# 啟動開發伺服器 (熱重載)
npm run serve

# 建構生產版本
npm run build

# 執行代碼檢查
npm run lint

# 修復代碼格式問題
npm run lint:fix
```

## 📁 專案結構

```
30DayMapChallenge-02_Lines/
├── 📁 public/                    # 靜態資源目錄
│   ├── 📁 data/                  # 數據文件目錄
│   │   ├── 📁 csv/              # CSV 格式數據
│   │   └── 📁 geojson/          # GeoJSON 格式數據
│   ├── index.html               # HTML 模板
│   └── favicon.ico              # 網站圖示
├── 📁 src/                      # 源代碼目錄
│   ├── 📁 assets/               # 靜態資源
│   │   ├── 📁 css/              # 樣式文件
│   │   │   ├── common.css       # 通用樣式
│   │   │   └── variables.css    # CSS 變數
│   │   └── logo.png             # 應用程式圖示
│   ├── 📁 components/           # 可重用組件
│   │   ├── DetailItem.vue       # 詳細資訊組件
│   │   └── LoadingOverlay.vue   # 載入覆蓋層
│   ├── 📁 tabs/                 # 主要功能頁籤
│   │   ├── MapTab.vue           # 地圖功能頁籤
│   │   ├── DataTableTab.vue     # 數據表格頁籤
│   │   └── PropertiesTab.vue    # 屬性面板頁籤
│   ├── 📁 views/                # 頁面視圖
│   │   ├── HomeView.vue         # 主頁面
│   │   ├── MiddleView.vue       # 中間視圖
│   │   ├── UpperView.vue        # 上部視圖
│   │   └── ResponsiveLowerView.vue # 響應式下部視圖
│   ├── 📁 stores/               # Pinia 狀態管理
│   │   ├── dataStore.js         # 數據存儲
│   │   ├── defineStore.js       # 定義存儲
│   │   └── mapStore.js          # 地圖存儲
│   ├── 📁 utils/                # 工具函數
│   │   ├── dataProcessor.js     # 數據處理器
│   │   └── utils.js             # 通用工具
│   ├── 📁 router/               # 路由配置
│   │   └── index.js             # 路由定義
│   ├── App.vue                  # 根組件
│   └── main.js                  # 應用程式入口
├── package.json                 # 專案配置
├── vue.config.js               # Vue CLI 配置
├── babel.config.js             # Babel 配置
└── README.md                   # 專案說明文件
```

## 🗺️ 圖層配置

### 圖層結構

平台支援分組的圖層管理，每個圖層組包含多個相關的圖層：

#### 🌍 世界城市

- **北京** - 中國首都，展示亞洲代表性城市的地理邊界
- **柏林** - 德國首都，展示歐洲代表性城市的地理邊界
- **巴黎** - 法國首都，展示歐洲浪漫之都的地理邊界
- **羅馬** - 義大利首都，展示歐洲歷史古城的地理邊界
- **華盛頓特區** - 美國首都，展示北美洲代表性城市的地理邊界
- **西安** - 中國古都，展示絲綢之路起點城市的地理邊界

### 圖層屬性

每個圖層包含以下配置屬性：

```javascript
{
  layerId: 'unique-identifier',        // 圖層唯一標識符
  layerName: 'Display Name',           // 圖層顯示名稱
  visible: false,                      // 是否可見
  isLoading: false,                    // 是否正在載入
  isLoaded: false,                     // 是否已載入
  type: 'point',                       // 圖層類型 (point/polygon/line)
  shape: 'circle',                     // 點圖層形狀
  colorName: 'green',                  // 顏色主題
  geoJsonData: null,                   // GeoJSON 數據
  summaryData: null,                   // 統計摘要
  tableData: null,                     // 表格數據
  legendData: null,                    // 圖例配置
  loader: loadFunction,                // 數據載入函數
  fileName: 'path/to/data.csv',        // 數據文件路徑
  fieldName: null                      // 主要字段名稱
}
```

## 🔧 開發指南

### 添加新圖層

1. **準備數據文件**

   - 將 CSV 或 GeoJSON 文件放入 `public/data/` 目錄
   - 確保數據包含經緯度座標信息

2. **創建數據載入器**

   ```javascript
   // 在 utils/dataProcessor.js 中添加
   export async function loadNewLayerData(layer) {
     // 實現數據載入邏輯
   }
   ```

3. **配置圖層**
   ```javascript
   // 在 stores/dataStore.js 中添加圖層配置
   {
     layerId: 'new-layer',
     layerName: '新圖層',
     loader: loadNewLayerData,
     fileName: 'path/to/data.csv',
     // ... 其他配置
   }
   ```

### 自定義樣式

1. **修改 CSS 變數**

   ```css
   /* 在 assets/css/variables.css 中 */
   :root {
     --my-color-custom: #your-color;
   }
   ```

2. **添加新主題**
   ```javascript
   // 在圖層配置中使用
   colorName: 'custom';
   ```

### 狀態管理

使用 Pinia 進行狀態管理：

```javascript
// 在組件中使用
import { useDataStore } from '@/stores/dataStore';

export default {
  setup() {
    const dataStore = useDataStore();

    // 切換圖層可見性
    const toggleLayer = (layerId) => {
      dataStore.toggleLayerVisibility(layerId);
    };

    return { toggleLayer };
  },
};
```

## 📊 數據格式

### CSV 數據格式

CSV 文件應包含以下必要欄位：

```csv
name,address,lat,lng,type,description
機構名稱,地址,緯度,經度,類型,描述
```

### GeoJSON 數據格式

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [經度, 緯度]
      },
      "properties": {
        "name": "機構名稱",
        "type": "機構類型"
      }
    }
  ]
}
```

## 🎨 自定義主題

### 顏色系統

平台使用 CSS 變數定義顏色系統：

```css
:root {
  /* 主要顏色 */
  --my-color-primary: #007bff;
  --my-color-secondary: #6c757d;

  /* 圖層顏色 */
  --my-color-green: #28a745;
  --my-color-red: #dc3545;
  --my-color-blue: #007bff;

  /* 背景顏色 */
  --my-bgcolor-gray-100: #f8f9fa;
  --my-bgcolor-gray-200: #e9ecef;
}
```

### 響應式斷點

```css
/* Bootstrap 5 斷點 */
@media (min-width: 576px) {
  /* sm */
}
@media (min-width: 768px) {
  /* md */
}
@media (min-width: 992px) {
  /* lg */
}
@media (min-width: 1200px) {
  /* xl */
}
@media (min-width: 1400px) {
  /* xxl */
}
```

## 🤝 貢獻指南

我們歡迎任何形式的貢獻！請遵循以下步驟：

### 提交 Issue

1. 檢查是否已存在相關 Issue
2. 提供詳細的問題描述
3. 包含重現步驟和環境信息

### 提交 Pull Request

1. Fork 本專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

### 代碼規範

- 使用 ESLint 進行代碼檢查
- 遵循 Vue.js 官方風格指南
- 添加適當的註解和文檔
- 確保代碼通過所有測試

## 📄 授權條款

本專案採用 MIT 授權條款 - 查看 [LICENSE](LICENSE) 文件了解詳情。

## 📞 聯絡資訊

- **專案維護者**: [您的姓名]
- **電子郵件**: [your.email@example.com]
- **專案連結**: [https://github.com/your-username/your-repo]

---

<div align="center">

**⭐ 如果這個專案對您有幫助，請給我們一個 Star！**

Made with ❤️ by [您的團隊名稱]

</div>
