<template>
 <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
         <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
       <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
       </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
      <el-button type="primary"  @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
      <el-button @click.native.prevent="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { requestLogin } from "../../api/api";
export default {
  data() {
    return {
      logining: false,
      ruleForm: {
        account: "admin",
        checkPass: "123456"
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { type: "string", message: "账号必须为字符和数字" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
          //{ validator: validaePass }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    handleReset() {
      this.$refs.ruleForm.resetFields();
    },
    handleSubmit(event) {
      // console.log(this.$refs.ruleForm);
      this.$refs.ruleForm.validate(valid => {
        console.log(111);
        if (valid) {
          // this.logining = true;
          var loginParams = {
            username: this.ruleForm.account,
            password: this.ruleForm.checkPass
          };
          this.logining = false;
          //NProgress.done();
          // requestLogin(loginParams).then(data => {
          //   let { msg, code, user } = data;
          //   if (code !== 200) {
          //     this.$message({
          //       message: msg,
          //       type: "error"
          //     });
          //   } else {
          //     sessionStorage.setItem("user", JSON.stringify(user));
          //     this.$router.push({ path: "/Table" });
          //   }
          // });
          const user = [
            {
              id: 1,
              username: "admin",
              password: "123456",
              avatar:"https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png",
              name: "张某某"
            }
          ];
          sessionStorage.setItem("user", JSON.stringify(user));
          this.$router.push({ path: "/table" });
        }
      });
    }
  }
};
</script>

<style scoped>
.demo-ruleForm {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.el-form-item {
  margin-left: 0;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.remember {
  margin: 0px 0px 35px 0px;
}
</style>
