<template>
  <el-steps
    :active="currentStep"
    align-center
  >
    <el-step title="创建订单">
      <div slot="description">2019-08-17 14:25</div>
    </el-step>
    <el-step title="已到达工厂">
      <div slot="description">2019-08-17 14:25</div>
    </el-step>

    <el-step title="清洗中">
      <div slot="description">
        <div>2019-08-17 14:25</div>
        <!-- 人员详细信息 -->
        <vs-dropdown
          class="w-full"
          vs-trigger-click
          vs-custom-content
        >
          <div class="block">
            <span class="mr-2">负责人</span>
            <vs-avatar
              size="small"
              src="https://ws1.sinaimg.cn/large/775017f8gy1g6b17a8l0zj20b40b43yl.jpg"
            />
          </div>
          <vs-dropdown-menu class="dropdown-menu">
            <div class="dropdown-menu__content">
              <div class="flex items-center">
                <div class="mr-2">
                  <div class="item">
                    <span
                      class="label"
                      style="font-size: 12px;"
                    >姓名</span>
                    <span class="value">吴彦祖</span>
                  </div>
                  <div class="item mt-2">
                    <span
                      class="label"
                      style="font-size: 12px;"
                    >工号</span>
                    <span class="value">9394</span>
                  </div>
                </div>
                <vs-avatar
                  size="large"
                  src="https://ws1.sinaimg.cn/large/775017f8gy1g6b17a8l0zj20b40b43yl.jpg"
                />
              </div>
            </div>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
    </el-step>

    <el-step title="正在派送">
      <div slot="description">
        <div>2019-08-17 14:25</div>
        <vs-dropdown
          class="w-full"
          vs-trigger-click
          vs-custom-content
        >
          <div class="block">
            <span class="mr-2">配送员</span>
            <vs-avatar
              size="small"
              src="https://ws1.sinaimg.cn/large/775017f8gy1g6b17a8l0zj20b40b43yl.jpg"
            />
          </div>
          <vs-dropdown-menu class="dropdown-menu">
            <div class="dropdown-menu__content">
              <div class="flex items-center">
                <div class="mr-2">
                  <div class="item">
                    <span
                      class="label"
                      style="font-size: 12px;"
                    >姓名</span>
                    <span class="value">刘德华</span>
                  </div>
                  <div class="item mt-2">
                    <span
                      class="label"
                      style="font-size: 12px;"
                    >工号</span>
                    <span class="value">9527</span>
                  </div>
                </div>
                <vs-avatar
                  size="large"
                  src="https://ws1.sinaimg.cn/large/775017f8gy1g6b17a8l0zj20b40b43yl.jpg"
                />
              </div>
            </div>
            <div class="text-center bg-gray-200 text-gray-500 cursor-pointer">电话联系</div>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
    </el-step>
    <el-step title="已送达">
    </el-step>
    <el-step title="已取走">
    </el-step>
  </el-steps>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 4,
    };
  },
};
</script>

<style lang="scss" scoped>
.block {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999999;
  background: rgb(236, 236, 236);
  border-radius: 5px;
}

.dropdown-menu {
  .dropdown-menu__content {
    padding: 15px 20px;
  }
}

.item {
  display: flex;
  align-items: center;
  .label {
    margin-right: 5px;
    padding: 2px 5px;
    color: gray;
    border-radius: 4px;
    font-size: 12px;
    background: #ebebeb;
  }
}
</style>
