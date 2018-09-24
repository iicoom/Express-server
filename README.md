# Express-server
### 框架级别
* 项目运行环境配置（环境差异配置）   completed

* 开发环境热更新                   completed

* ES6/ES7 babel 转码（暂不考虑）

* 语法检测工具（ESLint, JShint）

* 日志管理(等级、日期格式、切割、保留时间)    completed

* 项目框架分层
[middleware、model、service、
 routes、controller、util]

* 接口访问权限 接口访问频率限制(接口安全防护)  completed

* 异常的处理（抛出 前端的返回 错误状态的定义）  completed

* 项目常量的组织方式                        completed
[constant、error code message]

* 跨域的处理方式

* 数据库选型（mongodb、redis、mysql）

* 代码流程控制工具（Q，Promise）

* 单元测试（框架、流程）

* 项目的运维（PM2）             completed
- - -

#### 项目运行环境配置
* 本地：package.json => development production

* 服务器部署：PM2 => ecosystem.config.js

#### 开发环境热更新
* package.json => npm run dev => nodemon 修改代码热更新大大提高效率

#### 语法检测工具
* [JShint](http://jshint.com/docs/) 
npm install --save-dev jshint

In case of .jshintrc, JSHint will start looking for this file in the same directory as the file that's being linted. 
If not found, it will move one level up the directory tree all the way up to the filesystem root.

[Webstorm 下使用JShint](http://www.jetbrains.com/help/webstorm/jshint.html)
[options](http://jshint.com/docs/options/)

To enable JSHint and configure its behavior in WebStorm
1. In the Settings/Preferences dialog (⌘,), click JavaScript under Languages and Frameworks and then click JSHint under Code Quality Tools. 
On the JSHint that opens, select the Enable checkbox. After that all the controls on the page become available.

2. From the Version drop-down list, choose the version of the tool to use. WebStorm comes bundled with version 2.9.5, which is used by default. 
To download another version, choose it from the list.

3. 也可以勾选使用本地 .jshintrc

* [ESLint](http://www.jetbrains.com/help/webstorm/eslint.html)

#### 日志管理(等级、日期格式、切割、保留时间)
[log4js-node](https://log4js-node.github.io/log4js-node/)

[Date Rolling File Appender](https://log4js-node.github.io/log4js-node/dateFile.html)

API
[configuration - log4js.configure(object || string)](https://log4js-node.github.io/log4js-node/api.html)
Configuration objects must define at least one appender, and a default category. 
Log4js will throw an exception if the configuration is invalid.

* levels (optional, object) 
the default values are used (ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF - note that 
OFF is intended to be used to turn off logging, not as a level for actual logging

* appenders (object) - a map of named appenders (string) to appender definitions (object);
 appender definitions must have a property type (string) - other properties depend on the appender type.

* categories (object) - a map of named categories (string) to category definitions (object)
Category definitions have two properties:

- appenders (array of strings) - the list of appender names to be used for this category. 
A category must have at least one appender.

- level (string, case insensitive) - the minimum log level that this category will send to the appenders.
 For example, if set to ‘error’ then the appenders will only receive log events of level ‘error’, 
‘fatal’, ‘mark’ - log events of ‘info’, ‘warn’, ‘debug’, or ‘trace’ will be ignored.

#### 项目框架分层
##### 参数校验
* 非空、手机号格式
* Object
* Array
* Number
* Float

#### 接口访问权限 接口访问频率限制(接口安全防护)
* loginRequire

* requestLimit

#### 数据库选型

#### 代码流程控制工具（Q，Promise）
```$xslt
// https://github.com/kriskowal/q
/*
On the first pass, promises can mitigate the “Pyramid of Doom”: 
the situation where code marches to the right faster than it marches forward. 
*/
step1(function (value1) {
    step2(value1, function(value2) {
        step3(value2, function(value3) {
            step4(value3, function(value4) {
                // Do something with value4
            });
        });
    });
});

// With a promise library, you can flatten the pyramid.
Q.fcall(promisedStep1)
.then(promisedStep2)
.then(promisedStep3)
.then(promisedStep4)
.then(function (value4) {
    // Do something with value4
})
.catch(function (error) {
    // Handle any error from all above steps
})
.done();

//  (Here promisedStepN is a version of stepN that returns a promise.)

```

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

* 统计发送邮件系统

* 数据库数据统计（统计间隔时间的控制）

* Excel导入、导出 


