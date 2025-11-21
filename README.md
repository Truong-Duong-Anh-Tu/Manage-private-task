## Private Task Manager

Ứng dụng web giúp quản lý nhiệm vụ cá nhân với giao diện React (Vite) và backend .NET 9 kết nối MySQL. Người dùng có thể tạo, cập nhật, lọc và xóa nhiệm vụ, theo dõi lịch cũng như biểu đồ trạng thái( chưa hoàn thành)

## Kiến trúc & Công nghệ
- Frontend: React 19 + Vite, React Router, Recharts, React Calendar, Axios.
- Backend: ASP.NET Core 9 Web API, EF Core 9 với Pomelo MySQL provider, mô hình Service/Repository.
- Database: MySQL (ví dụ chạy cục bộ trên `localhost:3306`) (có thể cài đặt trên docker)

## Yêu cầu hệ thống
- Node.js ≥ 20 và npm.
- .NET SDK 9.0.
- MySQL Server ≥ 8.0 (hoặc tương thích MariaDB).
- (Tuỳ chọn) `dotnet-ef` CLI để migrate thủ công:\
  `dotnet tool install --global dotnet-ef`

## Bắt đầu nhanh
1. Clone project:\
   `git clone <repo> && cd PrivateTaskManager`
2. Chuẩn bị database `MissionDB`
3. Cập nhật chuỗi kết nối trong `Backend/TaskAPI/appsettings.json`.
4. Cài đặt frontend dependencies( node_modules) và chạy cả hai dịch vụ như hướng dẫn dưới đây.

## Thiết lập Backend (TaskAPI)
```powershell
cd Backend/TaskAPI
dotnet restore(cài đặt dotnet)
```

## Thêm các package (phiên bản phù hợp với dotnet 9.0)
- dotnet add package Microsoft.EntityFrameworkCore
- dotnet add package Pomelo.EntityFrameworkCore.MySql
- dotnet add package Microsoft.EntityFrameworkCore.Design
- dotnet tool install --global dotnet-ef

### Cấu hình database
- Mặc định `appsettings.json` dùng `server=localhost;port=3306;database=MissionDB;user=root;password=root`.
- Nếu cần thông tin bảo mật, hãy tạo file `appsettings.Development.json` riêng và không commit.

### Tạo database & chạy migration
```powershell
dotnet tool run dotnet-ef migrations add Init
dotnet tool run dotnet-ef database update
```

### Chạy API
```powershell
dotnet run
```
- API lắng nghe mặc định tại `http://localhost:5054`.
- Swagger sẵn tại `http://localhost:5054/swagger`.

## API chính
| Phương thức | Đường dẫn | Mô tả |
|-------------|-----------|-------|
| GET | `/API/Missions?search={từ-khóa}` | Lấy danh sách nhiệm vụ (có lọc). |
| GET | `/API/Missions/{id}` | Lấy chi tiết một nhiệm vụ. |
| POST | `/API/Missions` | Tạo nhiệm vụ mới (body: `title`, `description`, `status`, `dueDate`, ...). |
| PUT | `/API/Missions/{id}` | Cập nhật nhiệm vụ. |
| DELETE | `/API/Missions/{id}` | Xoá nhiệm vụ. |

> Các DTO nằm trong `Backend/TaskAPI/Dtos` mô tả chính xác field yêu cầu.

## Thiết lập Frontend (Vite React)
```powershell
cd Frontend
npm install
```

### Cấu hình endpoint
- File `Frontend/api/client.js` đang trỏ tới `http://localhost:5054/API`.
- Nếu backend chạy port khác, chỉnh `baseURL` hoặc thay bằng biến môi trường Vite (`import.meta.env.VITE_API_URL`), 

### Chạy dev server
```powershell
npm run dev
```
- Vite phục vụ tại `http://localhost:5173` (có HMR).

## Luồng chạy song song
1. Terminal A:
   ```powershell
   cd Backend/TaskAPI
   dotnet run
   ```
2. Terminal B:
   ```powershell
   cd Frontend
   npm run dev
   ```
3. Mở trình duyệt: `http://localhost:5173`.

## Cấu trúc thư mục chính
```
PrivateTaskManager
├── Backend/TaskAPI       # ASP.NET Core Web API
├── Frontend              # Ứng dụng React Vite
└── PrivateTaskManager.sln
```

## Khắc phục sự cố
- **Không kết nối được DB**: kiểm tra MySQL đang chạy, tài khoản, firewall, charset `utf8mb4`.
- **Migration lỗi**: xoá file trong `Backend/TaskAPI/Migrations` (nếu cần) và tạo lại `dotnet ef migrations add Init`.
- **CORS**: ASP.NET đã bật mặc định trong `Program.cs`. Nếu đổi domain, đảm bảo thêm `WithOrigins`.
- **Frontend không gọi được API**: kiểm tra `client.js` `baseURL`, bật DevTools xem lỗi network.