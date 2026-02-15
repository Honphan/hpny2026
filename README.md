# 🧧 Chúc Mừng Năm Mới 2026

Website chúc Tết cá nhân hóa — mỗi người nhận được một lời chúc riêng, hiển thị trong thiệp Tết với hiệu ứng pháo hoa, hoa đào rơi và nhạc nền.

> **Năm Bính Ngọ 2026 — Mã Đáo Thành Công** 🐴

## ✨ Tính năng

- 🎴 **Thiệp Tết cá nhân** — Mỗi người có lời chúc riêng, truy cập qua tên
- 🎆 **Hiệu ứng pháo hoa** — Bắn pháo hoa khi mở thiệp
- 🌸 **Hoa đào rơi** — Animation hoa đào rơi xuyên suốt trang
- 🎵 **Nhạc nền Tết** — Bật/tắt nhạc nền
- 💌 **Gửi lời chúc lại** — Người nhận có thể gửi feedback
- 🔐 **Trang Admin** — Quản lý lời chúc và xem hộp thư đến

## 🛠️ Tech Stack

| Công nghệ | Mục đích |
|---|---|
| **React 19** | UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS 3** | Styling |
| **Framer Motion** | Animations |
| **Firebase Firestore** | Database (realtime) |
| **Lucide React** | Icons |
| **React Router 7** | Routing |
| **Vercel** | Deployment |

## 📁 Cấu trúc dự án

```
hpny2026/
├── public/
│   └── assets/              # Static assets (nhạc, hình ảnh)
├── src/
│   ├── components/
│   │   ├── animations/
│   │   │   ├── FallingBlossoms.jsx   # Hiệu ứng hoa đào rơi
│   │   │   └── FireworkEffect.jsx    # Hiệu ứng pháo hoa
│   │   ├── common/
│   │   │   ├── TetCard.jsx           # Thiệp chúc Tết
│   │   │   ├── FeedbackModal.jsx     # Modal gửi lời chúc lại
│   │   │   └── MusicToggle.jsx       # Nút bật/tắt nhạc
│   │   └── layout/
│   │       └── TetBackground.jsx     # Background chung (gradient, pattern, hoa đào)
│   ├── firebase/
│   │   ├── config.js                 # Firebase configuration
│   │   └── services.js               # Firestore CRUD operations
│   ├── hooks/
│   │   ├── AudioContext.jsx          # Global audio provider
│   │   └── useAudio.js              # Audio hook
│   ├── pages/
│   │   ├── Admin/
│   │   │   ├── Dashboard.jsx         # Quản lý lời chúc
│   │   │   ├── AddWish.jsx           # Thêm lời chúc mới
│   │   │   └── Inbox.jsx             # Xem feedback từ người nhận
│   │   ├── Home.jsx                  # Trang chính — nhập tên
│   │   └── WishDetail.jsx            # Hiển thị thiệp chúc Tết
│   ├── App.jsx                       # Routes
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Global styles & Tailwind layers
├── index.html
├── tailwind.config.js
├── vite.config.js
├── vercel.json                       # Vercel SPA rewrite config
└── package.json
```

## 🚀 Cài đặt & Chạy

### Yêu cầu

- Node.js >= 18
- npm hoặc yarn
- Firebase project (Firestore)

### 1. Clone repo

```bash
git clone https://github.com/Honphan/hpny2026.git
cd hpny2026
```

### 2. Cài dependencies

```bash
npm install
```

### 3. Cấu hình Firebase

Tạo file `.env` ở thư mục gốc:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Chạy development server

```bash
npm run dev
```

Mở trình duyệt tại `http://localhost:3000`

### 5. Build production

```bash
npm run build
```

## 🗄️ Firestore Collections

### `wishes`
| Field | Type | Mô tả |
|---|---|---|
| `username` | string | Tên người nhận (lowercase) |
| `content` | string | Nội dung lời chúc |
| `createdAt` | timestamp | Ngày tạo |

### `feedbacks`
| Field | Type | Mô tả |
|---|---|---|
| `fromUser` | string | Tên người gửi feedback |
| `message` | string | Nội dung feedback |
| `createdAt` | timestamp | Ngày gửi |

## 🌐 Routes

| Path | Trang | Mô tả |
|---|---|---|
| `/` | Home | Nhập tên để xem lời chúc |
| `/wish/:username` | WishDetail | Hiển thị thiệp Tết |
| `/admin-tet-2026` | Dashboard | Quản lý tất cả lời chúc |
| `/admin-tet-2026/add` | AddWish | Thêm lời chúc mới |
| `/admin-tet-2026/inbox` | Inbox | Xem feedback realtime |


## 📄 License

Made with ❤️ by **HonPhan** — Tết Bính Ngọ 2026
