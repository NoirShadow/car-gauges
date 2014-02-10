(function() {

	var noop = function() {};
	var isFn = function(value) { return typeof value == "function"; };

	var Display = function(options, gauges) {
		this.options = options || {};
		this.gauges = gauges || [];

		this.options.updateCycle = this.options.updateCycle || 3000;
		
		document.addEventListener("DOMContentLoaded", (function() {
			this.container = document.createElement("ol");		
			document.body.appendChild(this.container);
		}).bind(this));

		(function update() {
			this.gauges.forEach(function(gauge) {
				gauge.onUpdate(gauge.container);
			});

			setTimeout(update.bind(this), this.options.updateCycle);
		}).bind(this)();
	};

	Display.prototype.add = function(gauge) {
		var li = document.createElement("li");
		this.gauges.push(gauge);
		gauge.container = li;

		document.addEventListener("DOMContentLoaded", (function() {
			this.container.appendChild(li);
			gauge.init(li);
			gauge.onUpdate(li);
		}).bind(this));
	};

	var Gauge = function(init, onUpdate) {
		this.init = init || noop;
		this.onUpdate = isFn(onUpdate) ? onUpdate : noop;
	};

	// TODO: Add reusable components here that can be
	// dropped into existing gauges.
	var Controls = {};

	window.Display = Display;
	window.Gauge = Gauge;
	window.Controls = Controls;
})();


var gauges = new Display();

var fridgeTemp = new Gauge(
	function(container) {
		var label = document.createElement("h1");
		var display = document.createElement("span");
		label.textContent = "Fridge Temp.";
		display.classList.add("display");
		container.appendChild(label);
		container.appendChild(display);
	},
	function(container) {
		container.querySelector(".display").innerHTML = (Math.random() * 15 + 5).toFixed(2) + "<span>&deg;C</span>";
	}
);

var airPressure = new Gauge(
	function(container) {
		var label = document.createElement("h1");
		var display = document.createElement("span");
		label.textContent = "Air Pressure";
		display.classList.add("display");
		container.appendChild(label);
		container.appendChild(display);
	},
	function(container) {
		container.querySelector(".display").innerHTML = Math.round(Math.random() * 3 + 18) + "<span>PSI</span>";
	}
);

var batteryVolt = new Gauge(
	function(container) {
		var label = document.createElement("h1");
		var display1 = document.createElement("span");
		var display1Label = document.createElement("h2");
		var display2 = document.createElement("span");
		var display2Label = document.createElement("h2");


		label.textContent = "Battery Voltages";
		display1.classList.add("display", "primary");
		display1Label.textContent = "Primary";
		display2.classList.add("display", "auxilary");
		display2Label.textContent = "Secondary";


		container.appendChild(label);
		container.appendChild(display1Label);
		container.appendChild(display1);
		container.appendChild(display2Label);
		container.appendChild(display2);

	},
	function(container) {
		container.querySelector(".primary").innerHTML = (Math.random() * 1.4 + 11.3).toFixed(1) + "<span>V</span>";
		container.querySelector(".auxilary").innerHTML = (Math.random() * 1.4 + 11.5).toFixed(1) + "<span>V</span>";
	}
);

gauges.add(fridgeTemp);
gauges.add(airPressure);
gauges.add(batteryVolt);

