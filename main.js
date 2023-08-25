song = "";
function preload (){
    song = loadSound ("music.mp3");
}

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

function setup(){
    canvas = createCanvas (600 , 500);
    canvas.center ();

    video = createCapture (VIDEO);
    video.hide ();

    poseNet = nl5.poseNet (video , modelLoaded);
    poseNet.on ('pose' , gotPoses);

}

function modelLoaded(){
    console.log ('poseNet inicialized.');
}

function draw(){
    image (video , 0 , 0 , 600 , 500);
    fill ('#ff000');
    stroke ('#ff000');

    if (scoreLeftWrist > 0.2)
    {
    circle (leftWristX , leftWristY , 20);
    InNumberleftWristY = Number (leftWristY);
    remove_decimals = flore (InNumberleftWristY);
    volume = remove_decimals / 500;
    document.getElementById ('volume').innerHTML = "volume =" + volume;
    song.setVolume (volume);
}

function play(){
    song.play ();
    song.setVolume (1);
    song.rate ();
}

function gotPoses(results){
    if (results.lenght > 0){

    console.log (results);
    scoreRightWrist = results [0].pose.keypoints [10].score;
    scoreLeftWrist = results [0].pose.keypoints [9].score;
    console.log ("socreRightWrist = " + scoreRightWrist + "scoreLeftWrist" + scoreLeftWrist);
    
    rightWristX = results [0].rightWrist.x;
    rightWristY = results [0].rightWrist.y;
    console.log ("rightWristX = " + rightWristX + "rightWristY" + rightWristY);

    leftWristX = results [0].leftWrist.x;
    leftWristY = results [0].leftWrist.y;
    console.log ("leftWristX = " + leftWristX + "leftWristY" + leftWristY);
}
