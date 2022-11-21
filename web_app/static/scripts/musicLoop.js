// var playBtn = document.getElementById("playBtn");

// let audio = new Audio();
// // Once the user loads a file in the fileinput, the file should be loaded into waveform
// audio.src = localStorage.getItem("recent-fileVal");
// wavesurfer.load(audio);
// document.getElementById("formFile").addEventListener(
// 	"change",
// 	function (e) {
// 		var file = this.files[0];
// 		localStorage.setItem("recent-fileVal", URL.createObjectURL(file));
// 		audio.src = localStorage.getItem("recent-fileVal");
// 		console.log(audio.src);
// 		// Load the blob into Wavesurfer
// 		wavesurfer.load(audio);

// 		// if (file) {
// 		// 	var reader = new FileReader();

// 		// 	// reader.addEventListener("load", () => {
// 		// 	// 	localStorage.setItem("recent-fileVal", reader.result);
// 		// 	// });
// 		// 	reader.onload = function (evt) {
// 		// 		// Create a Blob providing as first argument a typed array with the file buffer
// 		// 		var blob = new window.Blob([new Uint8Array(evt.target.result)]);
// 		// 		localStorage.setItem("recent-fileVal", URL.createObjectURL(file));
// 		// 		audio.src = localStorage.getItem("recent-fileVal");

// 		// 		// Load the blob into Wavesurfer
// 		// 		wavesurfer.load(audio);
// 		// 	};

// 		// 	reader.onerror = function (evt) {
// 		// 		console.error("An error ocurred reading the file: ", evt);
// 		// 	};

// 		// 	// Read File as an ArrayBuffer
// 		// 	reader.readAsArrayBuffer(file);
// 		// }
// 	},
// 	false
// );

// playBtn.onclick = function () {
// 	wavesurfer.playPause();
// 	if (playBtn.src.includes("play.png")) {
// 		playBtn.src = "../static/images/pause.png";
// 	} else {
// 		playBtn.src = "../static/images/play.png";
// 	}
// };

// wavesurfer.on("finish", function () {
// 	playBtn.src = "../static/images/play.png";
// 	wavesurfer.stop();
// });
