#多张图片上传
    多张图片上传是基于Webuploader的图片上传插件，可以兼容到ie6版本，只需在页面引入对应的js文件和css文件即可。
####官方地址
Webuploader：http://fex.baidu.com/webuploader/

##兼容性

* ie6+

##样例：

###1、使用步骤
* 引入样式文件（imgUpload.css）

```javascript
<link href="style/imgUpload.css" rel="stylesheet" type="text/css" />
```
* 引入Jquery库：jquery-1.9.1.min.js
* 引入webuploader插件：webuploader.js
* 入口代码：imgUpload.js

```javascript
<script type="text/javascript" src="javascript/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="javascript/webuploader.js"></script>
<script type="text/javascript" src="javascript/imgUpload.js"></script>
```

* 在页面上添加代码

```javascript
<div class="uploaders">
    <div id="fileList" class="uploader-list">
        <div class="no-bullet" id="sortable-list"></div>
    </div>
    <div class="uploader">
        <div class="bg-placeholder">
            <a class="add-pic" id="filePicker" title="添加图片"></a>
        </div>
    </div>
</div> 
```
###2、demo
* [多张图片上传demo](http://192.168.14.97:8080/plugin/imgUpload-ie6)

##API
###1、API
* [webuploader的API详细参数地址](http://fex.baidu.com/webuploader/doc/index.html)








