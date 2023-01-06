# centOS 安装 jenkins nginx 流程及遇到的问题 


### 参考文档 
1. [都2022年了，还不用Jenkins自动化部署？](https://juejin.cn/post/7048582881576222734)
2. [CentetOS7.9 安装Jenkins](https://www.cnblogs.com/Mxy-cnblog/p/16501464.html)
3. [【Jenkins】基于Windows系统安装Jenkins](https://blog.csdn.net/qq_45392321/article/details/123091040)
4. [Jenkins---jenkins新增用户且配置权限](https://www.cnblogs.com/qican/p/15533972.html)
5. [Jenkins查询及自定义工作空间（自由风格项目、maven项目）](http://t.zoukankan.com/chooperman-p-14154927.html)
6. [Jenkins 修改主目录 JENKINS_HOME](https://www.pudn.com/news/6228da869ddf223e1ad26278.html)

### jenkins的安装和配置

#### 安装dnf
首先测试是否已经安装dnf
```
dnf
```
![image](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51229fa8946944f48d5043e2fdca039d~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

若没有安装 则执行
```shell
yum install dnf
```
>注： yum 为centOS7 所使用

#### 安装Java环境
`Jenkins`本身是依赖`Java`的，所以我们需要先安装`Java`环境

```shell
#可以先搜索
dnf search java-1.8  
dnf install java-1.8.0-openjdk.x86_64
```
>遇到的问题
我安装的`Jenkins 2.362`版本 启动失败报错 查资料说`java`版本不对 对应`java`版本为`java-11`

安装JDK11
```shell
yum install java-11-openjdk* -y

# 其他命令

# 查询java版本
java -version

# 切换java版本
alternatives --config java
```
#### 安装Jenkins
Jenkins本身是没有在dnf的软件仓库包中的，所以我们需要连接Jenkins仓库
```
wget –O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat-stable/jenkins.repo
```
下载之后我们通过`ls`命令进行查看，若显示`jenkins.repo`安装成功

但是有可能下载之后并没有安装在我们指定的文件夹：`/etc/yum.repos.d/jenkins.repo`

我们通过`pwd`命令查看，我自己的情况是没有安装在指定文件夹，而是安装在`/root`中

所以我需要移动该文件
```shell
mv jenkins.repo /etc/yum.repos.d/

#我们可以进入对应的文件夹查看
cd /etc/yum.repos.d/
#然后执行命令查看是否有 jenkins.repo
ls
```
![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07da8033c8c040df92765e40b48645d6~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

接下来的操作：导入GPG密钥以确保您的软件合法

```shell
rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key
```
编辑一下文件 /etc/yum.repos.d/jenkins.repo
```shell
[jenkins]

name=Jenkins-stable

baseurl=http://pkg.jenkins.io/redhat (把这里多出来的单词-stable删掉)

gpgcheck=1
```
最后进行Jenkins的安装
```shell
dnf install jenkins
```
启动Jenkins的服务
```shell
systemctl start jenkins #启动
systemctl status jenkins  #查看状态
systemctl enable jenkins  #设置操作系统重启，jenkins也会自动重启
```
`Jenkins`默认使用`8080`端口提供服务，所以在服务器安全组中开启`8080`端口
根据提示在命令行中查看密码，进行登录
```
cat /var/lib/jenkins/secrets/initialAdminPassword
```

登录成功之后，根据提示安装推荐的插件

>遇到的问题
遇到“无法连接到Jenkins”的问题
解决方案： 修改jenkins的配置文件`/var/lib/jenkins/config.xml` 
  1.   `<useSecurity>true</useSecurity> `修改为 `<useSecurity>false</useSecurity>`
  2.   删除两个配置标签 `<authorizationStrategy >...</authorizationStrategy >` 和 `<securityRealm>...</securityRealm>`
  3.   然后重启jenkins

安装成功之后，根据提示创建管理员用户
#### jenkins配置
##### Jenkins用户
后面会访问centos中的某些文件夹，默认Jenkins使用的用户是 jenkins，可能会没有访问权限，所以我们需要修改一下它的用户：
文件路径`/etc/sysconfig/jenkins`
```
# Unix user account that runs the Jenkins daemon
# Be careful when you change this, as you need to update
# permissions of $JENKINS_HOME and /var/log/jenkins,
# and if you have already run Jenkins, potentially other
# directories such as /var/cache/jenkins .
#
JENKINS_USER="jenkins" # 修改为root
```
>遇到的问题
修改此处用户后 还是遇到了`cp: cannot create regular file ‘/home/web/desktop-vue/index.html’: Permission denied`没有权限的问题 后还是给`jenkins`添加了路径权限 如下
```
chown -R jenkins <path>
```
修改配置文件后 需重启jenkins
```shell
systemctl restart jenkins
```
#### Jenkins项目配置
按照正常流程书写
源码管理我们选择的是`Git`
我们的服务器上边是没有`git`的，所以我们需要安装

```shell
dnf install git
```
#### jenkins增加node依赖
1. 点击Jenkins图标，回到主页面，点击系统管理，再点击插件管理

2. 等待安装之后，重启Jenkins

3. 点击系统管理，点击全局工具配置，拉到最下边，新增NodeJS，选择之后点击保存

#### 增加shell脚本
``` shell
pwd
node -v
npm -v

npm install 
npm run build

pwd

echo '构建成功'

ls

# 删除/root/mall_cms文件夹里所有的内容
rm -rf /root/mall_project/* 

#复制文件到某目录
cp -rf ./dist/* /root/mall_project/
```
### nginx安装和配置

#### 安装nginx
```shell
dnf install nginx
```
#### 启动nginx
```shell
systemctl start nginx #启动服务
systemctl status nginx #查看启动状态
systemctl enable nginx #设置开机自启
```
这个时候启动成功了，在浏览器访问你的ip地址就可以看到对应的`nginx`界面（默认端口是80）

#### 配置nginx
编辑文件`/etc/nginx/nginx.conf`

```config
user nginx; #修改为root
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;
```
配置访问目录
```
    server {
        listen       80;
        listen       [::]:80;
        server_name  _;
        # root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;
        location / {
             root /home/web/front_dev_guide; # 此处配置项目位置
            index index.html index index.htm;
        }
        
        error_page 404 /404.html;
        location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
    }
```
配置完后重新启动`nginx`
```shell
systemctl restart nginx
```
### 常用命令

```
systemctl start jenkins/nginx

systemctl stop jenkins/nginx

systemctl restart jenkins/nginx

systemctl status jenkins/nginx
```

### 示例页面和服务器地址
![img](https://note.youdao.com/yws/public/resource/41517ecf876a788e28344ce12025c66c/xmlnote/WEBRESOURCE55f26aab1e7a1b04ca0761a2b268956a/4493)

http://39.107.231.241:8080/