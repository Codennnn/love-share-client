<template>
  <vs-table
    class="bg-white"
    noDataText="暂无数据"
    :data="goodsList"
  >
    <template slot="thead">
      <vs-th>#</vs-th>
      <vs-th>商品名称</vs-th>
      <vs-th>数量</vs-th>
      <vs-th>价格</vs-th>
      <vs-th>备注信息</vs-th>
    </template>

    <template slot-scope="{data}">
      <vs-tr
        v-for="(tr, i) in data"
        :key="i"
      >
        <vs-td>
          <el-image
            class="w-20 h-20 radius base-shadow"
            fit="contain"
            :src="`${tr.goods.img_list[0]}?imageView2/2/w/100`"
          >
          </el-image>
        </vs-td>
        <vs-td>{{ tr.goods.name }}</vs-td>
        <vs-td>{{ tr.amount }}</vs-td>
        <vs-td>￥{{ $numFixed(tr.goods.price) }}</vs-td>
        <vs-td class="w-40 break-words break-all">{{ tr.note }}</vs-td>
      </vs-tr>
    </template>
  </vs-table>
</template>

<script>
export default {
  name: 'OrderGoodsList',
  props: {
    goodsList: {
      type: Array,
      required: true,
    },
  },
}
</script>
