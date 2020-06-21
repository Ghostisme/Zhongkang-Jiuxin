<!-- 检验检查项目弹窗内容的表格 -->
<template>
  <a-table bordered :columns="columns"  :dataSource="data" :pagination="false">
    <!-- slot-scope="name" -->
    <template slot="name" slot-scope="text, record">
      <!-- {{ name.first }} {{ name.last }} -->
    </template>
    <template slot="checkbox" slot-scope="text, record">
      <a-checkbox></a-checkbox>
    </template>
  </a-table>
</template>

<script>
  import reqwest from 'reqwest';

  const columns = [{
    title: '选',
    dataIndex: 'checkBox',
    width: '80px',
    scopedSlots: { customRender: 'checkBox' }
  },
  {
    title: '名称',
    dataIndex: 'email',
    width: '80px'
  }];

  export default {
    mounted() {
      // this.fetch();
      // this.handlePhone();
    },
    data() {
      return {
        data: [],
        pagination: {},
        loading: false,
        columns,
      }
    },
    // fetch(params = {}) {
    //   // console.log('params:', params);
    //   this.loading = true;
    //   reqwest({
    //     url: 'https://randomuser.me/api',
    //     method: 'get',
    //     data: {
    //       results: 10,
    //       ...params
    //     },
    //     type: 'json'
    //   }).then(data => {
    //     // console.log(data);
    //     const pagination = { ...this.pagination };
    //     // Read total count from server
    //     // pagination.total = data.totalCount;
    //     pagination.total = 200;
    //     this.loading = false;
    //     this.data = data.results.splice(0,2);
    //     this.pagination = pagination;
    //   });
    // },
  }
</script>

<style>
</style>
