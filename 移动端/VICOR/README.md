# 说明文档

布局：
- 创建项目文件夹 vicor
- 创建存放css文件夹： css
- 创建存放图片的文件夹： img
- 创建存放字体/字体图标的文件夹：font
- 创建存放js文件夹： js
- 创建首页：index.html，显示页面结构，修改标题，删除语言lang=en
- 将重置样式表存放在css文件夹当中，在页面中引入
- 在css文件夹中创建首页单独的css文件：index.css，在页面中引入
- 由于项目中存在字体图标，因此需要在iconfont图表库中创建相应的项目，复制在线连接引入在页面中


1、由于制作的是移动端因此需要设置视口 meta
    <!-- 理想视口：宽度=设备宽度，默认缩放比例1.0，最大缩放比例1.0，禁止用户手动缩放
    -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
2、设置单位：
   - 给html设置字体大小
     html{
            font-size: calc(100vw / 750 * 100);
        }
   - 由于引入重置样式表，因此可以在html标签上添加属性rem="750"，这样设置rem单位：100px = 1rem