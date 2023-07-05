<template>
  <div class="search-layout">
    <Header />
    <div class="resource_search">
      <div class="panel page_w" id="panel">
        <div class="panel_header">
          <div class="title_box">
            <img src="../../assets/icon/panel_header_title.png" />
            <p class="header_label">资源大厅</p>
          </div>
          <div class="search_box">
            <el-input placeholder="请输入资源名称或用户名搜索" size="large" v-model="search.keywords">
              <template #append>
                <el-button icon="Search" @click="updataData" size="large">搜索</el-button>
              </template>
            </el-input>
          </div>
        </div>
        <el-tabs v-model="activeTab" class="panel_tabs">
          <el-tab-pane label="服务" name="服务"></el-tab-pane>
          <el-tab-pane label="需求" name="需求"></el-tab-pane>
          <el-tab-pane label="科创资源" name="科创资源"></el-tab-pane>
        </el-tabs>
        <div class="panel_main" v-show="activeTab === '服务'" v-loading="loading">
          <div class="panel_condition">
            <Condition label="服务类型:" :list="ladderlist" :select="search.serviceTypeId" @setService="setService"
              str="serviceTypeId" />
            <el-divider />
            <Condition v-show="search.serviceTypeId !== ''" label="二级分类:" :list="serviceTypeList2"
              :select="search.serviceTypeId2" @setService="setService" str="serviceTypeId2" />
            <el-divider v-show="search.serviceTypeId !== ''" />
            <Condition label="技术领域:" :list="list" :select="search.technicalId" @setService="setService"
              str="technicalId" />
            <el-divider />
            <Condition label="数据来源:" :list="dataOrigin" :select="search.dataOrigin" @setService="setService"
              str="dataOrigin" />
            <el-divider />
            <Condition label="地区:" :list="province" :select="search.province" @setService="setService" str="province" />
          </div>
          <div class="panel_condition" v-show="activeTab === '需求'"></div>
          <div class="panel_condition" v-show="activeTab === '科创资源'"></div>
          <div class="result">
            <el-table :data="resultData" style="width:100%" border stripe highlight-current-row @row-click="rowClick"
              @cell-mouse-enter="(row) => tableHoverRowId = row.id" @cell-mouse-leave="tableHoverRowId = ''">
              <el-table-column label="服务名称" prop="title" width="350">
                <template #default="scope">
                  <p class="tw-text-[16px] tw-font-bold tw-line-clamp-2"
                    :class="{ hover: tableHoverRowId === scope.row.id }">
                    {{ scope.row.title }}</p>
                </template>
              </el-table-column>
              <el-table-column label="发布用户" width="300">
                <template #default="scope">
                  <div class="userInfo">
                    <img :src="scope.row.avatarUrl || 'https://test.nttcc.com.cn/_nuxt/img/default_avatar.442622a.png'"
                      style="width:40px;height:40px;margin-right:20px" loading="lazy" />
                    <p class="tw-text-[16px] tw-font-bold" :class="{ hover: tableHoverRowId === scope.row.id }">{{
                      scope.row.orgName }}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="服务类型" width="200">
                <template #default="scope">
                  <p class="tw-text-[14px]">{{ scope.row.serviceTypeName }}</p>
                </template>
              </el-table-column>
              <el-table-column label="成功成交数">
                <template #default="scope">
                  <p class="tw-text-[14px]" style="color: #f1b221">{{ scope.row.totalDeal }}</p>
                </template>
              </el-table-column>
              <el-table-column label="信用评价">
                <template #default="scope">
                  <p class="tw-text-[16px] tw-font-bold" style="color:#3473e6">{{ scope.row.avgScore }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="panel_pagination">
            <el-pagination background layout="prev, pager, next,jumper" :total="pagination.total"
              :page-size="search.pageSize" v-model:current-page="search.pageNum" @current-change="handleCurrentChange"
              hide-on-single-page />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header';
import Condition from '@/components/Condition';
import { computed, onMounted, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import axios from 'axios';

const Router = useRouter();

const loading = ref(false);
const tableHoverRowId = ref('');
const activeTab = ref('服务');
const ladderlist = ref([]);
const list = ref([]);
const dataOrigin = ref([
  { id: 'nttcc', name: '共创云' },
  { id: '51kehui', name: '科惠云' },
  { id: 'jxstc', name: '江西省网上常设技术市场' },
  { id: 'hntpe', name: '潇湘科技要素大市场' }
]);
const pagination = ref({
  total: 0,
  currentPage: 1,
  lastPage: 1,
  perPage: 10
})
const serviceTypeList2 = computed(() => {
  let data = [];
  if (search.value.serviceTypeId !== '') {
    data = ladderlist.value.find(i => i.id == search.value.serviceTypeId).children;
  }
  return data;
})
const province = ref([
  { id: "湖北省", name: "湖北省" },
  { id: "湖南省", name: "湖南省" },
  { id: "江西省", name: "江西省" },
  { id: "北京市", name: "北京市" },
  {
    id: "天津市", name: "天津市"
  }, {
    id: "河北省", name: "河北省"
  }, {
    id: "山西省", name: "山西省"
  }, {
    id: "内蒙古自治区", name: "内蒙古自治区"
  }, {
    id: "辽宁省", name: "辽宁省"
  }, {
    id: "吉林省", name: "吉林省"
  }, {
    id: "黑龙江省", name: "黑龙江省"
  }, {
    id: "上海市", name: "上海市"
  }, {
    id: "江苏省", name: "江苏省"
  }, {
    id: "浙江省", name: "浙江省"
  }, {
    id: "安徽省", name: "安徽省"
  }, {
    id: "福建省", name: "福建省"
  }, {
    id: "山东省", name: "山东省"
  }, {
    id: "河南省", name: "河南省"
  }, {
    id: "广东省", name: "广东省"
  }, {
    id: "广西壮族自治区", name: "广西壮族自治区"
  }, {
    id: "海南省", name: "海南省"
  }, {
    id: "重庆市", name: "重庆市"
  }, {
    id: "四川省", name: "四川省"
  }, {
    id: "贵州省", name: "贵州省"
  }, {
    id: "云南省", name: "云南省"
  }, {
    id: "西藏自治区", name: "西藏自治区"
  }, {
    id: "陕西省", name: "陕西省"
  }, {
    id: "甘肃省", name: "甘肃省"
  }, {
    id: "青海省", name: "青海省"
  }, {
    id: "宁夏回族自治区", name: "宁夏回族自治区"
  }, {
    id: "新疆维吾尔自治区", name: "新疆维吾尔自治区"
  }, {
    id: "台湾省", name: "台湾省"
  }, {
    id: "香港特别行政区", name: "香港特别行政区"
  }, {
    id: "澳门特别行政区", name: "澳门特别行政区"
  }
])
const search = ref({
  pageNum: 1,
  pageSize: 10,
  keywords: '',
  serviceTypeId: '',
  serviceTypeId2: '',
  technicalId: '',
  province: '',
  dataOrigin: '',
  logicStatus: 1
})

function rowClick(row, column, e) {
  const { href } = Router.resolve({
    path: '/login'
  })
  window.open(href, '_blank');
}

watch(() => search.value.serviceTypeId, () => {
  search.value.serviceTypeId2 = '';
})

function setService(obj) {
  search.value[obj.str] = obj.value;
  updataData();
}

function handleCurrentChange() {
  getdata();
}

async function getLadderlist() {
  loading.value = true;
  const result = await axios.get('https://service.test.nttcc.com.cn/admin/api/v1/service_type/ladderlist');
  const { data: { code, data, message } } = result;
  if (code === 0) ladderlist.value.push(...data);
  else ElMessage.warning(message);
  loading.value = false;
}

async function getList() {
  loading.value = true;
  const result = await axios.get('https://service.test.nttcc.com.cn/api/v1/technical/list');
  const { data: { code, data, message } } = result;
  if (code === 0) list.value.push(...data.list);
  else ElMessage.warning(message);
  loading.value = false;
}

const resultData = ref([]);

async function getdata() {
  loading.value = true;
  const result = await axios({ url: 'https://service.test.nttcc.com.cn/api/v1/service/list', params: search.value, method: 'get' });
  const { data: { code, data, message } } = result;
  if (code === 0) {
    resultData.value.splice(0);
    resultData.value.push(...data.list);
    const { total, lastPage, perPage, currentPage } = data;
    pagination.value.total = total;
    pagination.value.currentPage = currentPage;
    pagination.value.perPage = perPage;
    pagination.value.lastPage = lastPage;
    search.value.pageNum = currentPage;
  }
  else ElMessage.warning(message);
  loading.value = false;
}

function updataData() {
  search.value.pageNum = 1;
  getdata();
}

watch(search, (nv, ov) => {
  console.log(nv, ov);
})

onMounted(() => {
  getLadderlist();
  getList();
  getdata();
})

</script>

<style scoped lang="less">
.search-layout {
  min-width: 1240px;
}

.resource_search {
  width: 100%;
  background-color: #f6f7f8;
  padding: 30px 0;

  .panel {
    padding: 30px;
    background: #fff;
    box-shadow: 0 0 6px rgba(0, 0, 0, .06);
    border-radius: 4px;
    box-sizing: border-box;

    .panel_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 40px;
      margin-bottom: 20px;

      .title_box {
        display: flex;
        height: 22px;
        align-items: center;

        img {
          margin-right: 16px;
        }

        .header_label {
          font-size: 16px;
          font-weight: 700;
          line-height: 22px;
          color: #303133;
        }
      }

      .search_box {
        width: 540px;
      }
    }

    .panel_tabs {
      height: 48px;
      padding: 0 30px;
      margin-bottom: 10px;
      background: #f7f8f9;
      border-radius: 4px;

    }

    .panel_main {
      min-height: 100px;

      .panel_condition {
        padding: 0 20px;
        margin-bottom: 30px;
        background: #fff;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
      }

      .result {
        padding: 10px 0;

        .userInfo {
          display: flex;
          align-items: center;
        }
      }
    }

    .panel_pagination {
      padding: 20px 0;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
<style>
.el-input .el-input-group__append {
  background-color: #3473e6;
  color: #fff;
}

.el-tabs__nav-wrap::after {
  background-color: transparent;
}

.el-tabs__item:not(:last-child) {
  margin-right: 120px;

}

.el-tabs__item {
  width: 40px;
  padding: 0;
  font-weight: 700;
  transform: translateY(3px);
}

.el-tabs__active-bar {
  width: 40px;
}

.el-table__row {
  cursor: pointer;
}

.el-divider.el-divider--horizontal {
  margin: 0;
}
</style>