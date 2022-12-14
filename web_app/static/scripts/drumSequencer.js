const drillTemplates = [
	[[0, 2], [], [], [2], [], [], [2], [2], [1, 2], [], [], [2], [], [], [2]],
	[[0, 2], [], [], [2], [], [], [2], [], [2], [], [], [2], [0, 1], [], [2]],
	[[0, 2], [], [], [0, 2], [], [], [1, 2], [], [0], [2], [], [0], [], [], [2]],
	[[0, 2], [], [], [0, 2], [], [], [1, 2], [], [2], [2], [0], [], [1], [], [2]],
	[[0], [], [], [7, 8], [], [], [7, 8], [], [], [], [0], [], [7, 8], [], []],
];

const hipTemplates = [
	[
		[0, 2],
		[],
		[2],
		[],
		[2],
		[],
		[0, 2],
		[],
		[2, 7],
		[],
		[2],
		[],
		[0, 2],
		[],
		[1, 2],
	],
	[
		[0, 2],
		[],
		[2],
		[2],
		[2],
		[],
		[1, 2],
		[],
		[2, 7],
		[],
		[2],
		[],
		[0, 2],
		[],
		[1, 2],
	],
	[
		[0, 2],
		[],
		[1, 2],
		[],
		[0, 2],
		[],
		[2],
		[2],
		[0, 1, 2],
		[2],
		[2],
		[0],
		[2],
		[],
		[0, 2, 3],
	],
];

const regTemplates = [
	[
		[0],
		[],
		[],
		[1, 2],
		[0],
		[],
		[1, 2],
		[],
		[0],
		[],
		[],
		[1, 2],
		[0],
		[],
		[1, 2],
	],
	[
		[0],
		[],
		[2],
		[1, 2],
		[0],
		[],
		[1, 2],
		[],
		[0],
		[2],
		[2],
		[1, 2],
		[0, 2],
		[],
		[1, 2],
	],
];

const DRUM_CLASSES = [
	"Kick",
	"Snare",
	"Hi-hat closed",
	"Hi-hat open",
	"Tom low",
	"Tom mid",
	"Tom high",
	"Clap",
	"Rim",
];
const TIME_HUMANIZATION = 0.01;

let sampleBaseUrl = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699";
let sampleBasePath = "/static/drum_kit/hiphop";

let reverb = new Tone.Convolver(
	`${sampleBaseUrl}/small-drum-room.wav`
).toMaster();
reverb.wet.value = 0.35;

let snarePanner = new Tone.Panner().connect(reverb);
new Tone.LFO(0.13, -0.25, 0.25).connect(snarePanner.pan).start();

let drumKit = [
	new Tone.Players({
		high: `${sampleBasePath}/808-kick-vh.wav`,
		med: `${sampleBasePath}/808-kick-vh.wav`,
		low: `${sampleBasePath}/808-kick-vh.wav`,
	}).toMaster(),
	new Tone.Players({
		high: `${sampleBasePath}/flares-snare-vh.wav`,
		med: `${sampleBasePath}/flares-snare-vh.wav`,
		low: `${sampleBasePath}/flares-snare-vh.wav`,
	}).connect(snarePanner),
	new Tone.Players({
		high: `${sampleBasePath}/808-hihat-vh.wav`,
		med: `${sampleBasePath}/808-hihat-vh.wav`,
		low: `${sampleBasePath}/808-hihat-vh.wav`,
	}).connect(new Tone.Panner(-0.5).connect(reverb)),
	new Tone.Players({
		high: `${sampleBasePath}/808-hihat-open-vh.wav`,
		med: `${sampleBasePath}/808-hihat-open-vh.wav`,
		low: `${sampleBasePath}/808-hihat-open-vh.wav`,
	}).connect(new Tone.Panner(-0.5).connect(reverb)),
	new Tone.Players({
		high: `${sampleBasePath}/slamdam-tom-low-vh.wav`,
		med: `${sampleBasePath}/slamdam-tom-low-vh.wav`,
		low: `${sampleBasePath}/slamdam-tom-low-vh.wav`,
	}).connect(new Tone.Panner(-0.4).connect(reverb)),
	new Tone.Players({
		high: `${sampleBasePath}/slamdam-tom-mid-vh.wav`,
		med: `${sampleBasePath}/slamdam-tom-mid-vh.wav`,
		low: `${sampleBasePath}/slamdam-tom-mid-vh.wav`,
	}).connect(reverb),
	new Tone.Players({
		high: `${sampleBasePath}/slamdam-tom-high-vh.wav`,
		med: `${sampleBasePath}/slamdam-tom-high-vh.wav`,
		low: `${sampleBasePath}/slamdam-tom-high-vh.wav`,
	}).connect(new Tone.Panner(0.4).connect(reverb)),
	new Tone.Players({
		high: `${sampleBasePath}/909-clap-vh.wav`,
		med: `${sampleBasePath}/909-clap-vh.wav`,
		low: `${sampleBasePath}/909-clap-vh.wav`,
	}).connect(new Tone.Panner(0.5).connect(reverb)),
	new Tone.Players({
		high: `${sampleBasePath}/909-rim-vh.wav`,
		med: `${sampleBasePath}/909-rim-vh.wav`,
		low: `${sampleBasePath}/909-rim-vh.wav`,
	}).connect(new Tone.Panner(0.5).connect(reverb)),
];
let drumSelect = document.querySelector(".genre_drumkit");
drumSelect.addEventListener("change", function () {
	switch (drumSelect.value) {
		case "hiphop":
			sampleBasePath = "/static/drum_kit/hiphop";
			break;
		case "drill":
			sampleBasePath = "/static/drum_kit/drill";
			break;
		case "reggaeton":
			sampleBasePath = "/static/drum_kit/reggaeton";
			break;
		case "r&b":
			sampleBasePath = "/static/drum_kit/r&b";
			break;
	}
	drumKit = [
		new Tone.Players({
			high: `${sampleBasePath}/808-kick-vh.wav`,
			med: `${sampleBasePath}/808-kick-vh.wav`,
			low: `${sampleBasePath}/808-kick-vh.wav`,
		}).toMaster(),
		new Tone.Players({
			high: `${sampleBasePath}/flares-snare-vh.wav`,
			med: `${sampleBasePath}/flares-snare-vh.wav`,
			low: `${sampleBasePath}/flares-snare-vh.wav`,
		}).connect(snarePanner),
		new Tone.Players({
			high: `${sampleBasePath}/808-hihat-vh.wav`,
			med: `${sampleBasePath}/808-hihat-vh.wav`,
			low: `${sampleBasePath}/808-hihat-vh.wav`,
		}).connect(new Tone.Panner(-0.5).connect(reverb)),
		new Tone.Players({
			high: `${sampleBasePath}/808-hihat-open-vh.wav`,
			med: `${sampleBasePath}/808-hihat-open-vh.wav`,
			low: `${sampleBasePath}/808-hihat-open-vh.wav`,
		}).connect(new Tone.Panner(-0.5).connect(reverb)),
		new Tone.Players({
			high: `${sampleBasePath}/slamdam-tom-low-vh.wav`,
			med: `${sampleBasePath}/slamdam-tom-low-vh.wav`,
			low: `${sampleBasePath}/slamdam-tom-low-vh.wav`,
		}).connect(new Tone.Panner(-0.4).connect(reverb)),
		new Tone.Players({
			high: `${sampleBasePath}/slamdam-tom-mid-vh.wav`,
			med: `${sampleBasePath}/slamdam-tom-mid-vh.wav`,
			low: `${sampleBasePath}/slamdam-tom-mid-vh.wav`,
		}).connect(reverb),
		new Tone.Players({
			high: `${sampleBasePath}/slamdam-tom-high-vh.wav`,
			med: `${sampleBasePath}/slamdam-tom-high-vh.wav`,
			low: `${sampleBasePath}/slamdam-tom-high-vh.wav`,
		}).connect(new Tone.Panner(0.4).connect(reverb)),
		new Tone.Players({
			high: `${sampleBasePath}/909-clap-vh.wav`,
			med: `${sampleBasePath}/909-clap-vh.wav`,
			low: `${sampleBasePath}/909-clap-vh.wav`,
		}).connect(new Tone.Panner(0.5).connect(reverb)),
		new Tone.Players({
			high: `${sampleBasePath}/909-rim-vh.wav`,
			med: `${sampleBasePath}/909-rim-vh.wav`,
			low: `${sampleBasePath}/909-rim-vh.wav`,
		}).connect(new Tone.Panner(0.5).connect(reverb)),
	];
});

let midiDrums = [36, 38, 42, 46, 41, 43, 45, 49, 51];
let reverseMidiMapping = new Map([
	[36, 0],
	[35, 0],
	[38, 1],
	[27, 1],
	[28, 1],
	[31, 1],
	[32, 1],
	[33, 1],
	[34, 1],
	[37, 1],
	[39, 1],
	[40, 1],
	[56, 1],
	[65, 1],
	[66, 1],
	[75, 1],
	[85, 1],
	[42, 2],
	[44, 2],
	[54, 2],
	[68, 2],
	[69, 2],
	[70, 2],
	[71, 2],
	[73, 2],
	[78, 2],
	[80, 2],
	[46, 3],
	[67, 3],
	[72, 3],
	[74, 3],
	[79, 3],
	[81, 3],
	[45, 4],
	[29, 4],
	[41, 4],
	[61, 4],
	[64, 4],
	[84, 4],
	[48, 5],
	[47, 5],
	[60, 5],
	[63, 5],
	[77, 5],
	[86, 5],
	[87, 5],
	[50, 6],
	[30, 6],
	[43, 6],
	[62, 6],
	[76, 6],
	[83, 6],
	[49, 7],
	[55, 7],
	[57, 7],
	[58, 7],
	[51, 8],
	[52, 8],
	[53, 8],
	[59, 8],
	[82, 8],
]);

let temperature = 1.2;

let outputs = {
	internal: {
		play: (drumIdx, velocity, time) => {
			drumKit[drumIdx].get(velocity).start(time);
		},
	},
};

let rnn = new mm.MusicRNN(
	"https://storage.googleapis.com/download.magenta.tensorflow.org/tfjs_checkpoints/music_rnn/drum_kit_rnn"
);
let vae = new mm.MusicVAE(
	"https://storage.googleapis.com/download.magenta.tensorflow.org/tfjs_checkpoints/music_vae/drums_2bar_hikl_small"
);
Promise.all([
	rnn.initialize(),
	vae.initialize(),
	new Promise((res) => Tone.Buffer.on("load", res)),
]).then(([vars]) => {
	let state = {
		patternLength: 16,
		seedLength: 4,
		swing: 0.5,
		pattern: [].concat(_.times(16, (i) => [])),
		tempo: parseInt(document.getElementById("tempo").value),
	};
	Tone.Transport.bpm.value = state.tempo;

	let templateSelect = document.querySelector(".genre_template");

	function randomRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	templateSelect.addEventListener("change", function () {
		let rand = 0;
		switch (templateSelect.value) {
			case "hiphop":
				rand = randomRange(0, hipTemplates.length - 1);
				state.pattern = hipTemplates[rand].concat(_.times(1, (i) => []));
				break;
			case "drill":
				rand = randomRange(0, drillTemplates.length - 1);
				state.pattern = drillTemplates[rand].concat(_.times(1, (i) => []));
				break;
			case "reggaeton":
				rand = randomRange(0, regTemplates.length - 1);
				state.pattern = regTemplates[rand].concat(_.times(1, (i) => []));
				break;
			case "r&b":
				state.pattern = [
					[0, 2],
					[],
					[],
					[],
					[2],
					[],
					[],
					[],
					[2],
					[],
					[],
					[],
					[2, 3, 7],
					[],
					[],
				].concat(_.times(1, (i) => []));
				break;
			case "clear":
				state.pattern = [].concat(_.times(16, (i) => []));
				break;
		}

		onPatternUpdated();
	});

	let stepEls = [],
		hasBeenStarted = false,
		sequence,
		densityRange = null,
		activeOutput = "internal";

	function generatePattern(seed, length) {
		let seedSeq = toNoteSequence(seed);
		return rnn
			.continueSequence(seedSeq, length, temperature)
			.then((r) => seed.concat(fromNoteSequence(r, length)));
	}

	function getStepVelocity(step) {
		if (step % 4 === 0) {
			return "high";
		} else if (step % 2 === 0) {
			return "med";
		} else {
			return "low";
		}
	}

	function humanizeTime(time) {
		return time - TIME_HUMANIZATION / 2 + Math.random() * TIME_HUMANIZATION;
	}

	function playPattern() {
		sequence = new Tone.Sequence(
			(time, { drums, stepIdx }) => {
				let isSwung = stepIdx % 2 !== 0;
				if (isSwung) {
					time += (state.swing - 0.5) * Tone.Time("8n").toSeconds();
				}
				let velocity = getStepVelocity(stepIdx);
				drums.forEach((d) => {
					let humanizedTime = stepIdx === 0 ? time : humanizeTime(time);
					outputs[activeOutput].play(d, velocity, time);
					visualizePlay(humanizedTime, stepIdx, d);
				});
			},
			state.pattern.map((drums, stepIdx) => ({ drums, stepIdx })),
			"16n"
		).start();
	}

	function visualizePlay(time, stepIdx, drumIdx) {
		Tone.Draw.schedule(() => {
			if (!stepEls[stepIdx]) return;
			let animTime = Tone.Time("2n").toMilliseconds();
			let cellEl = stepEls[stepIdx].cellEls[drumIdx];
			if (cellEl.classList.contains("on")) {
				let baseColor = stepIdx < state.seedLength ? "#32E0C4" : "#FF4D00";
				cellEl.animate(
					[
						{
							transform: "translateZ(-100px)",
							backgroundColor: "#fad1df",
						},
						{
							transform: "translateZ(50px)",
							offset: 0.7,
						},
						{ transform: "translateZ(0)", backgroundColor: baseColor },
					],
					{ duration: animTime, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }
				);
			}
		}, time);
	}

	function renderPattern(regenerating = false) {
		let seqEl = document.querySelector(".sequencer .steps");
		while (stepEls.length > state.pattern.length) {
			let { stepEl, gutterEl } = stepEls.pop();
			stepEl.remove();
			if (gutterEl) gutterEl.remove();
		}
		for (let stepIdx = 0; stepIdx < state.pattern.length; stepIdx++) {
			let step = state.pattern[stepIdx];
			let stepEl, gutterEl, cellEls;
			if (stepEls[stepIdx]) {
				stepEl = stepEls[stepIdx].stepEl;
				gutterEl = stepEls[stepIdx].gutterEl;
				cellEls = stepEls[stepIdx].cellEls;
			} else {
				stepEl = document.createElement("div");
				stepEl.classList.add("step");
				stepEl.dataset.stepIdx = stepIdx;
				seqEl.appendChild(stepEl);
				cellEls = [];
			}

			stepEl.style.flex = stepIdx % 2 === 0 ? state.swing : 1 - state.swing;

			if (!gutterEl && stepIdx < state.pattern.length - 1) {
				gutterEl = document.createElement("div");
				gutterEl.classList.add("gutter");
				seqEl.insertBefore(gutterEl, stepEl.nextSibling);
			} else if (gutterEl && stepIdx >= state.pattern.length) {
				gutterEl.remove();
				gutterEl = null;
			}

			if (gutterEl && stepIdx === state.seedLength - 1) {
				gutterEl.classList.add("seed-marker");
			} else if (gutterEl) {
				gutterEl.classList.remove("seed-marker");
			}

			for (let cellIdx = 0; cellIdx < DRUM_CLASSES.length; cellIdx++) {
				let cellEl;
				if (cellEls[cellIdx]) {
					cellEl = cellEls[cellIdx];
				} else {
					cellEl = document.createElement("div");
					cellEl.classList.add("cell");
					cellEl.classList.add(_.kebabCase(DRUM_CLASSES[cellIdx]));
					cellEl.dataset.stepIdx = stepIdx;
					cellEl.dataset.cellIdx = cellIdx;
					stepEl.appendChild(cellEl);
					cellEls[cellIdx] = cellEl;
				}
				if (step.indexOf(cellIdx) >= 0) {
					cellEl.classList.add("on");
				} else {
					cellEl.classList.remove("on");
				}
			}
			stepEls[stepIdx] = { stepEl, gutterEl, cellEls };

			let stagger = stepIdx * (300 / (state.patternLength - state.seedLength));
			setTimeout(() => {
				if (stepIdx < state.seedLength) {
					stepEl.classList.add("seed");
				} else {
					stepEl.classList.remove("seed");
					if (regenerating) {
						stepEl.classList.add("regenerating");
					} else {
						stepEl.classList.remove("regenerating");
					}
				}
			}, stagger);
		}

		setTimeout(repositionRegenerateButton, 0);
	}

	function repositionRegenerateButton() {
		// let regenButton = document.querySelector(".regenerate");
		// let sequencerEl = document.querySelector(".sequencer");
		// let seedMarkerEl = document.querySelector(".gutter.seed-marker");
		// let regenLeft =
		// 	sequencerEl.offsetLeft +
		// 	seedMarkerEl.offsetLeft +
		// 	seedMarkerEl.offsetWidth / 2 -
		// 	regenButton.offsetWidth / 2;
		// let regenTop =
		// 	sequencerEl.offsetTop +
		// 	seedMarkerEl.offsetTop +
		// 	seedMarkerEl.offsetHeight / 2 -
		// 	regenButton.offsetHeight / 2;
		// regenButton.style.left = `${regenLeft}px`;
		// regenButton.style.top = `${regenTop}px`;
		// regenButton.style.visibility = "visible";
	}

	function regenerate() {
		let seed = _.take(state.pattern, state.seedLength);
		renderPattern(true);
		return generatePattern(seed, state.patternLength - seed.length).then(
			(result) => {
				state.pattern = result;
				onPatternUpdated();
				setDensityValue();
				updateDensityRange();
			}
		);
	}

	function onPatternUpdated() {
		if (sequence) {
			sequence.dispose();
			sequence = null;
		}
		renderPattern();
	}

	function toggleStep(cellEl) {
		if (state.pattern && cellEl.classList.contains("cell")) {
			let stepIdx = +cellEl.dataset.stepIdx;
			let cellIdx = +cellEl.dataset.cellIdx;
			let isOn = cellEl.classList.contains("on");
			if (isOn) {
				_.pull(state.pattern[stepIdx], cellIdx);
				cellEl.classList.remove("on");
			} else {
				state.pattern[stepIdx].push(cellIdx);
				cellEl.classList.add("on");
			}
			if (sequence) {
				sequence.at(stepIdx, { stepIdx, drums: state.pattern[stepIdx] });
			}
			setDensityValue();
			densityRange = null;
		}
	}

	function setDensityValue() {
		let totalCellCount = state.pattern.length * 9;
		let activeCellCount = _.sum(state.pattern.map((p) => p.length));
		let density = activeCellCount / totalCellCount;
		let roundedDensity = Math.round(density / 0.05) * 0.05;
		document.querySelector("#density").value = roundedDensity;
	}

	function updateDensityRange(
		density = +document.querySelector("#density").value
	) {
		let stepsDown = density / 0.05;
		let stepsUp = (0.75 - density) / 0.05;
		let stepsBeyond = 0.25 / 0.05;

		let emptySeq = toNoteSequence([]);
		let fullSeq = toNoteSequence(
			_.times(state.pattern.length, () => _.range(9))
		);

		let currentSeq = toNoteSequence(state.pattern);

		densityRange = [];
		let interpsUp =
			stepsDown > 0
				? vae.interpolate([emptySeq, currentSeq], stepsDown)
				: Promise.resolve([]);
		let interpsDown =
			stepsUp > 0
				? vae.interpolate([currentSeq, fullSeq], stepsUp + stepsBeyond)
				: Promise.resolve([]);

		interpsDown
			.then((interps) => {
				for (let noteSeq of interps) {
					densityRange.push(fromNoteSequence(noteSeq, state.pattern.length));
				}
			})
			.then(() => densityRange.push(state.pattern))
			.then(() => interpsUp)
			.then((interps) => {
				for (let noteSeq of interps) {
					if (stepsUp-- > 0) {
						densityRange.push(fromNoteSequence(noteSeq, state.pattern.length));
					}
				}
			});
	}

	function toNoteSequence(pattern) {
		return mm.sequences.quantizeNoteSequence(
			{
				ticksPerQuarter: 220,
				totalTime: pattern.length / 2,
				timeSignatures: [
					{
						time: 0,
						numerator: 4,
						denominator: 4,
					},
				],
				tempos: [
					{
						time: 0,
						qpm: parseInt(document.getElementById("tempo").value),
					},
				],
				notes: _.flatMap(pattern, (step, index) =>
					step.map((d) => ({
						pitch: midiDrums[d],
						startTime: index * 0.5,
						endTime: (index + 1) * 0.5,
					}))
				),
			},
			1
		);
	}

	function fromNoteSequence({ notes }, patternLength) {
		let res = _.times(patternLength, () => []);
		for (let { pitch, quantizedStartStep } of notes) {
			res[quantizedStartStep].push(reverseMidiMapping.get(pitch));
		}
		return res;
	}

	function setSwing(newSwing) {
		state.swing = newSwing;
		renderPattern();
	}

	function setBars(newPatternLength) {
		if (newPatternLength < state.patternLength) {
			state.pattern.length = newPatternLength;
		} else {
			for (let i = state.pattern.length; i < newPatternLength; i++) {
				state.pattern.push([]);
			}
		}
		let lengthRatio = newPatternLength / state.patternLength;
		state.seedLength = Math.max(
			1,
			Math.min(newPatternLength - 1, Math.round(state.seedLength * lengthRatio))
		);
		state.patternLength = newPatternLength;

		onPatternUpdated();
		if (Tone.Transport.state === "started") {
			playPattern();
		}
	}

	// function updatePlayPauseIcons() {
	// 	if (Tone.Transport.state === "started") {
	// 		document.querySelector(".playpause .pause-icon").style.display = null;
	// 		document.querySelector(".playpause .play-icon").style.display = "none";
	// 	} else {
	// 		document.querySelector(".playpause .play-icon").style.display = null;
	// 		document.querySelector(".playpause .pause-icon").style.display = "none";
	// 	}
	// }

	function encodeState() {
		return Object.keys(state)
			.reduce((a, k) => {
				a.push(k + "=" + JSON.stringify(state[k]));
				return a;
			}, [])
			.join("&");
	}

	WebMidi.enable((err) => {
		if (err) {
			console.error("WebMidi could not be enabled", err);
			return;
		}
		document.querySelector(".webmidi-enabled").style.display = "block";
		let outputSelector = document.querySelector(".midi-output");

		function onOutputsChange() {
			while (outputSelector.firstChild) {
				outputSelector.firstChild.remove();
			}
			let internalOption = document.createElement("option");
			internalOption.value = "internal";
			internalOption.innerText = "Internal drumkit";
			outputSelector.appendChild(internalOption);
			for (let output of WebMidi.outputs) {
				let option = document.createElement("option");
				option.value = output.id;
				option.innerText = output.name;
				outputSelector.appendChild(option);
			}
			onActiveOutputChange("internal");
		}

		function onActiveOutputChange(id) {
			if (activeOutput !== "internal") {
				outputs[activeOutput] = null;
			}
			activeOutput = id;
			if (activeOutput !== "internal") {
				let output = WebMidi.getOutputById(id);
				outputs[id] = {
					play: (drumIdx, velo, time) => {
						let delay = (time - Tone.now()) * 1000;
						let duration = Tone.Time("16n").toMilliseconds();
						let velocity = { high: 1, med: 0.75, low: 0.5 };
						output.playNote(midiDrums[drumIdx], 1, {
							time: delay > 0 ? `+${delay}` : WebMidi.now,
							velocity,
							duration,
						});
					},
				};
			}
			for (let option of Array.from(outputSelector.children)) {
				option.selected = option.value === id;
			}
		}

		onOutputsChange();
		WebMidi.addListener("connected", onOutputsChange);
		WebMidi.addListener("disconnected", onOutputsChange);
		$(outputSelector)
			.on("change", (evt) => onActiveOutputChange(evt.target.value))
			.material_select();
	});

	document.querySelector(".app").addEventListener("click", (event) => {
		if (event.target.classList.contains("cell")) {
			toggleStep(event.target);
		}
	});
	document.querySelector(".regenerate").addEventListener("click", (event) => {
		event.preventDefault();
		event.currentTarget.classList.remove("pulse");
		document.querySelector(".playpause").classList.remove("pulse");
		regenerate().then(() => {
			if (!hasBeenStarted) {
				Tone.context.resume();
				Tone.Transport.start();
				// updatePlayPauseIcons();
				hasBeenStarted = true;
			}
			if (Tone.Transport.state === "started") {
				setTimeout(() => playPattern(), 0);
			}
		});
	});
	document.querySelector(".playpause").addEventListener("click", (event) => {
		event.preventDefault();
		document.querySelector(".playpause").classList.remove("pulse");
		if (Tone.Transport.state !== "started") {
			Tone.context.resume();
			Tone.Transport.start();
			playPattern();
			// updatePlayPauseIcons();
			hasBeenStarted = true;
		} else {
			if (sequence) {
				sequence.dispose();
				sequence = null;
			}
			Tone.Transport.pause();
			// updatePlayPauseIcons();
		}
	});

	let draggingSeedMarker = false;
	document.querySelector(".app").addEventListener("mousedown", (evt) => {
		let el = evt.target;
		if (
			el.classList.contains("gutter") &&
			el.classList.contains("seed-marker")
		) {
			draggingSeedMarker = true;
			evt.preventDefault();
		}
	});
	document.querySelector(".app").addEventListener("mouseup", () => {
		draggingSeedMarker = false;
	});
	document.querySelector(".app").addEventListener("mouseover", (evt) => {
		if (draggingSeedMarker) {
			let el = evt.target;
			while (el) {
				if (el.classList.contains("step")) {
					let stepIdx = +el.dataset.stepIdx;
					if (stepIdx > 0) {
						state.seedLength = stepIdx;
						renderPattern();
					}
					break;
				}
				el = el.parentElement;
			}
		}
	});
	document.querySelector("#density").addEventListener("input", (evt) => {
		let newDensity = +evt.target.value;
		let patternIndex = Math.round(newDensity / 0.05);
		if (_.isNull(densityRange)) {
			updateDensityRange(newDensity);
		}
		if (
			densityRange &&
			patternIndex >= 0 &&
			patternIndex < densityRange.length - 1
		) {
			state.pattern = densityRange[patternIndex];
			renderPattern();
			if (sequence) {
				state.pattern.forEach((drums, stepIdx) =>
					sequence.at(stepIdx, { stepIdx, drums })
				);
			}
		}
	});
	document
		.querySelector("#swing")
		.addEventListener("input", (evt) => setSwing(+evt.target.value));
	document
		.querySelector("#temperature")
		.addEventListener("input", (evt) => (temperature = +evt.target.value));
	document
		.querySelector("#tempo")
		.addEventListener(
			"input",
			(evt) => (Tone.Transport.bpm.value = state.tempo = +evt.target.value)
		);
	document
		.querySelector("#bars")
		.addEventListener("input", (evt) => setBars(+evt.target.value));

	window.addEventListener("resize", repositionRegenerateButton);

	renderPattern();
	setDensityValue();

	document.querySelector(".progress").remove();
	document.querySelector(".app").style.display = null;
});
