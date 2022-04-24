let video;
let poseNet;
let pose;
let right = 0;
let wrong = 0;
let count = 0;
let head_rotation = false;
let quesBlockWid = 240;
let quesBlockHei = 120;
let ansBlockWid = 100;
let ansBlockHei = 50;
let quesTitleWid = 100;
let quesTitleHei = 30;
let seaLevelImage;
let buttonPlayAgain;
let buttonHowCanI;
let themeBlue = "#157EE4"
let btnGameStart;
let gameStart = false;

function preload() {
    seaLevelImage = loadImage('img/sealevel.png');
}


let quesArray = [
    {
        ques: {
            content:'Good morning! What’s for breakfast?'
        },
        ansOne: {
            status: 1,
            content:'Last night’s leftovers'
        },
        ansTwo: {
            status: 0,
            content:'Freshly cooked meal'
        },
    },
    {
        ques: {
            content:'Now choose your outfit of the day'
        },
        ansOne: {
            status: 0,
            content:'A synthetic fit'
        },
        ansTwo: {
            status: 1,
            content:'A thrifted fit'
        },
    },
    {
        ques: {
            content:'Time for a grocery restock. You make sure to grab -'
        },
        ansOne: {
            status: 1,
            content:'Your handy tote bag'
        },
        ansTwo: {
            status: 0,
            content:'Some old plastic bags'
        },
    },
    {
        ques: {
            content:'Groceries at Costco are cheap but it’s more than you need. You'
        },
        ansOne: {
            status: 0,
            content:'Decide to stay'
        },
        ansTwo: {
            status: 1,
            content:'Go somewhere else'
        },
    },
    {
        ques: {
            content:'Your friends just invited you out! You want to'
        },
        ansOne: {
            status: 0,
            content:'Drive yourself '
        },
        ansTwo: {
            status: 1,
            content:'Carpool'
        },
    },
    {
        ques: {
            content:'You arrive at your friend’s house, but they’re not ready yet. You'
        },
        ansOne: {
            status: 0,
            content:'Wait with the AC on'
        },
        ansTwo: {
            status: 1,
            content:'Park and power off'
        },
    },
    {
        ques: {
            content:'Time for lunch. What are you having?'
        },
        ansOne: {
            status: 1,
            content:'Salad'
        },
        ansTwo: {
            status: 0,
            content:'Burger and Fries'
        },
    },
    {
        ques: {
            content:'Your friends are planning a long road trip for vacation! You are-'
        },
        ansOne: {
            status: 1,
            content:'Down to ride!'
        },
        ansTwo: {
            status: 0,
            content:'Catching a flight'
        },
    },
    {
        ques: {
            content:'Time to head home. Yours is the one with-'
        },
        ansOne: {
            status: 1,
            content:'A cute front garden'
        },
        ansTwo: {
            status: 0,
            content:'A modern stone walkway'
        },
    },
    {
        ques: {
            content:'How are you ending the night?'
        },
        ansOne: {
            status: 1,
            content:'Stream a movie'
        },
        ansTwo: {
            status: 0,
            content:'Play some video games'
        },
    },

]


let quesWidth = 200;
let quesHeight = 100;

function setup() {
    createCanvas(640, 480);
    rectMode(CENTER);
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

    btnGameStart = createButton('Game Start')
    buttonPlayAgain = createButton('Play Again');
    buttonHowCanI = createButton('How Can I help?');
    btnGameStart.hide();
    buttonPlayAgain.hide();
    buttonHowCanI.hide();

}

function gotPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
    }
}
function modelLoaded() {
    console.log('poseNet ready');
}

function draw() {

    // push();
    // translate(width,0);
    // scale(-1, 1);
    // image(video, 0, 0, 640, 480);
    // pop();


    image(video, 0, 0);

    if (gameStart == false) {
        btnGameStart.show();
    }


    btnGameStart.position(240,210);

    btnGameStart.style('background-color', themeBlue);
    btnGameStart.style('color', '#FFFFFF');
    btnGameStart.style('width', '160px');
    btnGameStart.style('height', '30px');
    btnGameStart.style('border-radius', '10px');
    btnGameStart.mousePressed(gameStatus);


    noStroke();
    fill(0,0,0);
    textSize(16);
    text('No.', 40, 60, 40, 60);

    if (count<10) {
        text(count+1, 100, 60, 100, 60);
    } else {
        text(count, 100, 60, 100, 60);
    }
    text('/ 10', 140, 60, 140, 60);
    text('Right', 40, 100, 40, 100);
    text(right, 120, 100, 120, 100);
    text('Wrong', 40, 140, 40, 140);
    text(wrong, 140, 140, 140, 140);

    // noStroke();
    image(seaLevelImage,0,200-wrong*100,640,900);
    // rect(0, 480-wrong * 200, 640, wrong * 200);

    if (pose && gameStart) {

        if (pose.nose.x>300 && pose.nose.x<340) {
            head_rotation = true;
        }


        // for (i=0;i++;i<10) {
        //     if (count == i && head_rotation) {
        //         drawQA(quesArray[i]);
        //         checkTF(quesArray[i]);
        //     }
        // }

        if (count == 0 && head_rotation && wrong<6) {
            drawQA(quesArray[0]);
            checkTF(quesArray[0]);
        }

        if (count == 1 && head_rotation && wrong<6) {
            drawQA(quesArray[1]);
            checkTF(quesArray[1]);
        }

        if (count == 2 && head_rotation && wrong<6) {
            drawQA(quesArray[2]);
            checkTF(quesArray[2]);
        }

        if (count == 3 && head_rotation && wrong<6) {
            drawQA(quesArray[3]);
            checkTF(quesArray[3]);
        }

        if (count == 4 && head_rotation && wrong<6) {
            drawQA(quesArray[4]);
            checkTF(quesArray[4]);
        }

        if (count == 5 && head_rotation && wrong<6) {
            drawQA(quesArray[5]);
            checkTF(quesArray[5]);
        }

        if (count == 6 && head_rotation && wrong<6) {
            drawQA(quesArray[6]);
            checkTF(quesArray[6]);
        }

        if (count == 7 && head_rotation && wrong<6) {
            drawQA(quesArray[7]);
            checkTF(quesArray[7]);
        }

        if (count == 8 && head_rotation && wrong<6) {
            drawQA(quesArray[8]);
            checkTF(quesArray[8]);
        }

        if (count == 9 && head_rotation && wrong<6) {
            drawQA(quesArray[9]);
            checkTF(quesArray[9]);
        }

        if (count == 10 && wrong<6) {

            stroke("#157EE4");
        strokeWeight(3);
        fill(255);
        rect(320,200,240,240,20);
        fill(0);
        noStroke();
        textSize(36);
        text('You Win', 260, 140);
        textSize(16);
        text('Score:', 255, 180);
        text(right, 305, 180);
        text('/ 10', 320, 180);

        buttonPlayAgain.show();

        buttonPlayAgain.position(240,210);

        buttonPlayAgain.style('background-color', themeBlue);
        buttonPlayAgain.style('color', '#FFFFFF');
        buttonPlayAgain.style('width', '160px');
        buttonPlayAgain.style('height', '30px');
        buttonPlayAgain.style('border-radius', '10px');
        buttonPlayAgain.mousePressed(playAgain);
        
        // buttonPlayAgain.style("stroke-width", '10px');
        
        buttonHowCanI.show();
        buttonHowCanI.position(240,250);
        buttonHowCanI.style('background-color', themeBlue);
        buttonHowCanI.style('color', '#FFFFFF');
        buttonHowCanI.style('width', '160px');
        buttonHowCanI.style('height', '30px');
        buttonHowCanI.style('border-radius', '10px');
        buttonHowCanI.mousePressed(openLink);

        }

    }


    if (wrong >= 6) {
        stroke("#157EE4");
        strokeWeight(3);
        fill(255);
        rect(320,200,240,240,20);
        fill(0);
        noStroke();
        textSize(36);
        text('Game Over', 230, 140);
        textSize(16);
        text('Score:', 255, 180);
        text(right, 305, 180);
        text('/ 10', 320, 180);

        buttonPlayAgain.show();

        buttonPlayAgain.position(240,210);

        buttonPlayAgain.style('background-color', themeBlue);
        buttonPlayAgain.style('color', '#FFFFFF');
        buttonPlayAgain.style('width', '160px');
        buttonPlayAgain.style('height', '30px');
        buttonPlayAgain.style('border-radius', '10px');
        buttonPlayAgain.mousePressed(playAgain);
        
        // buttonPlayAgain.style("stroke-width", '10px');
        
        buttonHowCanI.show();
        buttonHowCanI.position(240,250);
        buttonHowCanI.style('background-color', themeBlue);
        buttonHowCanI.style('color', '#FFFFFF');
        buttonHowCanI.style('width', '160px');
        buttonHowCanI.style('height', '30px');
        buttonHowCanI.style('border-radius', '10px');
        buttonHowCanI.mousePressed(openLink);
    }

//     stroke(5);
// line(320,0,320,480);
}


function drawQA(i) {

    stroke("#157EE4");
    strokeWeight(3);

    fill(255,255,255);
    rect(pose.nose.x, pose.nose.y - quesBlockHei -50, quesBlockWid, quesBlockHei,10);

    rect(pose.nose.x - 60, pose.nose.y - ansBlockHei / 2 - 80, ansBlockWid, ansBlockHei,100);

    rect(pose.nose.x + 60, pose.nose.y - ansBlockHei / 2 - 80, ansBlockWid, ansBlockHei,100);

    rect(pose.nose.x, pose.nose.y - quesTitleHei / 2 - 210, quesTitleWid, quesTitleHei,10);

    noStroke();
    fill(0);
    textSize(18);

    if (count < 10) {
        text(count+1,pose.nose.x - 24, pose.nose.y - quesTitleHei / 2 - 205)
    } else {
        text(count,pose.nose.x - 24, pose.nose.y - quesTitleHei / 2 - 205)
    }

    text("/ 10",pose.nose.x -5, pose.nose.y - quesTitleHei / 2 - 205)

    textSize(16);
    text(i.ques.content,pose.nose.x, pose.nose.y - quesBlockHei -50, 200, 60)

    textSize(12);
    text(i.ansOne.content,pose.nose.x - 50, pose.nose.y - ansBlockHei / 2 - 60, 80,65 )
    text(i.ansTwo.content,pose.nose.x + 70, pose.nose.y - ansBlockHei / 2 - 60, 80,65 )
}

function checkTF(i) {
    if (pose.nose.x < 200) {
        if (i.ansOne.status == 1) {
            right += 1;
            fill(100);
            i.ansOne.status = 2;
        } else if (i.ansOne.status == 0) {
            wrong += 1;
            i.ansOne.status = 2;
        }
        count += 1;
        head_rotation = false;
    }
    else if (pose.nose.x > 400) {
        if (i.ansTwo.status == 1) {
            right += 1;
            i.ansTwo.status = 2;
        } else if (i.ansTwo.status == 0) {
            wrong += 1;
            i.ansTwo.status = 2;
        }
        count += 1;
        head_rotation = false;
    }
}

function playAgain() {
    window.open("./index.html","_self");
}

function openLink() {
    window.open("https://oceanservice.noaa.gov/hazards/sealevelrise/sealevelrise-tech-report.html");
}

function gameStatus() {
    gameStart = true;
    btnGameStart.hide();
}