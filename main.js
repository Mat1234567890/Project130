song = "";
song2 = "";
song1_status = "";
song2_status = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload(){
song = loadSound("music.mp3");
song2 = loadSound("music2.mp3");
}
function setup(){
canvas = createCanvas(600,500);
canvas.center();
video = createCapture(VIDEO);
video.hide()
poseNet = ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}
function modelLoaded(){
console.log("Model Loaded!");
}
function gotPoses(results){
if (results.length > 0){
console.log(results);
scoreLeftWrist = results[0].pose.keypoints[9].score;
console.log("Left wrist score: " + scoreLeftWrist);
scoreRightWrist = results[0].pose.keypoints[10].score;
console.log("Right wrist score: " + scoreRightWrist);
leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;
console.log("Left wrist x: " + leftWristX + " Left wrist y: " + leftWristY);
rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rightWrist.y;
console.log("Right wrist x: " + rightWristX + " Right wrist y: " + rightWristY);
}
}
function draw(){
image(video,0,0,600,500);
song1_status = song.isPlaying();
song2_status = song2.isPlaying();
fill("#0068FF");
stroke("#0068FF");
if (scoreLeftWrist > 0.2){
circle(leftWristX,leftWristY,20);
song.stop();
if (song2_status == false){
song2.play();
document.getElementById("song_name").innerHTML = "Playing - Peter Pan Song"
}
}
if (scoreRightWrist > 0.2){
    circle(rightWristX,rightWristY,20);
    song2.stop();
    if (song1_status == false){
    song.play();
    document.getElementById("song_name").innerHTML = "Playing - Harry Potter Song";
    }
}
}
