# BKI\_2025\_FE

## Giới thiệu

**BKI\_2025\_FE** là dự án frontend cho nền tảng du lịch ViVuDi, được phát triển bằng **React Native (Expo)**, hướng tới kiến trúc module hóa, dễ mở rộng, hiệu năng cao và trải nghiệm người dùng mượt mà. Dự án được thiết kế phù hợp với mô hình phát triển đa nền tảng (Android, iOS), tích hợp tốt với backend và hỗ trợ đa ngôn ngữ linh hoạt.

---

## Tính năng chính

* Hỗ trợ **điều hướng hiện đại** với `expo-router`: Stack, Tab, Nested routes
* Tích hợp **đa ngôn ngữ (i18n)** linh hoạt, dễ mở rộng, hỗ trợ message động và message API
* **UI component chuẩn hóa**: dễ tái sử dụng, thống nhất thiết kế (ThemedView, RegexInput, StageDots...)
* **Tối ưu hiệu năng** với `useMemo`, `useCallback`, `context provider`, animation
* **Quản lý trạng thái toàn cục** qua các Provider: Loading, ScreenWrapper, AppLanguage...
* Kiểm tra dữ liệu đầu vào **tập trung và mạnh mẽ** bằng Regex & message mapping
* Hỗ trợ **Dark/Light Mode** tự động
* Kiến trúc module hóa giúp mở rộng và bảo trì dễ dàng

---

## Cấu trúc thư mục chi tiết

```plaintext
BKI_2025_FE/
│
├── app/                         # Các route và layout chính của ứng dụng
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── onboard/
│   ├── (auth)/
│   │   ├── login.tsx
│   │   ├── sign-up.tsx
│   │   └── ...
│   └── (privates)/
│       ├── general.tsx
│       ├── profile.tsx
│       └── ...
│
├── assets/                      # Ảnh, font, icon
│   ├── fonts/
│   │   ├── SpaceMono-Regular.ttf
│   │   ├── Geo-BT-Regular.ttf
│   │   └── ...
│   └── images/
│       └── ...
│
├── components/                  # Các component UI tái sử dụng
│   ├── atoms/
│   │   ├── themed_text/
│   │   │   ├── index.tsx
│   │   │   └── styles.tsx
│   │   ├── themed_view/
│   │   │   ├── index.tsx
│   │   │   └── styles.tsx
│   │   ├── regex_input/
│   │   │   ├── index.tsx
│   │   │   └── styles.tsx
│   │   └── ...
│   ├── ui/
│   │   ├── screen_wrapper/
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   ├── loading_screen/
│   │   │   └── index.tsx
│   │   ├── parallax_scroll_view/
│   │   │   ├── index.tsx
│   │   │   └── styles.tsx
│   │   └── ...
│   └── ...
│
├── hooks/                       # Custom hooks
│   ├── useIsFirstLaunch.ts
│   ├── useCurrentPageId.ts
│   └── ...
│
├── languages/                   # Đa ngôn ngữ, message, provider
│   ├── vi.ts
│   ├── en.ts
│   ├── provider/
│   │   ├── index.tsx
│   │   └── types.ts
│   └── document.txt
│
├── models/                      # Định nghĩa kiểu dữ liệu, DTO
│   ├── user.ts
│   ├── auth.ts
│   └── ...
│
├── pages/                       # Các màn hình chức năng (nếu tách riêng)
│   ├── LoginPage.tsx
│   ├── OnboardPage.tsx
│   └── ...
│
├── providers/                   # Context provider (loading, language, screen wrapper)
│   ├── loading_provider/
│   │   └── index.tsx
│   ├── screen_wrapper_provider/
│   │   └── index.tsx
│   ├── AppLanguageProvider/
│   │   └── index.tsx
│   └── index.tsx
│
├── services/                    # Giao tiếp API, service logic
│   ├── auth.service.ts
│   ├── baseApiService.ts
│   └── ...
│
├── settings/                    # Cấu hình chung, navigation, regex, theme
│   ├── navigation/
│   │   ├── page.ts
│   │   └── ...
│   ├── regex.ts
│   ├── theme.ts
│   └── index.ts
│
├── utils/                       # Hàm tiện ích
│   ├── format.ts
│   ├── validate.ts
│   └── ...
│
├── app.tsx
├── README.md
└── package.json
```

---

## Hướng dẫn cài đặt và chạy

1. **Cài đặt dependencies:**

```bash
npm install
# hoặc
yarn install
```

2. **Chạy ứng dụng:**

```bash
npx expo start
```

3. **Cấu hình môi trường:**

* Kiểm tra và cấu hình các giá trị như `API_BASE_URL`, `theme`... trong `settings/` hoặc `index.ts`.

---

## Đa ngôn ngữ (i18n)

* Mỗi ngôn ngữ có một file riêng: `vi.ts`, `en.ts`
* Các thông báo lỗi động hoặc từ API được phân biệt rõ ràng
* Sử dụng `useLanguage` hook:

```tsx
const { t, getMessage, getAPIMessage } = useLanguage();
```

* Thêm ngôn ngữ mới chỉ cần:

  * Tạo file `xx.ts`
  * Khai báo trong `languages/provider.tsx`

---

## Kiểm tra dữ liệu đầu vào bằng Regex

* Các biểu thức kiểm tra được khai báo tập trung trong `settings/regex.ts`
* Mapping thông báo lỗi tương ứng trong `vi.ts` / `en.ts`
* Component `RegexInput` tự động:

  * Kiểm tra đầu vào
  * Hiển thị checklist điều kiện (ví dụ: độ dài, ký tự đặc biệt, email hợp lệ, ...)

---

## Quy ước phát triển

* Tuân thủ quy tắc đặt tên rõ ràng, nhất quán
* Viết component nhỏ, tái sử dụng nếu có thể
* Ưu tiên tách logic ra `hooks`, `utils`, tránh viết thẳng trong màn hình
* Có comment mô tả rõ nếu function phức tạp
* Đọc kỹ `document.txt` để hiểu cơ chế đa ngôn ngữ, regex, và quản lý trạng thái

---

## Bản quyền

© ViVuDi 2025. Toàn bộ bản quyền thuộc về nhóm phát triển ViVuDi.

---

## Liên hệ

* Tác giả chính: Minh Nhật
* Liên hệ nội bộ qua hệ thống ViVuDi hoặc tài liệu kèm theo dự án
