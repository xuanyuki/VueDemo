import { createApp } from "vue";
import App from "./App.vue";
import "./index.css"
import router from "./router";
import { ElButton, ElImage, ElLink, ElInput, ElTabs, ElTabPane, ElMessage, ElIcon, ElTable, ElTableColumn,ElLoading,ElPagination,ElDivider } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElDivider);
app.use(ElPagination);
app.use(ElLoading);
app.use(ElTableColumn);
app.use(ElTable);
app.use(ElIcon);
app.use(ElButton);
app.use(ElImage);
app.use(ElLink);
app.use(ElInput);
app.use(ElTabs);
app.use(ElTabPane);
app.use(ElMessage);

app.use(router);

app.mount("#app");
