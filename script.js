var $input_btn = $(".input-btn");
var $input_field = $(".input-field");
var $input_container = $(".input-container");
var $vraag_container = $(".vraag-container");
var $ans_container = $(".ans-container");
var $admin_container = $(".admin-container");
var $main_vraag = $(".main-vraag");
var $input_btn_vraag = $(".input-btn-vraag");
var $janee_btn = $(".janee-btn");
var $letter = $(".letter");
var $reload_b = $(".reload-btn");
var $round_select = $(".round-select");
var $custom_table = $(".custom-table");

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
                    } else if( user_input == "a".toUpperCase().replace(/\s/g, '')){
                    // } else if( user_input == "4dm1nm0d3".toUpperCase().replace(/\s/g, '')){
                        return admin_func();
                    }
                }
            }

        i1++;
        }
        alert("FOUTE CODE\nCheck je spelling en probeer opnieuw.");
        location.reload();

    });

    function check_code() {
            $searchInput.on('keypress', function (e) {
        if(e.which == 13) {
            window.location.assign(selectedFile);
        }
    });
    }

    function admin_func() {
        $input_container.css("opacity", "0");
        setTimeout(() => {
            $input_container.css("display", "none");
            $admin_container.css("display", "flex");
            setTimeout(() => {
                $admin_container.css("opacity", "1");
                let puzzle_array = among_puzzle["puzzle_type"];
                for (let i = 0; i < puzzle_array.length; i++) {
                    $round_select.append('<option value="'+i+'">'+puzzle_array[i]["name"]+' ronde:'+(i+1)+'</option>');
                }
                change_table();
                $round_select.on('change', function () {
                    change_table();
                });
                function change_table() {
                    $custom_table.empty();
                    $custom_table.append(`
                        <div class="custom-row main-row" class="custom-row">
                            <div class="custom-item">Letter / Positie</div>
                            <div class="custom-item">Code</div>
                            <div class="custom-item">Categorie</div>
                            <div class="custom-item">Vraag</div>
                            <div class="custom-item">Keuzes</div>
                            <div class="custom-item">Antwoord</div>
                        </div>`);
                    among_num = parseInt($round_select.val()) + 1;
                    if (among_num == 1) {
                        among_target = among_codes['test'];
                    }
                    else {
                        among_target = among_codes["r" + among_num];
                    }
                    woord_val = $round_select.val();
                    for (let i2 = 0; i2 < among_target.length; i2++) {
                        if (typeof among_target[i2]["keuzes"] !== 'undefined') {
                            among_target[i2]["keuzes2"] = "";
                            for (let index = 0; index < among_target[i2]["keuzes"].length; index++) {
                                among_target[i2]["keuzes2"] += among_target[i2]["keuzes"][index] + "<br>";
                            }
                        }
                        else {
                            among_target[i2]["keuzes2"] = "N.V.T.";
                        }
                        $custom_table.append(`
                            <div class="custom-row">
                                <div class="custom-item">${among_puzzle["puzzle_type"][woord_val]["name"].charAt(i2)}|${(i2+1)}</div>
                                <div class="custom-item">${among_target[i2]["code"]}</div>
                                <div class="custom-item">${among_target[i2]["func_name"]}</div>
                                <div class="custom-item">${among_target[i2]["info"]}</div>
                                <div class="custom-item">${among_target[i2]["keuzes2"]}</div>
                                <div class="custom-item">${among_target[i2]["ans"]}</div>
                            </div>`);
                    }
                }
            }, 100);
        }, 500);
    }

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
            if (vraag_ans.toUpperCase().replace(/\s/g, '') == question["ans"].toUpperCase().replace(/\s/g, '')){
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
                }, 100);
            }, 500);

        }   
    }

    $reload_b.click(function() {
        reload(false);
    });
    function reload(give_error) {
        if(give_error == true) {
            alert("FOUT ANTWOORD!!!\nDe pagina word herladen :)");
        }
        location.reload();
    }
});