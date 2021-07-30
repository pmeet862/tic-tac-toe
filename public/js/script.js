//global varibales

let turn = 1;
let val_x = [];
let val_o = [];
let won = false;
let condition = [["one", "two", "three"], ["four", "five", "six"], ["seven", "eight", "nine"], ["one", "four", "seven"], ["two", "five", "eight"], ["three", "six", "nine"], ["one", "five", "nine"], ["three", "five", "seven"]];
// let empty_moves = [];


async function isBotWin() {
    let moves = document.getElementsByClassName("num");
    let empty_moves = [];
    for (let i = 0; i < moves.length; i++) {

        if (!moves[i].value) {
            empty_moves.push(moves[i].id);

        }
    }
    let win = true;
    let moveToSet = "";

    for (i in empty_moves) {
        let temp = [...val_o, empty_moves[i]];
        // console.log("temp", temp);
        for (j in condition) {
            let temp_1 = condition[j];
            win = true;
            for (k in temp_1) {
                if (!temp.includes(temp_1[k])) {

                    win = false;
                    break;
                }
            }
            if (win) {
                moveToSet = empty_moves[i];
                break;
            }
        }
        if (win)
            break;
    }

    if (win) {
        console.log("win", moveToSet);
        document.getElementById(moveToSet).innerText = "O"
        document.getElementById(moveToSet).value = "O"
        turn += 1;
        getValue("O", document.getElementById(moveToSet));

        return true;
    } else {
        return false;
    }
}


function userClick(e) {
    if (!document.getElementById(e.id).value && !won) {
        let symbol = turn % 2 != 0 ? "X" : "O";

        const id = e.id;
        document.getElementById(id).value = symbol;
        document.getElementById(id).innerText = symbol;
        turn += 1;
        getValue(symbol, e);
        if (!won && turn < 9) { bot_move(); }
    }

}




function getValue(symbol, e) {
    let user_match;
    if (symbol == "X") {
        val_x.push(e.id);
        user_match = val_x;
    }


    else {
        console.log("id", e);
        val_o.push(e.id);
        user_match = val_o;
    }
    // console.log("x=", val_x);
    // console.log("o=", val_o);
    let win_condition = [];
    let winner = true;

    for (i in condition) {
        let temp = condition[i];
        winner = true;
        for (j in temp) {
            if (!user_match.includes(temp[j])) {
                winner = false;
                break;
            }
        }
        if (winner) {
            won = true;
            // console.log(win_condition);

            win_condition = condition[i];
            // console.log(win_condition);
            break;
        }

    }
    // console.log("=>>", user_match, win_condition);
    if (winner) {
        // if (empty_moves != null) {


        for (i in win_condition) {
            // console.log(win_condition);
            let a = document.getElementById(win_condition[i]);
            a.classList.add("btn");
        }

        document.getElementById("output").innerHTML = symbol == "X" ? "Player 1 won" : "player 2 won";
        document.getElementById("display").style.display = "block";
        // }
        // else {
        // document.getElementById("output").innerHTML = "Draw";
        // document.getElementById("display").style.display = "block";


        // }
    }
    else if (turn > 9) {
        document.getElementById("output").innerHTML = "Draw";
        document.getElementById("display").style.display = "block";
    }






}
async function bot_move() {

    let isBotWinStat = await isBotWin();

    if (!isBotWinStat) {
        let moves = document.getElementsByClassName("num");
        let empty_moves = [];
        for (let i = 0; i < moves.length; i++) {
            // console.log("moves", moves[i].id);
            if (!moves[i].value) {
                empty_moves.push(moves[i].id);

            }
        }
        // console.log("emptymoves", empty_moves, val_x);
        if (val_x.length == 1) {
            let empty_moves_length = empty_moves.length;
            let randomNum = Math.floor(
                Math.random() * (empty_moves_length - 0) + 0);

            let firstMoves = {
                "one": ["five"],
                "two": ["five"],
                "three": ["five"],
                "four": ["five"],
                "five": ["one", "three", "seven", "nine"],
                "six": ["five"],
                "seven": ["five"],
                "eight": ["five"],
                "nine": ["five"]
            };
            let moveToTake = firstMoves[val_x[0]];
            console.log("first move", moveToTake);
            if (moveToTake) {
                // console.log(moveToTake[Math.floor(
                // Math.random() * (moveToTake.length - 0) + 0)]);
                randomNum = moveToTake[Math.floor(
                    Math.random() * (moveToTake.length - 0) + 0)];
                document.getElementById(randomNum).innerText = "O"
                document.getElementById(randomNum).value = "O"
                console.log("empty", randomNum);
                getValue("O", document.getElementById(randomNum));
            }
            else {
                document.getElementById(empty_moves[randomNum]).innerText = "O"
                document.getElementById(empty_moves[randomNum]).value = "O"
                console.log("empty", empty_moves[randomNum]);
                getValue("O", document.getElementById(empty_moves[randomNum]));
            }
            // userClick(document.getElementById(empty_moves[randomNum]));

            // console.log("empty", empty_moves[randomNum]);


        }
        else {
            let win = true;
            let moveToSet = "";
            for (i in empty_moves) {
                let temp = [...val_x, empty_moves[i]];
                // console.log("temp", temp);
                for (j in condition) {
                    let temp_1 = condition[j];
                    win = true;
                    for (k in temp_1) {
                        if (!temp.includes(temp_1[k])) {

                            win = false;
                            break;
                        }
                    }
                    if (win) {
                        moveToSet = empty_moves[i];
                        break;
                    }
                }
                if (win)
                    break;
            }
            if (win) {
                // console.log("move", moveToSet);
                document.getElementById(moveToSet).innerText = "O"
                document.getElementById(moveToSet).value = "O"
                // console.log("=>?>>", moveToSet);
                // console.log("movetoset", document.getElementById(moveToSet));
                getValue("O", document.getElementById(moveToSet));

            }
            else {
                let empty_moves_length = empty_moves.length;
                let randomNum = Math.floor(
                    Math.random() * (empty_moves_length - 0) + 0);
                console.log("random", randomNum);
                document.getElementById(empty_moves[randomNum]).innerText = "O"
                document.getElementById(empty_moves[randomNum]).value = "O"
                turn += 1;
                console.log("empty1", document.getElementById(empty_moves[randomNum]).id);
                getValue("O", document.getElementById(empty_moves[randomNum]));
                return true;
            }

        }
        // if (val_o.length <= 2) {

        // }
        turn += 1;
        console.log("turn", turn);
    }


}














