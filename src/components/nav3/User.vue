<template>
<section>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="">
      <el-form-item >
        <el-input v-model="formInline.user" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        highlight-current-row
        
        >
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="date"
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
          prop="address"
          label="地址"
          :formatter="formatter">
        </el-table-column>
      </el-table>
</section>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
    	filters: {
					name: ''
				},
				loading: false,
				users: [
				],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      currentRow: null
    };
  },
  methods: {
    formatter(row, column) {
      console.log(row, column);
      return row.address;
    },
    onSubmit(){
      
    }
  }
};
</script>

<style>
.el-table .cell {
  text-align: left;
}
.demo-form-inline{
  /* display: flex;
  align-items: center;
  justify-content: flex-start; */
  padding: 10px;
  text-align: left;
  background-color:  #f2f2f2;
}
.el-form-item{
  margin-bottom: 0;
}
</style>
