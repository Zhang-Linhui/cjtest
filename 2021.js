console.log("2021.5.4")
const gongjv = {
	give: {
		dategive: () => new Date().getFullYear() + ((new Date().getMonth() + 1) < 10 ? "0" : "") + (new Date().getMonth() + 1) + (new Date().getDate() < 10 ? "0" : "") + new Date().getDate(),
		uidgive: () => (document.cookie + ";").match(/(?<=DedeUserID=).+?(?=;)/)[0],
		jctgive: () => (document.cookie + ";").match(/(?<=bili_jct=).+?(?=;)/)[0],
		dthgive: () => window.location.pathname.match(/\d+/)[0],
		rndgive: (max, min = 0) => Math.floor(Math.random() * (max - min)) + min,
		tuidgive: () => window.location.pathname.split("/")[1],
		keygive: 1,
	},
	judge: {
		incju: (st, na) => GM_getValue(na, []).includes(st),
		dateju: (date, la = 7) => (((new Date()).getTime() / 1000) - date) > 3600 * 24 * la,
		nameju: name => ["glh", "cjh", 'z1', 'z2', 'z3'].includes(name),
		descju: desc => !(gongjv.judge.dateju(desc.timestamp) || desc.repost < 90 || desc.repost > 50000 || gongjv.judge.incju(desc.dynamic_id_str, 'z1') || gongjv.judge.incju(desc.uid, 'z2') || desc.status == 0),
		textju: (tex = "") => !(/(@|艾特)\s*([一二三两四]|\d)位|恭喜\s*(这几个b|一下|以上|@|这?(几|\d|[一二三两四五六七八九十]{0,2})?(位|个)|小伙伴)|缅怀|正确答案|大嘴巴子|抽个寂寞|转发原动态|带tag|脚本|抽奖号|下方的投稿视频|不要(评论|转发)/.test(tex)),
	},
	action: {
		in: (dth, name) => GM_setValue(name, Array.from(new Set((() => { let tty = GM_getValue(name, []); tty.push(dth); return tty })()))),
		timewait: (min = 1, max = min) => new Promise(res => setTimeout(() => res(0), gongjv.give.rndgive(max, min) * 100)),
		tp: st => $('#tabmes').append('<p>' + st + '</p>'),
		jjdd: name => $(`#suk option:contains(${name})`).length || !$("#suk").length ? console.log('已经添加') : $('#suk').append('<option>' + name + '</option>'),
		qjia: () => { for (i of GM_listValues()) !gongjv.judge.nameju(i) ? gongjv.action.jjdd(i) : 3 },
		adp: (st, g = 0) => g ? $('#xs').append('<p class="qaz">' + st + '</p>') : $('#xs').append('<p>' + st + '</p>').scrollTop($('#xs').get(0).scrollHeight),
		sukdeco: f => $("#suk")[0].selectedIndex ? f($("#suk option:selected").text()) : alert('请选择'),
		keytime: () => gongjv.give.keygive == 1 ? (() => { gongjv.give.keygive = 0; setTimeout(() => gongjv.give.keygive = 1, 3000); return true })() : false,
	}
}
const assist = {
	ajax: aj => new Promise(res => { $.ajax({ ...aj, xhrFields: { withCredentials: true }, success(data) { if (!data.message || data.message == '0'||data.message == 'success') { res(data.data); } else{console.log(data.message);res(0)} } }) }),
	kjdtju: async item => {
		if (gongjv.judge.descju(item.desc.orig_dy_id_str == item.desc.pre_dy_id_str ? item.desc.origin : item.desc.previous)) {
			try {
				if (item.desc.orig_dy_id_str != item.desc.pre_dy_id_str) return 2;
				let ori = $.parseJSON(item.card), orii = $.parseJSON(ori.origin);
				if (ori.origin_extension && ori.origin_extension.lott) return (await bilikx.lott(item.desc.pre_dy_id_str)).status ? 0 : 1;
				if (ori.item.orig_type == 2048) return 2;
				if (!(orii.item || orii.stat) || item.desc.origin.repost * 2 < (orii.item ? orii.item : orii.stat).reply) return 0;
				return gongjv.judge.textju(orii.desc != undefined ? (orii.desc + "zlh") : orii.item.description) ? 2 : 0;
			}
			catch (err) {
				console.log(item);
				console.log(err);
			}
		}
		return 0;
	},
	dtzl: (jd, tty) => {
		let bvcx = 0;
		jd.text('have ' + tty.length);
		jd.click(async function () {
			let a = (bvcx + 10) > tty.length ? tty.length : bvcx + 10;
			for (bvcx; bvcx < a; bvcx++)	window.open('https://t.bilibili.com/' + tty[bvcx]);
			if (bvcx == tty.length) jd.off('click');
			jd.text('have ' + (tty.length - bvcx));
		});
		$(document).keydown(e => e.keyCode == 70 ? jd.click() : console.log(e.keyCode));
	},
	comment: ["[热词系列_可以]", "加油", "[doge]", "来咯来咯[打call]", '感动[妙啊][妙啊][妙啊]', '阅[doge]', '哦', '[热词系列_吹爆]', '[热词系列_这次一定]', '[热词系列_奥力给]', '万一', '留下足迹', '保佑我', '嗯哼', '不错', '可以', '支持', '与你同在', '[热词系列_标准结局]'],
	gondtext: ["抽", "奖", "评", "转", "送"],
}
const bilikx = {
	tinfo(offset = 0, tuid) {
		return assist.ajax({
			url: `https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history?visitor_uid=${gongjv.give.uidgive()}&host_uid=${tuid}&offset_dynamic_id=${offset}&need_top=1`,
			type: 'get',
		})
	},
	lott(dth) {
		return assist.ajax({
			url: `https://api.vc.bilibili.com/lottery_svr/v1/lottery_svr/lottery_notice?dynamic_id=` + dth,
			type: 'get',
		});
	},
	dtmesget(dth) {
		return assist.ajax({
			url: 'https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/get_dynamic_detail?dynamic_id=' + dth,
			type: "get",
		})
	},
	dtmodify(obj) {
		if (!obj.is_follow)
			return assist.ajax({
				url: 'https://api.bilibili.com/x/relation/modify',
				type: "post",
				data: { 'fid': obj.uid, 'act': 1, 're_src': 11, 'jsonp': 'jsonp','csrf': gongjv.give.jctgive() },
			})
	},
	dtrm(obj) {
		if (!obj.is_follow)
			return assist.ajax({
				url: 'https://api.vc.bilibili.com/feed/v1/feed/SetUserFollow',
				type: "post",
				data: {  
					"type": 1,
					"follow": obj.uid,
					"csrf": gongjv.give.jctgive()
				},
			})
	},
	dtlike(obj) {
		if (!obj.is_liked)
			return assist.ajax({
				url: 'https://api.vc.bilibili.com/dynamic_like/v1/dynamic_like/thumb',
				type: "post",
				data: { 'uid': gongjv.give.uidgive(), 'dynamic_id': obj.dth, 'up': '1',  'csrf': gongjv.give.jctgive() },
			})
	},
	dtadd(obj) {
		if (obj.rnum <= obj.cnum * 2 && obj.havelott == 0)
			return assist.ajax({
				url: 'https://api.bilibili.com/x/v2/reply/add',
				type: 'post',
				data: { 'oid': obj.oid, 'type': obj.type, 'message': obj.comment, 'plat': '1', 'jsonp': 'jsonp', 'csrf': gongjv.give.jctgive() },
			})
	},
	dtrepost(obj) {
		return assist.ajax({
			url: 'https://api.vc.bilibili.com/dynamic_repost/v1/dynamic_repost/repost',
			type: 'post',
			data: { 'uid': gongjv.give.uidgive(), 'dynamic_id': obj.dth, 'content': obj.content, 'extension': '{"emoji_type":1}', 'at_uids': '', 'ctrl': obj.ctrl, 'csrf_token': gongjv.give.jctgive(),'csrf':gongjv.give.jctgive()},
		})
	},
	upfans(uid) {
		return assist.ajax({
			url: `https://api.bilibili.com/x/web-interface/card?mid=${uid}&photo=true`,
			type: 'get',
		})
	},
	sdtget(){
		return assist.ajax({
			url: "https://api.bilibili.com/x/web-interface/popular?ps=20&pn=1",
			type: 'get',
		})
	},
	
	sdtre(obj){
		return assist.ajax({
			url: "https://api.vc.bilibili.com/dynamic_repost/v1/dynamic_repost/share",
			type: 'post',
			data: {"csrf_token": gongjv.give.jctgive(),"platform":"pc","uid": obj.uid,"type": 8,"share_uid": gongjv.give.uidgive(),"content": "转发动态","repost_code": 20000,"rid": obj.aid},
		})
	},
	cjxx(dtid, uid, q) {
		return new Promise((res) => {
			GM_xmlhttpRequest({
				method: "POST",
				url: "http://119.29.66.246/bilicl",
				data: "p=" + dtid + "&q=" + uid + "&s=" + q + "&d=" + gongjv.give.dategive(),
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				onload: function (response) {
					res(response.response);
				}
			});
		});
	},
	sujvxiazai(date) {
		return new Promise(res => {
			GM_xmlhttpRequest({
				method: "POST",
				url: "http://119.29.66.246/bilixz",
				data: "q=" + gongjv.give.uidgive() + "&p=" + date,
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				onload: function (response) {
					res(response.response);
				}
			});
		})
	},
	cjhrequ() {
		return new Promise(res => {
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://119.29.66.246//bilicjh",
				onload: function (response) {
					res(response.response.split(';'));
				}
			});
		})
	},
	async shujihuoqv(pii = gongjv.give.tuidgive()) {
		let s = await new Promise(res => {
			GM_xmlhttpRequest({
				method: "POST",
				url: "http://119.29.66.246/bilisj",
				data: "p=" + gongjv.give.uidgive() + "&q=" + pii,
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				onload: response => res(response.response),
			});
		});
		if (s == "000") {
			alert("这里是战友的位置欧(@_@)");
			window.close();
		}
		let l = s.split('@');
		GM_setValue('z1', Array.from(new Set(l[0].split(';'))));
		GM_setValue('z2', (l[1] + gongjv.give.uidgive()).split(';'));
		console.log(GM_getValue('z1', 0));
		console.log(GM_getValue('z2', 0));
	},
}
const bilicr = async (card, mode,zdth) => {
	let obj;
	if (mode == 1&&card) {
			let detail = $.parseJSON(card.card);
			let {timestamp, status, rid_str, comment: cnum, repost: rnum, uid, uid_type, is_liked, type: ty } = card.desc;
			let { is_follow } = card.display.relation;
			let dth=zdth;
			obj = { dth, timestamp, status, cnum, rnum, uid, uid_type, is_liked, is_follow }
			obj.havelott = card.extension && card.extension.lott ? ((await bilikx.lott(obj.dth)).status == 0 ? 1 : 2) : 0;
			obj.havelott = card.desc.orig_dy_id != card.desc.pre_dy_id ? 2 : obj.havelott;
			obj.type = ty == 1 || ty == 4 || ty == 2048 ? '17' : (ty == 8 ? '1' : '11');
			obj.oid = ty == 1 || ty == 4 || ty == 2048 ? obj.dth : rid_str;
			obj.comment = assist.comment[gongjv.give.rndgive(assist.comment.length)];
			obj.content = card.desc.pre_dy_id ? '//@' + detail.user.uname + ':' + detail.item.content : "转发动态";
			obj.ctrl = JSON.stringify(card.desc.pre_dy_id ? (() => { let yu = (detail.item.ctrl ? $.parseJSON(detail.item.ctrl).map(conv => { conv.location += detail.user.uname.length + 4; return conv }) : []); yu.push({ "data": detail.item.uid, "location": 2, "length": detail.user.uname.length + 1, "type": uid_type }); return yu; })() : []);
			obj.cnum = obj.cnum != undefined ? obj.cnum : detail.stat ? detail.stat.reply : detail.item ? detail.item.reply : 0;
	}
	return obj;
};
const jkhs = [
	[
		() => gongjv.action.sukdeco(name => { gongjv.action.adp("一共有" + GM_getValue(name, []).length + "个"); GM_getValue(name, []).forEach(data => gongjv.action.adp(data, 1)); }),
		() => gongjv.action.sukdeco(name => { GM_deleteValue(name); $("#suk option:selected").remove(); $("#suk")[0].selectedIndex = 0; gongjv.action.adp(name + '已经删除') }),
		() => $('#datep').show().datepicker('show').hide(),
		() => gongjv.action.sukdeco(async name => { await bilikx.cjxx(GM_getValue(name, []).join(';'), gongjv.give.uidgive(), 3) != '0' ? gongjv.action.adp('上传成功') : gongjv.action.adp('上传失败') }),
		() => $('#xs').empty(),
		async () => { $(this).off('click'); gongjv.action.adp('开始更新'); await bilikx.shujihuoqv('467846541'); gongjv.action.adp("更新成功 欢迎您" + gongjv.give.uidgive()); },
	],
	[
		() => gongjv.action.sukdeco(
			async name => {
				$('#ul1 li').eq(0).off('click').text('结束').click(() => location.reload());
				await bilikx.shujihuoqv('467846541');
				let arr = GM_getValue(name, []);
				for (let i = 1; i < arr.length; i++) {
					const random = Math.floor(Math.random() * (i + 1));
					[arr[i], arr[random]] = [arr[random], arr[i]];
				}
				var tiss = 0;
				(async function timecj() {
					if (tiss >= arr.length) {
						console.log('完毕');
						gongjv.action.adp('完毕');
						$('#ul1 li').eq(0).text('开始');
						tiss = 0;
						return 0;
					}
					console.log(tiss + ':' + arr[tiss]);
					gongjv.action.adp(arr[tiss], 1);
					(await bilicj.dtcj(arr[tiss++])) && tiss != arr.length ? setTimeout(() => timecj(), gongjv.give.rndgive(20, 10) * 1000) : setTimeout(() => timecj(), 1000);
				})();
			}),
		async function () {
			await bilikx.shujihuoqv('467846541');
			GM_deleteValue('zlh');
			gongjv.action.jjdd('zlh');
			let tty = await bilicj.kjss($('#ul1 li').eq(1), 0, 3.5, await bilikx.cjhrequ());
			assist.dtzl($('#ul1 li').eq(1), tty);
		},
		async function(){
			gongjv.action.adp("敬请期待");
		}
	]
];
const bilicj = {
	dtcj: async (dth = gongjv.give.dthgive()) => {
		let obj = await bilicr((await bilikx.dtmesget(dth)).card, 1,dth);
		console.log(obj);
		if(!obj) return 0;
		if (await bilikx.cjxx(obj.dth, gongjv.give.uidgive(), 2) != '0' && obj.havelott != 2 && !gongjv.judge.incju(obj.dth, 'z1') && !obj.is_liked && !gongjv.judge.dateju(obj.timestamp, 8) && obj.status) {
			console.log('未抽');
			let falg= await bilikx.dtmodify(obj);
			if(falg===0){
				console.log("尝试转线");
				falg=await bilikx.dtrm(obj);
				if(falg===0){
					console.log("关注失败");
					return 0;
				}
				console.log("成功");
			}
			console.log('关注');
			await gongjv.action.timewait(5, 6);
			await bilikx.dtlike(obj);
			console.log('点赞');
			await gongjv.action.timewait(1, 2);
			await bilikx.dtadd(obj);
			console.log('评论');
			await gongjv.action.timewait(1, 2);
			await bilikx.dtrepost(obj);
			console.log('转发');
			return 1;
		}
		console.log('不抽或已抽');
		return 0;
	},
	kjss: async (jd, min, max, uidh = [gongjv.give.tuidgive()]) => {
		var tty = [], li = {}, s = 0;
		jd.off('click');
		for (let fv of uidh) {
			console.log(fv);
			let ss = 0;
			jd.text((uidh.length - s++) + '');
			let offset = 0;
			do {
				var data = await bilikx.tinfo(offset, fv);
				if(data.cards ==undefined) break;
				for (let item of data.cards) {
					offset = item.desc.dynamic_id_str;
					ss++;
					console.log(ss+":"+item.desc.dynamic_id_str);
					let bq = ((new Date().getTime()) / 1000 - item.desc.timestamp) / 3600 / 24;
					if (item.extra.is_space_top == 0 && bq > max) {
						data.has_more = 0;
						break;
					} else if (item.desc.orig_dy_id && bq > min && !gongjv.judge.incju(item.desc.pre_dy_id_str, 'zlh')) {
						let a = await assist.kjdtju(item);
						if (a == 2) li[item.desc.pre_dy_id_str] = li[item.desc.pre_dy_id_str] ? li[item.desc.pre_dy_id_str] + 1 : 1;
						else if (a == 1) gongjv.action.in(item.desc.pre_dy_id_str, "zlh");
					}
				}
			} while (data.has_more);
			console.log(ss);
		}
		console.log(li);
		for (let i in li) (li[i] >= 116) ? (() => { gongjv.action.in(i, "zlh"); console.log(i); })() : tty.push(i);
		return Array.from(new Set(tty));
	}
}

const bilijk = {
	start: () => $(document).ready(function () { window.location.href.startsWith('https://t.bilibili.com/') ? bilijk.dtjk() : (window.location.href.startsWith('https://space.bilibili.com/') && gongjv.give.tuidgive() != gongjv.give.uidgive()) ? bilijk.kjjk() : (window.location.href.startsWith('https://www.bilibili.com')) ? bilijk.syjk() : console.log(window.location.href); }),
	async dtjk() {
		biliui.dtui();
		$("#copyToCS").click(async function () {
			!$('.button-bar.tc-slate div:last i').hasClass('zan') ? alert('已经点过赞了') : gongjv.action.in(gongjv.give.dthgive(), 'zlh');
			$("#copyToCS").off('click');
			window.close();
		});
		$('#zlhbg').click(async function () {
			'0' == await bilikx.cjxx(gongjv.give.dthgive(), gongjv.give.uidgive(), 0) ? () => { alert('账号异常'); window.close() } : console.log('上传ok');
			gongjv.action.in(gongjv.give.dthgive(), 'z1');
			GM_setValue('zlh', GM_getValue('zlh', []).filter(d => d != gongjv.give.dthgive()));
			window.close();
		})
		$(document).keydown(e => e.keyCode == 70 ? $('#copyToCS').click() : e.keyCode == 71 ? $('#zlhbg').click() : e.keyCode == 81 ? window.close() : e.keyCode == 82 ? location.reload() : e.keyCode == 65 ? window.open(`https://space.bilibili.com/${$('a.c-pointer').last().attr('href').match(/\d+/)[0]}/dynamic`) : e.keyCode == 83 ? $('body,html').animate({ scrollTop: $(document).scrollTop() + 500 }, 300) : e.keyCode == 87 ? $('body,html').animate({ scrollTop: $(document).scrollTop() - 500 }, 100) : console.log(e.keyCode));
	},
	kjjk() {
		biliui.kjui();
		$('#anniu').click(async function () {
			$("#amount").hide();
			$("#hhh").hide();
			$("#progressbar").show();
			await bilikx.shujihuoqv();
			let tty = await bilicj.kjss($('#anniu'), $("#hhh").slider("values", 0), $("#hhh").slider("values", 1));
			assist.dtzl($('#anniu'), tty);
		});
		$(document).keydown(e => e.keyCode == 81 ? window.close() : e.keyCode == 83 ? $('body,html').animate({ scrollTop: $(document).scrollTop() + 400 }, 300) : e.keyCode == 87 ? $('body,html').animate({ scrollTop: $(document).scrollTop() - 200 }, 100) : e.keyCode == 82 ? location.reload() :console.log(e.keyCode));
	},
	syjk() {
		biliui.syui();
		$('#ul1 li').each(function (i) { $(this).click(jkhs[1][i])});
		$('#bh li').each(function (i) { $(this).click(jkhs[0][i])});
	}
}
