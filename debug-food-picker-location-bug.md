[OPEN] food-picker-location-bug

## 症状
- “获取定位/定位”功能不可用（无反应 / 不弹授权 / 报错 / 不出结果）

## 期望
- 点击“定位”后弹出定位授权
- 成功获取经纬度后自动检索附近餐厅并更新列表

## 假设（可证伪）
- A. 当前访问的不是最新版本（页面仍是旧构建/旧缓存），导致“定位”按钮或逻辑根本未生效
- B. 运行环境不满足定位前置条件（非 HTTPS、内置浏览器限制、权限被禁用），导致 `navigator.geolocation` 不可用或直接失败
- C. 点击事件没有触发/被禁用（loading 状态、按钮未渲染、样式覆盖），导致没有执行定位逻辑
- D. 定位成功但“按经纬度检索”请求失败（地图 API / CORS / 网络），导致 UI 不更新或报错
- E. 反向地理编码或附近检索接口异常，导致 `resolvedAddress/restaurants` 没有被正确写入

## 需要采集的证据（运行时）
- 页面是否渲染了“定位”按钮、当前 URL、UserAgent
- 点击“定位”是否触发 handler、当时的 loading/isLocating 状态
- `navigator.geolocation` 是否存在、`getCurrentPosition` 成功/失败 code 与 message
- 经纬度拿到后是否进入 `searchNearbyByCoordinates`，以及请求结果/错误

## 操作步骤（复现）
1) 打开 `/food-picker`
2) 点击“定位”
3) 观察 UI 与错误提示

## 结论
- 已确认线上存在“旧缓存版本”场景：旧页面交互快照中不包含“获取定位”按钮（导致用户认为“用不了”）。
- 已确认新版本页面存在“定位超时”场景：点击“获取定位”后按钮进入 disabled 状态，约 10s 后提示“获取定位超时，请再试一次或手动输入地址”。
