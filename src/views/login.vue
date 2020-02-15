<template>
<body class="login">
   <Card id="signUp" v-show="isShow" style="width:300px;margin-top: 12%;margin-left: 20%;height: auto;">
        <p slot="title">注册</p>
        <Form ref="registerInfo" :model="registerInfo" style="margin-top: 10px;">
           <FormItem prop="user">
              <Input type="text" v-model="registerInfo.user" placeholder="Username" >
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
          </FormItem>
          <FormItem prop="password">
              <Input type="password" v-model="registerInfo.password" placeholder="Password" >
                  <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
          </FormItem>
          <RadioGroup v-model="identity" style="float: right;margin-top: -15px;">
                  <Radio label="user">
                      <span>用户</span>
                  </Radio>
                  <Radio label="admin">
                      <span>管理员</span>
                  </Radio>
              </RadioGroup>y
          <FormItem>
              <Button type="primary" style="width: 250px;margin-top: 15px;margin-left: 10px;" @click="logupTo">注册</Button>
          </FormItem>
          <FormItem>
              <Button type="text" @click="signIn" style="float: right;margin-top: -10px;font-size: 10px;color:darkgrey;" >已注册，返回登录</Button>
          </FormItem>
        </Form>
    </Card>
</body>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      notice: false,
      show: true,
      loginInfo: {
        user: '',
        password: ''
      },
      registerInfo: {
        user: '',
        password: ''
      },
      identity: 'user',
      uid: '',
      modal1: false
    }
  },
  mounted () {
  },
  methods: {
    loginTo () {
      this.$get('/LoginServlet', {
        username: this.loginInfo.user,
        password: this.loginInfo.password
      })
        .then((response) => {
          console.log(response)
          if (response.state === 'login success') {
            this.$Notice.success({
              title: '登录成功'
            })
            let idd = response.uid
            this.$router.push({
              name: 'main',
              params: {
                uid: idd
              }
            })
            this.$cookies.set('uid', idd, 60 * 60)
          } else {
            this.$Notice.error({
              title: '登录失败，用户名密码错误或用户不存在'
            })
          }
        })
    },
    logupTo () {
      this.$get('/RegisterServlet', {
        username: this.registerInfo.user,
        password: this.registerInfo.password,
        identity: this.identity
      })
        .then((response) => {
          console.log(response.state)
          if (response.state === 'register success') {
            this.$Notice.success({
              title: '注册成功'
            })
            this.signIn()
          } else {
            this.$Notice.error({
              title: '注册失败,用户已存在'
            })
          }
        })
    },
    signUp () {
      this.isShow = true
      this.show = false
    },
    signIn () {
      this.isShow = false
      this.show = true
    }
  }
}
</script>

<style>
.login{
  background:url(../images/back.jpg) ;
  background-size: cover;
  position: absolute;
  left:0px;
  top:0px;
  z-index: -1;
  width: 100%;
  height: 100%;
}
</style>
