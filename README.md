# 🌍 30DayMapChallenge - 世界城市地圖

一個基於 Vue
3 和 Leaflet 的互動式世界城市地圖應用程式，展示六大城市的 GeoJSON 數據。

## 📋 目錄

- [功能特色](#功能特色)
- [技術架構](#技術架構)
- [專案結構](#專案結構)
- [安裝與運行](#安裝與運行)
- [使用說明](#使用說明)
- [API 文檔](#api-文檔)
- [開發指南](#開發指南)
- [部署說明](#部署說明)

## ✨ 功能特色

### 🗺️ 地圖功能

- **世界城市展示**: 顯示北京、柏林、巴黎、羅馬、華盛頓特區、西安六大城市
- **城市導航**: 點擊按鈕快速導航到指定城市
- **多種底圖**: 支援 14 種不同的底圖樣式
- **響應式設計**: 適配各種設備尺寸

### 🎨 用戶界面

- **簡潔設計**: 基於 Bootstrap 5 的現代化界面
- **直觀操作**: 左上角控制面板，操作簡單
- **視覺效果**: 平滑的地圖動畫和過渡效果

### 🚀 技術特色

- **Vue 3 Composition API**: 現代化的 Vue 開發模式
- **Pinia 狀態管理**: 高效的響應式狀態管理
- **Leaflet 地圖庫**: 輕量級、高性能的地圖解決方案
- **模組化架構**: 清晰的代碼組織和維護性

## 🏗️ 技術架構

### 前端技術棧

- **Vue 3.3+**: 前端框架
- **Leaflet 1.9+**: 地圖庫
- **Pinia**: 狀態管理
- **Bootstrap 5**: UI 框架
- **Vite**: 構建工具

### 核心組件

- **HomeView**: 主頁面組件，整合地圖和控制面板
- **MapTab**: 地圖顯示組件，處理地圖渲染和互動
- **dataStore**: 數據管理，處理圖層和城市數據
- **defineStore**: 配置管理，處理底圖和地圖狀態

## 📁 專案結構

```
30DayMapChallenge-02_Lines/
├── public/
│   ├── data/
│   │   └── geojson/           # GeoJSON 數據文件
│   │       ├── beijing.geojson
│   │       ├── berlin.geojson
│   │       ├── paris.geojson
│   │       ├── rome.geojson
│   │       ├── washingtondc.geojson
│   │       └── xian.geojson
│   └── index.html
├── src/
│   ├── assets/
│   │   └── css/               # 樣式文件
│   ├── stores/
│   │   ├── dataStore.js       # 數據存儲
│   │   └── defineStore.js     # 配置存儲
│   ├── tabs/
│   │   └── MapTab.vue         # 地圖組件
│   ├── utils/
│   │   └── dataProcessor.js   # 數據處理工具
│   ├── views/
│   │   └── HomeView.vue       # 主頁面
│   ├── main.js                # 應用入口
│   └── router/
│       └── index.js           # 路由配置
├── package.json
└── README.md
```

## 🚀 安裝與運行

### 環境要求

- Node.js 16.0+
- npm 7.0+ 或 yarn 1.22+

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

3. **啟動開發服務器**

   ```bash
   npm run serve
   # 或
   yarn serve
   ```

4. **構建生產版本**
   ```bash
   npm run build
   # 或
   yarn build
   ```

### 開發服務器

- 本地地址: `http://localhost:8080`
- 網路地址: `http://[your-ip]:8080`

## 📖 使用說明

### 基本操作

1. **城市導航**

   - 點擊左上角「城市導航」區域的按鈕
   - 地圖會平滑移動到對應城市
   - 支援的城市：北京、柏林、巴黎、羅馬、華盛頓特區、西安

2. **底圖切換**

   - 使用「底圖選擇」下拉選單
   - 可選擇 14 種不同的底圖樣式
   - 包括街道圖、衛星圖、地形圖等

3. **地圖互動**
   - 滑鼠滾輪：縮放地圖
   - 拖拽：移動地圖視圖
   - 點擊城市邊界：查看城市信息

### 支援的底圖

| 底圖名稱         | 類型   | 描述               |
| ---------------- | ------ | ------------------ |
| Carto Light      | 街道圖 | 預設底圖，簡潔明亮 |
| OpenStreetMap    | 街道圖 | 開源地圖數據       |
| Google Maps 街道 | 街道圖 | Google 街道視圖    |
| Google Maps 衛星 | 衛星圖 | 衛星影像           |
| Esri Street      | 街道圖 | Esri 街道地圖      |
| Esri Topo        | 地形圖 | 地形圖視圖         |
| 地形圖           | 地形圖 | OpenTopoMap        |
| 白色地圖         | 空白   | 純白色背景         |
| 黑色底圖         | 空白   | 純黑色背景         |

## 📚 API 文檔

### dataStore API

#### 方法

- `getAllLayers()`: 獲取所有圖層
- `findLayerById(layerId)`: 根據 ID 查找圖層
- `navigateToCity(cityId)`: 導航到指定城市
- `setMapInstance(map)`: 設定地圖實例
- `loadCityLayers()`: 載入城市圖層數據

#### 狀態

- `layers`: 圖層配置數組
- `mapInstance`: Leaflet 地圖實例
- `selectedFeature`: 當前選中的要素

### defineStore API

#### 方法

- `setSelectedBasemap(value)`: 設定選中的底圖
- `setMapView(center, zoom)`: 設定地圖視圖狀態

#### 狀態

- `selectedBasemap`: 當前選中的底圖類型
- `mapView`: 地圖視圖狀態
- `basemaps`: 底圖配置列表

## 🛠️ 開發指南

### 添加新城市

1. **準備 GeoJSON 數據**

   - 將城市邊界數據轉換為 GeoJSON 格式
   - 確保坐標系統為 WGS84 (EPSG:4326)

2. **添加數據文件**

   ```bash
   # 將 GeoJSON 文件放入
   public/data/geojson/your-city.geojson
   ```

3. **更新圖層配置**
   ```javascript
   // 在 src/stores/dataStore.js 中添加
   {
     layerId: 'your-city',
     layerName: 'Your City',
     visible: true,
     type: 'line',
     colorName: 'blue',
     fileName: 'your-city.geojson',
     center: [lng, lat], // 城市中心坐標
     zoom: 10,
   }
   ```

### 自定義樣式

1. **修改城市顏色**

   ```javascript
   // 在 dataStore.js 中修改 colorName
   colorName: 'your-color', // 對應 CSS 變數
   ```

2. **添加 CSS 變數**
   ```css
   /* 在 src/assets/css/variables.css 中 */
   --my-color-your-color: #your-hex-color;
   ```

### 開發工具

- **Vue DevTools**: 調試 Vue 組件和狀態
- **Leaflet Debug**: 使用瀏覽器開發者工具調試地圖
- **ESLint**: 代碼質量檢查

## 🚀 部署說明

### 靜態部署

1. **構建專案**

   ```bash
   npm run build
   ```

2. **部署 dist 目錄**
   - 將 `dist` 目錄內容上傳到 Web 服務器
   - 確保服務器支援 SPA 路由

### 環境變數

創建 `.env` 文件配置環境變數：

```env
# 開發環境
NODE_ENV=development
VUE_APP_API_URL=http://localhost:3000

# 生產環境
NODE_ENV=production
VUE_APP_API_URL=https://your-api-domain.com
```

### 性能優化

1. **代碼分割**: 使用動態導入減少初始包大小
2. **圖片優化**: 壓縮 GeoJSON 文件大小
3. **緩存策略**: 配置適當的 HTTP 緩存頭

## 🤝 貢獻指南

1. Fork 本專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權條款

本專案採用 MIT 授權條款 - 查看 [LICENSE](LICENSE) 文件了解詳情。

## 📞 聯繫方式

- 專案維護者: [Your Name]
- 電子郵件: [your.email@example.com]
- 專案連結:
  [https://github.com/your-username/30DayMapChallenge-02_Lines](https://github.com/your-username/30DayMapChallenge-02_Lines)

## 🙏 致謝

- [Leaflet](https://leafletjs.com/) - 開源地圖庫
- [Vue.js](https://vuejs.org/) - 漸進式 JavaScript 框架
- [Bootstrap](https://getbootstrap.com/) - CSS 框架
- [Pinia](https://pinia.vuejs.org/) - Vue 狀態管理庫

---

**30DayMapChallenge** - 探索世界城市的線條之美 🌍✨
