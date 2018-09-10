# Express-server
### 框架级别
* 项目运行环境配置（环境差异配置）

* 开发环境热更新

* ES6/ES7 babel 转码（暂不考虑）

* 语法检测工具（Eslint）

* 日志管理(等级、日期格式、切割、保留时间)

* 项目框架分层（middleware、model、service、routes、controller、util）

* 接口访问权限

* 异常的处理（抛出 端的返回 错误状态的定义）

* 项目常量的组织方式（constant、error code message）

* 跨域的处理方式

* 数据库选型（mongodb、redis、mysql）

* 代码流程控制工具（Q，Promise）

* 项目的运维（PM2）
- - -

#### 目运行环境配置
#### 开发环境热更新
#### 项目框架分层
#### 数据库选型
#### 项目的运维
[PM2](https://pm2.io/doc/en/runtime/guide/process-management/)

PM2 is a process kept in the background, a daemon, that takes care of all your running processes.

We’ll learn how to manage process with PM2 and discover a key concept : the process list.

The process list
The process list is where all running applications are registered.

Manage your process list in a few commands:
```$xslt
# start and add a process to your list
pm2 start app.js

# show your list
pm2 ls

# stop and delete a process from the list
pm2 delete app
```
Default name in the process list is the name of the script without his extension. Use --nameor -n to change.

Routine
Once setup your process list, every actions are done with the process name.
```$xslt
# kill the process but keep it in the process list
pm2 stop app

# start the process again
pm2 start app

# both stop and start
pm2 restart app

# Multiple app can be specified at once:
pm2 restart app1 app2 app3
```
### 业务功能级别
* 注册

* 登录

* 队列、计划任务、发布订阅


