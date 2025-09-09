var $input_btn = $(".input-btn");
var $input_field = $(".input-field");
var $input_container = $(".input-container");
var $vraag_container = $(".vraag-container");
var $ans_container = $(".ans-container");
var $main_vraag = $(".main-vraag");
var $input_btn_vraag = $(".input-btn-vraag");
var $janee_btn = $(".janee-btn");
var $letter = $(".letter");
var $reload_b = $(".reload-btn");

$(document).ready(function() {
    console.table(among_codes);
    $input_btn.on('click', function () {
        i1=0;
        user_input = $input_field.val().toUpperCase().replace(/\s/g, '');
        for (let key in among_codes) {
            if (among_codes.hasOwnProperty(key)) {
                let array = among_codes[key];
                for (let i = 0; i < array.length; i++) {
                    if( array[i]["code"].toUpperCase().replace(/\s/g, '') == user_input){
                        return show_vraag(array[i], i, i1);
                    } else if( user_input == "4dm1nm0d3".toUpperCase().replace(/\s/g, '')){
                        return admin_func();
                    }
                }
            }

        i1++;
        }
        alert("FOUTE CODE\nCheck je spelling en probeer opnieuw.");
    });


    function show_vraag(question, ronde_num, ronde_name_num) {
        $input_container.css("opacity", "0");
        setTimeout(() => {
            $input_container.css("display", "none");
            $vraag_container.css("display", "flex");
            setTimeout(() => {
                $vraag_container.css("opacity", "1");
                vraag_func(question, ronde_num, ronde_name_num);
            }, 100);
        }, 500);
    }

    function vraag_func(question, ronde_num, ronde_name_num){
        console.log(question["func_name"]);
        $main_vraag.html(question["info"]);
        $(`.vraag-${question["func_name"]}`).css("display", "flex");

        if (question["func_name"] == "keuze") {
            for (let index = 0; index < 4; index++) {
                $(".vraag-keuze").find(`[data-keuze='${index}']`).html(question["keuzes"][index]);
            }
        }

        $(".keuze-btn").on('click', function() {
            keuze_ans = $(this).attr("data-keuze");
            if (keuze_ans == question["ans"]) {
                show_letter();
            } else {
                reload(true);
            }
        });

        $input_btn_vraag.on('click', function() {
            vraag_ans = $(`.input-${question["func_name"]}`).val();
            if (vraag_ans == question["ans"]) {
                show_letter();
            } else {
                reload(true);
            }
        });

        $janee_btn.on('click', function() {
            keuze_ans = $(this).attr("data-keuze");
            if (keuze_ans == question["ans"]) {
                show_letter();
            } else {
                reload(true);
            }
        });

        function show_letter() {
            $vraag_container.css("opacity", "0");
            setTimeout(() => {
                $vraag_container.css("display", "none");
                $ans_container.css("display", "flex");
                setTimeout(() => {
                    $ans_container.css("opacity", "1");
                    $letter.html("Je letter is "+among_puzzle["puzzle_type"][ronde_name_num]["name"].charAt(ronde_num).toUpperCase()+".<br>Op plek "+(ronde_num+1)+ '.<br><img height="200px" src="img/amogus.png">');
                    $reload_b.show();
                    $reload_b.click(function() {
                        reload(false);
                    });
                }, 100);
            }, 500);

        }

        function reload(give_error) {
            if(give_error == true) {
            alert("FOUT ANTWOORD!!!\nDe pagina word herladen :)");
            }
            location.reload();
        }
        
    }
});