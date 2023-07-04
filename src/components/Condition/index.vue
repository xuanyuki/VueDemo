<template>
  <div class="condition" :class="{ istrue: conditionSwitch }">
    <p class="condition_label">{{ label }}</p>
    <div class="condition_list">
      <p class="condition_list_item" :class="{ select: select === '' }" @click="sendValue(str, '')">不限</p>
      <p class="condition_list_item" :class="{ select: select === item.id }" v-for="item in list" :key="item.id"
        @click="sendValue(str, item.id)">
        {{ item.name }}
      </p>
    </div>
    <div class="condition_switch" @click="conditionSwitch = !conditionSwitch">
      <p>{{ conditionSwitch ? "收起" : "更多" }}</p>
      <el-icon style="margin-left:4px">
        <ArrowDown v-show="!conditionSwitch" />
        <ArrowUp v-show="conditionSwitch" />
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import { ref} from 'vue';

const props = defineProps({
  label: String,
  select: String,
  str: String,
  list: Array
})

const emits = defineEmits(['setService']);

function sendValue(str, value) {
  emits('setService', {
    str,
    value
  })
}

const conditionSwitch = ref(false);

</script>

<style lang="less" scoped>
.condition {
  display: flex;
  overflow: hidden;
  margin-bottom: 10px;
  height: 40px;

  &.istrue {
    height: auto;
  }

  .condition_label {
    width: 120px;
    line-height: 30px;
    padding-left: 10px;
    margin-top: 10px;
    color: #909399;
    font-size: 14px;
  }

  .condition_list {
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-right: 74px;

    .condition_list_item {
      cursor: pointer;
      line-height: 20px;
      padding: 5px 10px;
      margin-right: 10px;
      margin-top: 10px;
      border-radius: 2px;
      color: #303133;

      &.select,
      &:hover {
        color: #fff;
        background-color: #3473e6;
      }
    }
  }

  .condition_switch {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 48px;
    height: 30px;
    margin-top: 10px;
    color: #3473e6
  }
}
</style>