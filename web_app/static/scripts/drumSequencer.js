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
		// Create a new Tone.Sequence with the given callback function
		sequence = new Tone.Sequence(
			(time, { drums, stepIdx }) => {
				// Determine if the current step should be swung or not
				let isSwung = stepIdx % 2 !== 0;
				if (isSwung) {
					// If the current step is swung, adjust the time by the swing value
					time += (state.swing - 0.5) * Tone.Time("8n").toSeconds();
				}
				// Get the velocity for the current step
				let velocity = getStepVelocity(stepIdx);
				// Iterate over each drum in the current step
				drums.forEach((d) => {
					let humanizedTime = stepIdx === 0 ? time : humanizeTime(time);
					outputs[activeOutput].play(d, velocity, time);
					// Visualize the drum being played
					visualizePlay(humanizedTime, stepIdx, d);
				});
			},
			state.pattern.map((drums, stepIdx) => ({ drums, stepIdx })),
			// The interval at which each step should be played
			"16n"
		).start();
	}

	function visualizePlay(time, stepIdx, drumIdx) {
		// Schedule the visualization of the drum playing
		Tone.Draw.schedule(() => {
			// Return if the step element doesn't exist
			if (!stepEls[stepIdx]) return;
			// Set the animation time to be 2 beats
			let animTime = Tone.Time("2n").toMilliseconds();
			// Get the cell element for the given drum index
			let cellEl = stepEls[stepIdx].cellEls[drumIdx];
			// If the cell is on, animate it
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
		// Remove step and gutter elements that are no longer needed
		while (stepEls.length > state.pattern.length) {
			let { stepEl, gutterEl } = stepEls.pop();
			stepEl.remove();
			if (gutterEl) gutterEl.remove();
		}
		// Render the step elements for each step in the pattern
		for (let stepIdx = 0; stepIdx < state.pattern.length; stepIdx++) {
			let step = state.pattern[stepIdx];
			let stepEl, gutterEl, cellEls;
			// Reuse existing step and gutter elements, if they exist
			if (stepEls[stepIdx]) {
				stepEl = stepEls[stepIdx].stepEl;
				gutterEl = stepEls[stepIdx].gutterEl;
				cellEls = stepEls[stepIdx].cellEls;
			} else {
				// Create a new step element
				stepEl = document.createElement("div");
				stepEl.classList.add("step");
				stepEl.dataset.stepIdx = stepIdx;
				seqEl.appendChild(stepEl);
				cellEls = [];
			}
			// Set the flex of the step element based on the swing value
			stepEl.style.flex = stepIdx % 2 === 0 ? state.swing : 1 - state.swing;
			// Create a gutter element if needed
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
			// Render the cell elements for each cell in the step
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
		// Check if state.pattern exists and the cellEl is a cell
		if (state.pattern && cellEl.classList.contains("cell")) {
			let stepIdx = +cellEl.dataset.stepIdx;
			let cellIdx = +cellEl.dataset.cellIdx;
			// Check if the cell is currently "on"
			let isOn = cellEl.classList.contains("on");
			if (isOn) {
				// Remove the cell index from the state.pattern for the current step
				_.pull(state.pattern[stepIdx], cellIdx);
				cellEl.classList.remove("on");
			} else {
				// Add the cell index to the state.pattern for the current step
				state.pattern[stepIdx].push(cellIdx);
				cellEl.classList.add("on");
			}
			// Check if the sequence exists
			if (sequence) {
				// Update the step in the sequence with the new state.pattern
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
		// Calculate the number of steps to decrease the density, to increase the density, and beyond the target density
		let stepsDown = density / 0.05;
		let stepsUp = (0.75 - density) / 0.05;
		let stepsBeyond = 0.25 / 0.05;
		// Get the current note sequence from the state
		let emptySeq = toNoteSequence([]);
		let fullSeq = toNoteSequence(
			_.times(state.pattern.length, () => _.range(9))
		);

		let currentSeq = toNoteSequence(state.pattern);

		// Initialize the density range array
		densityRange = [];
		// Interpolate between the empty sequence and the current sequence to decrease the density
		let interpsUp =
			stepsDown > 0
				? vae.interpolate([emptySeq, currentSeq], stepsDown)
				: Promise.resolve([]);
		// Interpolate between the current sequence and the full sequence to increase the density
		let interpsDown =
			stepsUp > 0
				? vae.interpolate([currentSeq, fullSeq], stepsUp + stepsBeyond)
				: Promise.resolve([]);
		// After getting the interpolated sequences to decrease the density, push the current pattern into the density range
		interpsDown
			.then((interps) => {
				for (let noteSeq of interps) {
					// Add each interpolated sequence to the density range
					densityRange.push(fromNoteSequence(noteSeq, state.pattern.length));
				}
			})
			.then(() => densityRange.push(state.pattern))
			// After pushing the current pattern, get the interpolated sequences to increase the density
			.then(() => interpsUp)
			.then((interps) => {
				for (let noteSeq of interps) {
					// Add each interpolated sequence to the density range if there are still steps left to increase the density
					if (stepsUp-- > 0) {
						densityRange.push(fromNoteSequence(noteSeq, state.pattern.length));
					}
				}
			});
	}

	function toNoteSequence(pattern) {
		// Create a quantized note sequence from the given pattern
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

	// and returns an array of arrays representing the rhythm pattern
	function fromNoteSequence({ notes }, patternLength) {
		// initialize an empty 2D array with `patternLength` rows and empty arrays in each row
		let res = _.times(patternLength, () => []);
		for (let { pitch, quantizedStartStep } of notes) {
			// push the pitch corresponding to the given `pitch` in the `notes` array
			// to the appropriate `quantizedStartStep` row in the `res` 2D array
			res[quantizedStartStep].push(reverseMidiMapping.get(pitch));
		}
		// return the `res` 2D array
		return res;
	}

	function setSwing(newSwing) {
		state.swing = newSwing;
		renderPattern();
	}

	function setBars(newPatternLength) {
		// Update the length of the pattern array
		if (newPatternLength < state.patternLength) {
			state.pattern.length = newPatternLength;
		} else {
			// add empty arrays to the pattern array to fill the gap
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

	document.querySelector(".app").addEventListener("click", (event) => {
		if (event.target.classList.contains("cell")) {
			toggleStep(event.target);
		}
	});

	// generates the pattern
	document.querySelector(".regenerate").addEventListener("click", (event) => {
		event.preventDefault();
		event.currentTarget.classList.remove("pulse");
		document.querySelector(".playpause").classList.remove("pulse");
		regenerate().then(() => {
			if (!hasBeenStarted) {
				Tone.context.resume();
				Tone.Transport.start();

				hasBeenStarted = true;
			}
			if (Tone.Transport.state === "started") {
				setTimeout(() => playPattern(), 0);
			}
		});
	});

	let recorder = new Recorder(Tone.Master, {
		numChannels: 2, // stereo
		mimeType: "audio/wav", // set the output format to WAV
	});

	// plays and pauses the drums
	document.querySelector(".playpause").addEventListener("click", (event) => {
		event.preventDefault();
		document.querySelector(".playpause").classList.remove("pulse");
		if (Tone.Transport.state !== "started") {
			Tone.context.resume();
			Tone.Transport.start();
			recorder.clear();
			recorder.record();
			playPattern();

			hasBeenStarted = true;
		} else {
			if (sequence) {
				sequence.dispose();
				sequence = null;
			}
			Tone.Transport.pause();
			recorder.stop();
			// export the recorded audio as a WAV file
			recorder.exportWAV(function (blob) {
				// create a download link for the exported audio
				let downloadLink = document.getElementById("download-link");
				downloadLink.style.display = "inline-block";
				downloadLink.href = URL.createObjectURL(blob);
				downloadLink.download = "drumkit.wav";

				document.body.appendChild(downloadLink);
			});
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
		// Check if the user is dragging the seed marker
		if (draggingSeedMarker) {
			let el = evt.target;
			// Keep moving up the DOM tree until a step element is found
			while (el) {
				if (el.classList.contains("step")) {
					// Get the index of the step that the user is hovering over
					let stepIdx = +el.dataset.stepIdx;
					if (stepIdx > 0) {
						// Update the seed length if the step index is greater than 0
						state.seedLength = stepIdx;
						renderPattern();
					}
					break;
				}
				el = el.parentElement;
			}
		}
	});
	// updating density from slider
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
	// updating swing from slider
	document
		.querySelector("#swing")
		.addEventListener("input", (evt) => setSwing(+evt.target.value));
	// updating temperature from slider
	document
		.querySelector("#temperature")
		.addEventListener("input", (evt) => (temperature = +evt.target.value));
	// updating tempo from slider
	document
		.querySelector("#tempo")
		.addEventListener(
			"input",
			(evt) => (Tone.Transport.bpm.value = state.tempo = +evt.target.value)
		);
	// updating bar length
	document
		.querySelector("#bars")
		.addEventListener("input", (evt) => setBars(+evt.target.value));

	window.addEventListener("resize", repositionRegenerateButton);

	renderPattern();
	setDensityValue();

	document.querySelector(".progress").remove();
	document.querySelector(".app").style.display = null;
});
