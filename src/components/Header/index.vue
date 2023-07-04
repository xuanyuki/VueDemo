<template>
  <header>
    <div class="header-main page_w">
      <div class="header-left">
        <a href="https://test.nttcc.com.cn/">
          <el-image src="https://test.nttcc.com.cn/_nuxt/img/logo_1.e54ae31.png" style="width:30px;height:30px" />
          <h1>共创云</h1>
        </a>
        <div class="mid_nav">
          <el-link :underline="false">服务产品</el-link>
          <el-link :underline="false">科创需求</el-link>
          <el-link :underline="false">专利论文</el-link>
          <el-link :underline="false">交易大数据</el-link>
        </div>
      </div>
      <div class="header-right">
        <el-button type="primary" @click="goLogin">登录</el-button>
        <el-button plain @click="goLogin">注册</el-button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const Router = useRouter();

function goLogin() {
  const { href } = Router.resolve({
    path: '/login'
  })
  window.open(href, '_blank');
}
</script>

<style lang="less" scoped>
header {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;

  .header-main {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-left {
      display: flex;
      align-items: center;

      a {
        display: flex;
        align-items: center;
        margin-right: 50px;

        .el-image {
          margin-right: 10px;
        }

        h1 {
          font-size: 16px;
          font-weight: 700;
          line-height: 22px;
          color: #3473e6;

        }
      }

      .mid_nav {
        display: flex;
        align-items: center;

        .el-link {
          margin-right: 0;
        }

        .el-link+.el-link {
          margin-left: 24px;
        }
      }

    }
  }
}
</style>