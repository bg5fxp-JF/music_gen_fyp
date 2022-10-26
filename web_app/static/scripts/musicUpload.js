function handleFiles(event) {
	var files = event.target.files;
	$("#src").attr("src", URL.createObjectURL(files[0]));
	document.getElementById("audio").load();
	let blobaudioFile = $("#src").attr("src");

	//let audioFile = new File();

	// audioFile.src = blobaudioFile;

	console.log(blobaudioFile);
	$.ajax({
		url: "/test",
		type: "POST",
		data: blobaudioFile,
	});
}

document
	.getElementById("formFile")
	.addEventListener("change", handleFiles, false);

// const spawner = require("child_process").spawn;

// const path = require("path");
// var dirname = path.dirname(
// 	"/Users/bg5fxp_jf/Documents/music_gen_fyp/web_app/scripts/convertWav2.py"
// );
// var filename = path.basename(
// 	"/Users/bg5fxp_jf/Documents/music_gen_fyp/web_app/scripts/convertWav2.py"
// );

// const data_to_pass_in =
// 	"https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav";

// console.log("Data sent:", data_to_pass_in);

// const python_procsess = spawner("python3", [
// 	dirname + "/" + filename,
// 	data_to_pass_in,
// ]);

// python_procsess.stdout.on("data", (data) => {
// 	console.log("Data received from python", data.toString());
// });
