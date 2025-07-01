# Bright Education Backend API

這是 Bright Education 網站的後端 API 服務，提供管理部落格內容的功能。

## 安裝與啟動

1. 安裝依賴套件：
```bash
npm install
```

2. 啟動伺服器：
```bash
npm start
```

伺服器將在 `http://localhost:3001` 上運行。

## API 端點

### 招生活動 (Enrollment Events)

- `GET /api/enrollment-events` - 取得所有招生活動
- `GET /api/enrollment-events/:id` - 取得特定招生活動
- `POST /api/enrollment-events` - 新增招生活動
- `PUT /api/enrollment-events/:id` - 更新招生活動
- `DELETE /api/enrollment-events/:id` - 刪除招生活動

### 最新消息 (News)

- `GET /api/news` - 取得所有最新消息
- `GET /api/news/:id` - 取得特定最新消息
- `POST /api/news` - 新增最新消息
- `PUT /api/news/:id` - 更新最新消息
- `DELETE /api/news/:id` - 刪除最新消息

### 其他

- `GET /api/all` - 取得所有文章（招生活動 + 最新消息）
- `GET /api/health` - 健康檢查

## 資料格式

### 招生活動範例
```json
{
  "id": 1,
  "title": "UIC MBA+MS Programs Application Deadline update",
  "excerpt": "申請截止日期更新",
  "type": "enrollment",
  "thumbnail": "/images/blog/thumbnail/example.webp",
  "image": "/images/blog/example.webp",
  "content": [
    {
      "semester": "Fall 2025",
      "title": "🇺🇸Fall 2025 秋季班資訊",
      "details": [...]
    }
  ]
}
```

### 最新消息範例
```json
{
  "id": 5,
  "title": "UIC 最新排名賀報🎉",
  "excerpt": "U.S. News 2025 最新排名",
  "type": "article",
  "thumbnail": "/images/blog/thumbnail/example.webp",
  "image": "/images/blog/example.webp",
  "content": {
    "details": [...]
  }
}
```

## 檔案結構

- `server.js` - 主要伺服器檔案
- `db.json` - 資料庫檔案（JSON 格式）
- `package.json` - 專案設定檔
