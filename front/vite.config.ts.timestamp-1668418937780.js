// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
var vite_config_default = defineConfig({
  server: {
    port: 3e3
  },
  resolve: { alias: { "@": "/src" } },
  plugins: [vue()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgICAgcG9ydDogMzAwMFxyXG4gICAgfSxcclxuICAgIHJlc29sdmU6IHsgYWxpYXM6IHsgJ0AnOiAnL3NyYycgfSB9LFxyXG4gICAgcGx1Z2luczogW3Z1ZSgpXVxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUdoQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixRQUFRO0FBQUEsSUFDSixNQUFNO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUyxFQUFFLE9BQU8sRUFBRSxLQUFLLE9BQU8sRUFBRTtBQUFBLEVBQ2xDLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFDbkIsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
