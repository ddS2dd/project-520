/* index.html document ready */
const screen_list = [
    "synopsis",
    "question1",
    "question2",
    "question3",
    "question4",
    "question5",
    "question6",
    "question7",
    "question8",
    "question9",
    "question10",
    "question11",
    "question12",
    "question13",
    "question14",
    "question15",
    "question16",
    "final"
]
const answer_list = [
    "520522",
    "하울의 움직이는 성",
    "은행",
    "아이스크림",
    "용용선생",
    "이메일",
    "축제",
    "하양토끼 하루",
    "뉴진스의 하입보이요",
    "고슴도치",
    "막내",
    "우동가조쿠",
    "만찐두빵",
    "스테이오안",
    "4",
    "호랑이",
    "해리포터",
    "하은아 생일 축하하고 내가 만이 4랑해"
]

$(document).ready(function () {
    var current_idx = 0

    // BGM /////////////////////////////////////////////////////////////////////////
    var bgm; var bgm_on = false; var bgm_first_time = true;
    $("#bgm_button").click(function () {
        if (!bgm_on) {
            if (bgm_first_time) {
                bgm = new Audio("music/tsuki_sea.mp3");
                bgm_first_time = false;
            }
            bgm.play();
            bgm_on = true;

            $("#bgm_button").removeClass("bi-volume-up");
            $("#bgm_button").addClass("bi-volume-mute");
        } else {
            bgm.pause();
            bgm_on = false;

            $("#bgm_button").removeClass("bi-volume-mute");
            $("#bgm_button").addClass("bi-volume-up");
        }
    });
    ////////////////////////////////////////////////////////////////////////////////

    // Enter ///////////////////////////////////////////////////////////////////////
    function handleEnter() {
        var user_answer = $("#answer_input").val().replace(/ /g, "");
        $("#answer_input").val("");

        // Debug ///////////////////////////////////////////////////////////////////////
        const dbg_cmd = /^dbg=/;
        var dbg_result = user_answer.split(dbg_cmd);
        if (dbg_result.length > 1) {
            current_idx = Number(dbg_result[1]);

            showScreen(screen_list[current_idx]);
            return;
        }
        ////////////////////////////////////////////////////////////////////////////////

        if (checkEasterEgg(user_answer)) return;

        var real_answer = answer_list[current_idx].replace(/ /g, "");
        if ((user_answer != real_answer) && !checkAnotherAnswer(current_idx, user_answer)) {
            $("#answer_input").addClass("is-invalid");
            setTimeout(function () { $("#answer_input").removeClass("is-invalid"); }, 1000);
            return;
        }

        // final
        if (current_idx == 17) {
            $("#project_520").fadeOut("fast").promise().done(function () {
                $("#birthday_event").fadeIn();
            });
            return;
        }
        
        current_idx += 1;
        showScreen(screen_list[current_idx]);

        $("#main_screen").hide();
        $("#main_screen").fadeIn(2000);
    }
    $("#answer_input").on("keypress", function (key) {
        if (key.keyCode == 13) handleEnter();
    });
    $("#enter_button").click(handleEnter);
    ////////////////////////////////////////////////////////////////////////////////

    // Music ///////////////////////////////////////////////////////////////////////
    var check_bgm = false;
    var music_audio = new Audio("music/200_and.mp3");
    $("#music_button").click(function () {
        var musicModal = new bootstrap.Modal(document.getElementById("musicModal"));
        musicModal.show();

        if (bgm_on) {
            bgm.pause();
            bgm_on = false;
            check_bgm = true;
        }

        music_audio.play();
    });
    $("#musicModal").on('hidden.bs.modal', function () {
        music_audio.pause();
        music_audio.currentTime = 0;

        if (check_bgm) {
            bgm.play();
            bgm_on = true;
            check_bgm = false;
        }
    });
    ////////////////////////////////////////////////////////////////////////////////

    var typed_title = new Typed("#title", {
        strings: ["PROJECT: 520"],
        typeSpeed: 120,
        backSpeed: 120,
        loop: true,
        showCursor: false,
    });

    function showScreen(page) {
        src = "./screen/" + page + ".html";
        $("#main_screen").attr("src", src);
    }

    showScreen("synopsis");
});