function handleFiles(event) {
	var files = event.target.files;
	$("#src").attr("src", URL.createObjectURL(files[0]));
	document.getElementById("audio").load();
	let blobaudioFile = $("#src").attr("src");

	let audioFile = new File();

	// audioFile.src = blobaudioFile;

	console.log(blobaudioFile);
	console.log(audioFile);
}

document
	.getElementById("formFile")
	.addEventListener("change", handleFiles, false);

// const spawner = require("child_process").spawn;

// const path = require("path");
// var dirname = path.dirname(
// 	"/Users/bg5fxp_jf/Documents/music_gen_fyp/env/web_app/scripts/convertWav.py"
// );
// var filename = path.basename(
// 	"/Users/bg5fxp_jf/Documents/music_gen_fyp/env/web_app/scripts/convertWav.py"
// );

// const data_to_pass_in = "send this to python";

// console.log("Data sent:", data_to_pass_in);

// const python_procsess = spawner("python3", [
// 	dirname + "/" + filename,
// 	data_to_pass_in,
// ]);

// python_procsess.stdout.on("data", (data) => {
// 	console.log("Data received from python", data.toString());
// });
