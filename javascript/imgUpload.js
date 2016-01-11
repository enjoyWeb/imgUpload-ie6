/*图片上传*/
(function($) {
    // 当domReady的时候开始初始化
    $(function () {
		var uploader,
			$list = $('#fileList'),
			$warning = $('.v_info_fail'),
			$warningShowClass = 'show',
			$warningText = $warning.find('.v_show_info'),
			arr_images = [],
			// 判断浏览器是否支持图片的base64
            isSupportBase64 = (function () {
                var data = new Image();
                var support = true;
                data.onload = data.onerror = function () {
                    if (this.width != 1 || this.height != 1) {
                        support = false;
                    }
                }
                data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                return support;
            })(),
            // 检测是否已经安装flash，检测flash的版本
            flashVersion = (function () {
                var version;

                try {
                    version = navigator.plugins[ 'Shockwave Flash' ];
                    version = version.description;
                } catch (ex) {
                    try {
                        version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                                .GetVariable('$version');
                    } catch (ex2) {
                        version = '0.0';
                    }
                }
                version = version.match(/\d+/g);
                return parseFloat(version[ 0 ] + '.' + version[ 1 ], 10);
            })(),
            supportTransition = (function () {
                var s = document.createElement('p').style,
                        r = 'transition' in s ||
                        'WebkitTransition' in s ||
                        'MozTransition' in s ||
                        'msTransition' in s ||
                        'OTransition' in s;
                s = null;
                return r;
            })();
		if (!WebUploader.Uploader.support('flash') && WebUploader.browser.ie) {

            // flash 安装了但是版本过低。
            if (flashVersion) {
                (function (container) {
                    window['expressinstallcallback'] = function (state) {
                        switch (state) {
                            case 'Download.Cancelled':
                                alert('您取消了更新！')
                                break;

                            case 'Download.Failed':
                                alert('安装失败')
                                break;

                            default:
                                alert('安装已成功，请刷新！');
                                break;
                        }
                        delete window['expressinstallcallback'];
                    };

                    var swf = './expressInstall.swf';
                    // insert flash object
                    var html = '<object type="application/' +
                            'x-shockwave-flash" data="' + swf + '" ';

                    if (WebUploader.browser.ie) {
                        html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
                    }

                    html += 'width="100%" height="100%" style="outline:0">' +
                            '<param name="movie" value="' + swf + '" />' +
                            '<param name="wmode" value="transparent" />' +
                            '<param name="allowscriptaccess" value="always" />' +
                            '</object>';

                    container.html(html);

                })($wrap);

                // 压根就没有安装。
            } else {
                $wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
            }

            return;
        } else if (!WebUploader.Uploader.support()) {
            alert('Web Uploader 不支持您的浏览器！');
            return;
        };

		uploader = WebUploader.create({

			// 选完文件后，是否自动上传。
			auto: true,

			// 文件接收服务端。
			server: 'http://192.168.4.211:8080/fileCenter/fileUpload.sp?act=uploadSave&appId=00000001&caseId=00000018',

			// 选择文件的按钮。可选。
			// 内部根据当前运行是创建，可能是input元素，也可能是flash.
			pick: '#filePicker',

			// 只允许选择图片文件。
			accept: {
				title: 'Images',
				extensions: 'gif,jpg,jpeg,bmp,png',
				mimeTypes: 'image/*'
			},

			//允许重复上传同一张图片
			//duplicate: true

            formData: {
                uid: 123
            },
            paste: '.uploader',
            swf: 'javascript/Uploader.swf',
            chunked: false,
            chunkSize: 512 * 1024,

            // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
            disableGlobalDnd: true,
            fileNumLimit: 5,
            fileSizeLimit: 200 * 1024 * 1024, // 200 M
            fileSingleSizeLimit: 50 * 1024 * 1024    // 50 M

		});

		uploader.on('uploadSuccess', function(file, response) {

			var $li = '<div class="uploader uploaded"><span class="bg-preview"><img src=' + response.url + '></span><span class="icon-del"></span></div>';
			arr_images.push(response.url);

			$list.find('.no-bullet').append($li);

			$('.icon-del').on('click',function(){
				$(this).parent('.uploader').remove();
			})

		});
		uploader.on('error', function(reason) {
			switch (reason) {
				case 'Q_TYPE_DENIED':
					$warningText.text('类型错误');
					$warning.addClass($warningShowClass);
					setTimeout(function() {
						$warning.removeClass($warningShowClass);
					}, 3000);
					break;
				case 'F_DUPLICATE':
					$warningText.text('你已经选择过该图片了');
					$warning.addClass($warningShowClass);
					setTimeout(function() {
						$warning.removeClass($warningShowClass);
					}, 3000);
					break;
				case 'Q_EXCEED_NUM_LIMIT':
					$warningText.text('最多上传5张图片');
					$warning.addClass($warningShowClass);
					setTimeout(function() {
						$warning.removeClass($warningShowClass);
					}, 3000);
					break;
			}
		});

    });
})(jQuery);