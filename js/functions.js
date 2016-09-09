// variables
var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();
var d, h, m, s;

// $(function () {
//     // setup garden
// 	$loveHeart = $("#loveHeart");
// 	var offsetX = $loveHeart.width() / 2;
// 	var offsetY = $loveHeart.height() / 2 - 55;
//     $garden = $("#garden");
//     gardenCanvas = $garden[0];
// 	gardenCanvas.width = $("#loveHeart").width();
//     gardenCanvas.height = $("#loveHeart").height()
//     gardenCtx = gardenCanvas.getContext("2d");
//     gardenCtx.globalCompositeOperation = "lighter";
//     garden = new Garden(gardenCtx, gardenCanvas);


//     // renderLoop
//     setInterval(function () {
//         garden.render();
//     }, Garden.options.growSpeed);
// });

$(window).resize(function () {
    var newWidth = $(window).width();
    var newHeight = $(window).height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

function getHeartPoint(angle) {
	var t = angle / Math.PI;
	var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
	var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(offsetX + x, offsetY + y);
}

// function startHeartAnimation() {
// 	var interval = 50;
// 	var angle = 10;
// 	var heart = new Array();
// 	var animationTimer = setInterval(function () {
// 		var bloom = getHeartPoint(angle);
// 		var draw = true;
// 		for (var i = 0; i < heart.length; i++) {
// 			var p = heart[i];
// 			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
// 			if (distance < Garden.options.bloomRadius.max * 1.3) {
// 				draw = false;
// 				break;
// 			}
// 		}
// 		if (draw) {
// 			heart.push(bloom);
// 			garden.createRandomBloom(bloom[0], bloom[1]);
// 		}
// 		if (angle >= 30) {
// 			clearInterval(animationTimer);
// 			showMessages();
// 		} else {
// 			angle += 0.2;
// 		}
// 	}, interval);
// }


(function ($) {
	$.fn.typewriter = function () {
		this.css('display', 'block');
		// swiper.lockSwipes();
		this.each(function () {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function () {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '▍' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
					unLock();
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

(function ($) {
	$.fn.typeStop = function () {
		this.css('display', 'none');
	};
})(jQuery);

var unLock = function () {
	// swiper.unlockSwipes();
}

function timeElapse(date) {

	var current = Date();
	var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	seconds = seconds % 60;
	d = days;
	h = hours;
	m = minutes;
	s = seconds;

	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}

	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	var result = "Days matter: <span class=\"digit\">" + days + "</span>Days <span class=\"digit\"> " + hours + " </span>Hours <span class=\"digit\"> " + minutes + " </span>Mins <span class=\"digit\"> " + seconds + " </span>Secs";
	$("#elapseClock").html(result);
}

function showMessages() {
	// adjustWordsPosition();
	$('#messages').fadeIn(5000, function () {
		showLoveU();
	});
}

// function adjustWordsPosition() {
// 	$('#words').css("position", "absolute");
// 	$('#words').css("top", $("#garden").position().top + 195);
// 	$('#words').css("left", $("#garden").position().left + 70);
// }

// function adjustCodePosition() {
// 	$('#code').css("margin-top", 90 );
// }

// function showLoveU() {
// 	$('#loveu').fadeIn(3000);
// }

var finalPage = function () {

	$("#elapseClock").fadeOut(5000);
	// $("#xxx").fadeIn(3000);

	var daysMa = d + ' Days ' + h + ' Hours ' + m + ' Minutes ' + s;
	console.log(daysMa);
	// $(".matterDate").fadeIn(3000,function(){
	// 	$(".matterDate").html(daysMa);
	// })
	// alert(s);
	var i = 1;
	var thiss = 60;
	var thism = 60;
	var thish = 24;

	var upSec = new CountUp("ms", 0, thiss, 0, 0.5);
	upSec.start(checkMin);
	var upMin = new CountUp("mm", 0, thism, 0, 0.5);
	upMin.start(checkHou);
	var upHou = new CountUp("mh", 0, thish, 0, 0.7);
	upHou.start(checkDay);
	var upDay = new CountUp("md", 0, d, 0, 4);
	upDay.start();
	// console.log(upSec);

	function checkMin() {
		console.log(i);
		i++;
		if ($("#mm").html() >= m) { thiss = s; upSec.reset(); upSec = new CountUp("ms", 0, s, 0, 1); upSec.start(); startChange(); }
		else { upSec.reset(); upSec.start(checkMin); }
	}
	function checkHou() {
		if ($("#mh").html() >= h - 1) { thism = m; upMin.reset(); upMin = new CountUp("mm", 0, m, 0, 2); upMin.start(); }
		else { upMin.reset(); upMin.start(checkHou); }
	}
	function checkDay() {
		console.log($("#md").html() + d);
		if ($("#md").html() >= d - 2) { thish = h; upHou.reset(); upHou = new CountUp("mh", 0, h, 0, 4); upHou.start(); }
		else { upHou.reset(); upHou.start(checkDay); }
	}

	setInterval(function() {
		if ($("#ms").html() == 60) {
			$("#ms").html(1);
			if ($("#mm").html() == 60) {
				$("#mm").html(1);
			} else {
				var mmm = Number($("#mm").html());
				$("#mm").html(mmm + 1);
			}
		} else {
			var sss = Number($("#ms").html());
			$("#ms").html(sss + 1);
		}
	}, 1000);
	var startChange = function () {
		console.log("asd");
	}
}