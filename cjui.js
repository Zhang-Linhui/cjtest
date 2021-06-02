// @ts-nocheck
const biliui = {
	dtui() {
		if (!$('.detail-content div').length)
			return;
		const ui = `
		<div>
		<div id="copyToCS" class="dt">一键</div>
		<div id="zlhbg" class="dt">不抽</div>
		<div id="tabmes">
			<p>动态号:${gongjv.give.dthgive()}</p>
		</div>
		<style scoped>
			#tabmes{
				width:220px;
				heigth:100px;
				position:fixed;
				top:70px;
				left:100px;
			}
			#tabmes p{
				margin-top:2px;
				background: linear-gradient(45deg,#feac5e,#c779d0,#4bc0c8);
			}
			.dt{
				width:50px;
				heigth:50px;
				background-image:linear-gradient(to top, #00c6fb 0%, #005bea 100%);
				color:white;
				font-size:large;
				-webkit-transform:skew(20deg);
				-moz-transform:skew(20deg);
				-o-transform:skew(20deg);
				border-radius:25px;
				line-height:50px;
				cursor:pointer;
                ${biliui.uibu}
			}
			#copyToCS{
				position:fixed;
				top:70px;
				left:350px;
			}
            #zlhbg{
				position:fixed;
				top:150px;
				left:350px;
			}
		</style>
		</div>
	`
		$('body').append(ui);
		setTimeout(async () => {
			let s = await bilikx.upfans($('a.c-pointer').last().attr('href').match(/\d+/)[0]);
			gongjv.action.tp(`uid:${$('a.c-pointer').last().attr('href').match(/\d+/)[0]} fans:${s.follower} ${s.following ? "已关" : "未关"}`);
			gongjv.action.tp(`转发:${$('span.text-offset').eq(0).text()} 评论:${$('span.text-offset').eq(1).text()} 点赞:${$('span.text-offset').eq(2).text()}`);
			gongjv.action.tp(`时间:${$(".time.fs-12.ls-0.tc-slate span:first").text()}`);
			gongjv.action.tp(`初步文本判断:${gongjv.judge.textju($('.content-full:first').text())}`);
		}, 1000);
		gongjv.judge.incju(gongjv.give.dthgive(), 'z1') || gongjv.judge.incju(gongjv.give.dthgive(), 'zlh') ? (() => { gongjv.action.tp('已抽或已找'); $('#copyToCS').hide(); })() : gongjv.action.tp('未找也未抽');
	},
	kjui() {
		bbvv();
		var wer = `
		<div id="blp">
		<div id="anniu">检查</div>
		<div id="hhh"></div>
		<div><input type="text" id="amount" style="border:0; color:#f6931f; font-weight:bold;"></div>
		</div>
		<style>
		#hhh{
		margin-top: 10px;
		width: 200px;
		}
		#amount{
		 margin-left: 80px;
		 width:55px;
		}
		#anniu{
		  width: 100px; /*宽*/
		  height: 30px; /*高*/
		 margin-left: 50px;
		  font-size: 14px; /*字体大小*/
		  line-height: 30px; /*行高*/
		  color: #fff;
		  text-transform: uppercase; /*字体大写*/
		  text-decoration: none; /*字体增加装饰：去除下划线*/
		  font-family: sans-serif; /*非衬线体*/
		  box-sizing: border-box; /*盒模型大小规则*/
		  background: linear-gradient(
			90deg,#03a9f4, #f441a5, #ffeb3b,
		  #03a9f4, #f441a5, #ffeb3b, #03a9f4); /*渐变背景*/
		  border-radius: 60px; /*边框圆角*/
		  background-size: 400%; /*背景大小*/
		  ${biliui.uibu}
		}
		#anniu:hover{
		  animation: animate 8s linear infinite alternate; /*动画: 名称 时间 线性 循环 播放完回退播放*/
		}
		@keyframes animate{
		  0%{
			background-position: 0%; /*修改背景定位，实现渐变色炫光*/
		  }
		  50%{
			background-position: 100%;
		  }
		  100%{
			background-position: 0%;
		  }
		}
		#anniu::before{ /*之前添加*/
		  content: ''; /*内容*/

		  z-index: -1;
		  background: linear-gradient(
			90deg,#03a9f4, #f441a5, #ffeb3b, #03a9f4,
		  #f441a5, #ffeb3b, #03a9f4);
		  border-radius: 40px;
		  background-size: 400%;
		  filter: blur(20px); /*过渡：模糊*/
		  opacity: 0; /*透明度*/
		  transition: 1s; /*过渡时间*/
		}
		#anniu:hover::before{
		  filter: blur(20px);
		  opacity: 1;
		  animation: animate 8s linear infinite; /*注意动画名称统一*/
		}
			</style>
	`
		$("body").append(wer);
		$('#blp').css('position', 'fixed');
		$('#blp').css('top', '410px');
		$('#blp').css('left', '1100px');
		$('#hhh').slider({
			range: true, min: 0, max: 8, values: [0, 1.5], step: 0.1,
			slide: function (event, ui) {
				$("#amount").val(ui.values[0] + " - " + ui.values[1]);
			}
		});
		$("#amount").val($("#hhh").slider("values", 0) + " - " + $("#hhh").slider("values", 1));
		$("#progressbar").progressbar({ 'value': 0 });
		$("#progressbar").hide();
	},
	syui() {
		bbvv();
		var wer = `
	<div id="ccj">
				<div id="sj">双击</div>
				<div id="uu" style="display: none">
					<ul id="ul1">
						<li>开始</li>
						<li>寻找</li>
						<li>水动态</li>
						<select name="minbeds" id="suk">
							<option selected>请选择</option>
						</select>
					</ul>
				<div id="im">
					<ul id='bh'>
						<li>查看</li>
						<li>删除</li>
						<li>下载</li>
						<input type ="submit" id="datep" style="display:none">
						<li>上传</li>
                        <li>清屏</li>
						<li>更新</li>
					</ul>
					<div id="xs">
				</div>
					</div>
				</div>
				<style scoped>
					#bh li{
						width: 80px;
						height: 40px;
						background-color: aqua;
						line-height: 40px;
						border: 2px groove;
						${biliui.uibu}
					}
					#sj:hover,#ul1 li:hover,#bh li:hover {
	background:-webkit-gradient( linear, left top, left bottom, color-stop(5%, #378de5), color-stop(100%, #79bbff) );
	background:-moz-linear-gradient( center top, #378de5 5%, #79bbff 100% );
	background:-ms-linear-gradient( top, #378de5 5%, #79bbff 100% );
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#378de5', endColorstr='#79bbff');
	background-color:#378de5;
}#sj:active,#ul1 li:active,#bh li:active {
	position:relative;
	top:1px;
}
#datep{
	position:absolute;
	top:140px;	
}
					#suk{
						width:  80px;
						height: 39px;
						background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);
						display: block;				
						border:red;
					}
					#ul1,#bh{
						list-style-type: none;
						margin-top: 0;
						margin-bottom: 3px;
						padding: 0;
					}
					#ul1 li,#sj{
						width: 80px;
						height: 40px;
						background-color: aqua;
						line-height: 40px;
						border: 2px groove;
						float: left;				
						${biliui.uibu}
					}
					#xs{
						width: 320px;
						height: 240px;
						border: 2px groove;;
						background: #C5F0D3;
						white-space:normal;
						word-break:break-all;
						word-wrap:break-word;
						overflow-y:scroll;
						overflow-x:hidden;
						opacity: 90%
					}
					#xs p{
						margin: 0;
						border: 2px dotted #C92427;
						
					}
                    .qaz{cursor:pointer;}
					.qaz:hover{
						background: #00CCFF;
					}
					#ccj{
						z-index: 1000000;
						  position: fixed;
						  top:80px;
						  left:80px;
					}
					#im{
						display: flex;
					}
					
				</style>
			</div>
	`
		$("body").append(wer);
		gongjv.action.qjia();
		$("#datep").datepicker({
			onSelect:async d=>{
				let s = await bilikx.sujvxiazai(d);
				if (s != '0') {
					await bilikx.shujihuoqv('467846541');
					gongjv.action.jjdd(d);
					GM_setValue(gongjv.give.dategive(), s.split(';').filter(it=>!GM_getValue('z1',[]).includes(it)));
					gongjv.action.adp('接受成功');
				} else gongjv.action.adp('未上传');
			},
			dateFormat: 'yymmdd',
			showButtonPanel: true,
			changeMonth: true,
			changeYear: true
		});
		$('#sj').dblclick(() => $('#uu').toggle("slide", 500));
		$('#ccj').draggable();
		$('#xs').on('dblclick', '.qaz', function () { window.open('https://t.bilibili.com/' + $(this).text()); });
	},
	uibu: "cursor:pointer;\n-webkit-user-select: none;\n-moz-user-select: none;\n-ms-user-select: none;\nuser-select': none;\nz-index:100000;\ntext-align:center;"
}
jQuery(function($){
	$.datepicker.regional['zh-CN'] = {
		closeText: '关闭',
		prevText: '&#x3c;上月',
		nextText: '下月&#x3e;',
		currentText: '今天',
		monthNames: ['一月','二月','三月','四月','五月','六月',
		  '七月','八月','九月','十月','十一月','十二月'],
		monthNamesShort: ['一月','二月','三月','四月','五月','六月',
		'七月','八月','九月','十月','十一月','十二月'],
		dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
		dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
		dayNamesMin: ['日','一','二','三','四','五','六'],
		weekHeader: '周',
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '年'};
	$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
  });