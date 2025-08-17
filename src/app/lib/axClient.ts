import axios, { AxiosError } from "axios";

const api = axios.create({
    baseURL: 'https://api.nolink.ir/',
    withCredentials: true, // ارسال خودکار کوکی‌ها
    headers: { "Content-Type": "application/json" },
});

// // ✅ Interceptor برای پاسخ‌ها
// api.interceptors.response.use(
//     (response) => response,
//     async (error: AxiosError) => {
//         const originalRequest: any = error.config;
//
//         // اگر 401 بود و هنوز retry نشده
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//
//             try {
//                 // تلاش برای گرفتن توکن جدید
//                 await api.post("/api/refresh");
//
//                 // درخواست اصلی رو دوباره اجرا کن
//                 return api(originalRequest);
//             } catch (err) {
//                 console.error("❌ Refresh Token نامعتبر یا منقضی شده است");
//
//                 // پاک کردن session کاربر (اختیاری)
//                 if (typeof window !== "undefined") {
//                     window.location.href = "/"; // هدایت به صفحه لاگین
//                 }
//
//                 return Promise.reject(err);
//             }
//         }
//
//         return Promise.reject(error);
//     }
// );
//
export default api;
