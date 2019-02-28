var options = {
	series: {
		shadowSize: 0,
		lines: {
			show: !1,
			lineWidth: 0
		}
	},
	grid: {
		borderWidth: 0,
		labelMargin: 10,
		hoverable: !0,
		clickable: !0,
		mouseActiveRadius: 15
	},
	xaxis: {
		tickDecimals: 0,
		ticks: !1
	},
	yaxis: {
		tickDecimals: 0,
		ticks: !1
	},
	legend: {
		show: !1
	}
};

/*
(function ($) {
 "use strict";


 function getRandomData() {
	for (data.length > 0 && (data = data.slice(1)); data.length < totalPoints;) {
		var prev = data.length > 0 ? data[data.length - 1] : 50,
			y = prev + 10 * Math.random() - 5;
		0 > y ? y = 0 : y > 90 && (y = 90), data.push(y)
	}
	for (var res = [], i = 0; i < data.length; ++i) res.push([i, data[i]]);
	return res
}


		for (var data = [], totalPoints = 100, d1 = [], i = 0; 10 >= i; i += 1) d1.push([i, parseInt(30 * Math.random())]);
		for (var d2 = [], i = 0; 20 >= i; i += 1) d2.push([i, parseInt(30 * Math.random())]);
		for (var d3 = [], i = 0; 10 >= i; i += 1) d3.push([i, parseInt(30 * Math.random())]);

		$("#assetsGgraph")[0] && $.plot($("#assetsGgraph"), [{
			data: d1,
			lines: {
				show: !0,
				fill: .98
			},
			label: "Assets",
			stack: !0,
			color: "#fff"
		}], options), $(".flot-chart")[0] && ($(".flot-chart").bind("plothover", function(event, pos, item) {
			if (item) {
				var x = item.datapoint[0].toFixed(2),
					y = item.datapoint[1].toFixed(2);
				$(".flot-tooltip").html(item.series.label + ": " + Math.round(y)).css({
                    top: item.pageY + 15,
                    left: item.pageX - 50
                }).show()
			} else $(".flot-tooltip").hide()
		}), $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body"));




        $("#expensesGgraph")[0] && $.plot($("#expensesGgraph"), [{
            data: d1,
            lines: {
                show: !0,
                fill: .98
            },
            label: "Expenses",
            stack: !0,
            color: "#fff"
        }], options), $(".flot-chart")[0] && ($(".flot-chart").bind("plothover", function(event, pos, item) {
            if (item) {
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);
                $(".flot-tooltip").html(item.series.label + ": " + Math.round(y)).css({
                    top: item.pageY + 15,
                    left: item.pageX - 50
                }).show()
            } else $(".flot-tooltip").hide()
        }), $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body"));




        $("#liabilitiesGgraph")[0] && $.plot($("#liabilitiesGgraph"), [{
            data: d1,
            lines: {
                show: !0,
                fill: .98
            },
            label: "Liabilities",
            stack: !0,
            color: "#fff"
        }], options), $(".flot-chart")[0] && ($(".flot-chart").bind("plothover", function(event, pos, item) {
            if (item) {
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);
                $(".flot-tooltip").html(item.series.label + ": " + Math.round(y)).css({
                    top: item.pageY + 15,
                    left: item.pageX - 50
                }).show()
            } else $(".flot-tooltip").hide()
        }), $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body"));




})(jQuery);
*/

function rePlot(type, values) {
	$("#"+type+"Ggraph")[0] && $.plot($("#"+type+"Ggraph"), [{
		data: values,
		lines: {
			show: !0,
			fill: .98
		},
		label: type.charAt(0).toUpperCase()+type.substring(1).toLowerCase(),
		stack: !0,
		color: "#fff"
	}], options), $(".flot-chart")[0] && ($(".flot-chart").bind("plothover", function(event, pos, item) {
		if (item) {
			var x = item.datapoint[0].toFixed(2),
				y = item.datapoint[1].toFixed(2);
			$(".flot-tooltip").html(item.series.label + ": " + Math.round(y)).css({
				top: item.pageY + 15,
				left: item.pageX - 50
			}).show()
		} else $(".flot-tooltip").hide()
	}), $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body"));

}
