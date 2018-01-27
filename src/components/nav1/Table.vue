<template>
  <section>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="">
      <el-form-item >
        <el-input v-model="formInline.user" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="getUser">查询</el-button>
      </el-form-item>
       <el-form-item>
        <el-button type="primary" @click.native.prevent="AddmyUser">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        highlight-current-row
        @selection-change="handleSelectionChange"
        >
         <el-table-column
            type="selection"
            width="55">
          </el-table-column>
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
          sortable
          :formatter="formatter">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row,scope)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    <el-col :span="24" class="toolbar">
        <el-button type="danger" @click="allDelete" :disabled="this.sels.length===0">批量删除</el-button>
     
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="20"
          :total="total" style="width: 300px; float:right">
        </el-pagination>
      </el-col>

 <!-- 编辑框框 -->
    <el-dialog title="编辑" :visible="editFormVisible" :close-on-click-modal="false"  :before-close="handleClose">
        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="editForm.sex">
              <el-radio class="radio" :label="1">男</el-radio>
              <el-radio class="radio" :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
          </el-form-item>
          <el-form-item label="地址">
            <el-input type="textarea" v-model="editForm.addr"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
		</el-dialog>

	<!--新增界面-->
		<el-dialog title="新增" :visible ="addFormVisible?true: false" :close-on-click-modal="false"  :before-close="handleClose">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="handleAdd" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
  </section>
</template>

<script>
import {
  getUserListPage,
  removeUser,
  batchRemoveUser,
  editUser,
  addUser,
  test
} from "../../api/api";
import util from "../../common/js/util";
export default {
  data() {
    return {
      sels: [], //列表选中列
      formInline: {
        user: "",
        region: ""
      },
      filters: {
        name: ""
      },
      loading: false,
      users: [],

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        id: 0,
        name: "",
        sex: -1,
        age: 0,
        birth: "",
        addr: ""
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        name: "",
        sex: -1,
        age: 0,
        birth: "",
        addr: ""
      },

      tableData: [],
      currentRow: null,
      page: 1,
      total: 0
    };
  },
  methods: {
    formatter(row, column) {
      return row.addr;
    },
    //框框关闭
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.editFormVisible = false;
          this.addFormVisible = false;
        })
        .catch(_ => {});
    },
    //查询按钮
    getUser() {
      // let num = 123;
      // test(num).then(data=>{
      //   console.log(data.data);
      // })
      this.loading = true;
      let name = this.formInline.user;
      let page = this.page;
      getUserListPage({ name, page }).then(data => {
        this.tableData = data.data.users;
        this.total = data.data.total;
        console.log(this.total);
        this.loading = false;
      });
    },
    AddmyUser() {
      console.log(this.addFormVisible);
      this.addFormVisible = true;
      this.addForm = {
        name: "",
        sex: -1,
        age: 0,
        birth: "",
        addr: ""
      };
    },
    handleAdd() {
      addUser(this.addForm).then(res => {
        console.log(res.data.msg);
        this.getUser();
        this.addFormVisible = false;
      });
    },
    handleSelectionChange(val) {
      this.sels = val;
      console.log(this.sels);
    },
    handleEdit(index, row, scope) {
      console.log(scope);
      console.log(index, row);
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    editSubmit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let para = Object.assign({}, this.editForm);
            console.log(JSON.stringify(para.birth));
            para.birth =
              !para.birth || para.birth == ""
                ? ""
                : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            console.log(para.birth);
            editUser(para).then(res => {
              this.editLoading = false;
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getUser();
            });
          });
        }
      });
    },
    handleDelete(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          removeUser(row).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
          });
          this.getUser();
        })
        .catch(() => {});
    },
    allDelete() {
      console.log(this.sels);
      let ids = this.sels.map(item => item.id).toString();
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: ids };
          batchRemoveUser(para).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getUser();
          });
        })
        .catch(() => {});
    },
    handleCurrentChange(val) {
      //改变页数
      this.page = val;
      this.getUser();
    },
    created() {
      console.log("this is Table created");
    }
  },
  mounted() {
    console.log("this is Table");
    this.getUser();
  }
};
</script>

<style>
.toolbar {
  text-align: left;
}
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

.el-pagination.is-background .el-pager li {
  margin: 0;
  border: 1px solid silver;
}
</style>
