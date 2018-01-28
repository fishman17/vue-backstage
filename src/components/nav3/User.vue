<template>
<section>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="">
      <el-form-item >
        <el-input v-model="formInline.user" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getUser">查询</el-button>
      </el-form-item>
    </el-form>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        highlight-current-row
        v-loading = "loading"
        >
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="birth"
          label="日期"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="addr"
          label="地址"
          :formatter="formatter">
        </el-table-column>
      </el-table>
</section>
</template>

<script>
import { getUserList } from "../../api/api";
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      filters: {
        name: ""
      },
      loading: false,
      users: [],
      tableData: [],
      currentRow: null
    };
  },
  methods: {
    formatter(row, column) {
      return row.addr;
    },
    getUser() {
      this.loading = true;
      let name = this.formInline.user;
      getUserList({ name }).then(data => {
        console.log(data);
        this.tableData = data.data.users;
        this.loading = false;
      });
    }
  },
  mounted() {
    this.getUser();
    console.log("mounted");
  }
};
</script>

<style scoped>
.el-table .cell {
  text-align: left;
}
.demo-form-inline {
  /* display: flex;
  align-items: center;
  justify-content: flex-start; */
  padding: 10px;
  text-align: left;
  background-color: #f2f2f2;
}
.el-form-item {
  margin-bottom: 0;
}
</style>
