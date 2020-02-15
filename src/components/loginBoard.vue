<template>
  <Card v-show="show" style="width:300px;margin-top: 12%;margin-left: 20%;">
      <p slot="title">欢迎登录</p>
      <Form ref="loginInfo" :model="loginInfo" style="margin-top: 10px;">
         <FormItem prop="user">
            <Input type="text" v-model="loginInfo.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="loginInfo.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <Button style="float: right;margin-top: -25px;font-size: 3px;color:darkgrey;" type="text" @click="modal1 = true">忘记密码？</Button>
          <Modal
            v-model="modal1"
            title="忘记密码"
            @on-ok="ok"
            @on-cancel="cancel">
            <Input v-model="find_name" placeholder="用户名" style="width: 300px" />
            <Input v-model="new_password" placeholder="新密码" style="width: 300px" />
            <Input v-model="confirm_password" placeholder="新密码确定" style="width: 300px" />
          </Modal>
        <FormItem>
            <Button type="primary" style="width: 250px;margin-top: 5px;margin-left: 10px;" @click="loginTo('formInline')">登录</Button>
        </FormItem>
      </Form>
      <p style="margin-top: 20px;margin-bottom: 10px;text-align: center;font-size: 10px;color:darkgrey;">登录进入监控平台</p>
      <Button type="text" style="float: right;margin-top: -35px;" @click="signUp">注册</Button>
  </Card>
</template>

<script>
</script>

<style>
</style>
