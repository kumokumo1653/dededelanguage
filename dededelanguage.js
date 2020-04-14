let sourceRaw = decode("+++++++++[>++++++++<-]>.<+++++++++[>+++<-]>++.+++++++..+++.<+++++++++[>--------<-]>-------.<+++++++++[>+++++++<-]>+++++.+.-.+.-.+.<+++++++++[>-<-]>-----.<+++++++++[>++<-]>++++++.+++.------.--------.");
//let sourceRaw = "て゛て゛て゛て゛て゛て゛て゛て゛て゛ﾃ゛デて゛て゛て゛て゛て゛て゛て゛て゛デて゛て゛て゛て゛て゛て゛て゛て゛て゛て゛て゛デて゛て゛て゛て゛デて゛て゛て゛て゛て゛て゛て゛て゛て゛て゛て゛ででででテ゛ﾃ”デて”デて゛て゛て”て゛て゛て゛て゛て ゛て゛て゛て”て”て゛て゛て゛て”デテ゛テ゛テ゛テ゛て”ででて゛て゛て゛て゛て゛て゛て゛て゛て”デて゛て゛て゛て゛て゛て゛て”テ゛テ゛テ゛テ゛テ゛て”て゛て゛て゛て゛て゛て”テ゛テ゛テ゛テ゛テ゛て”て゛て゛て゛て゛て゛て”でテ゛テ゛テ゛テ゛て” デデデテ゛テ゛て”ででテ゛テ゛テ゛テ゛テ゛テ゛テ゛て”デデて゛て゛て゛て”ででででて゛て゛て゛て゛て゛て゛て゛て゛て゛て゛て”";
let source = Array.from(sourceRaw);
let compile = new Array();
//コンパイル
compiler();
//ポインタの初期化
let pointer = new Array(1000);
pointer.fill(0);
//入出力領域
let input = "".split("");
let output = new Array();
//インタプリタ
interpreter();
run();
function compiler(){
    for(let i = 0;i < source.length;i++){
        switch(source[i]){
            case 'デ':
                compile.push('>');
                break;
            case 'で':
                compile.push('<');
                break;
            case 'テ':
                if(source[i + 1] == '゛')
                    compile.push('-');
                else if(source[i + 1] == '”')
                    compile.push(',');
                break;
            case 'て':
                if(source[i + 1] == '゛')
                    compile.push('+');
                else if(source[i + 1] == '”')
                    compile.push('.');
                break;
            case 'ﾃ':
                if(source[i + 1] == '゛')
                    compile.push('[');
                else if(source[i + 1] == '”')
                    compile.push(']');
                break;
            default:
                break;
        }
    }
}

function interpreter(){
    let pointerNum = 0;
    for(i = 0;i < compile.length;i++){
        switch(compile[i]){
            case '>':
                pointerNum++;
                break;
            case '<':
                pointerNum--;
                break;
            case '+':
                pointer[pointerNum]++;
                break;
            case '-':
                pointer[pointerNum]--;
                break;
            case '.':
                output.push(pointer[pointerNum]);
                break;
            case ',':
                pointer[pointerNum] = input.shift();
                break;
            case '[':
                if(pointer[pointerNum] == 0){
                    //"]"を見つける
                    let finishPointer;
                    for(let j = i;j < compile.length;j++){
                        if(compile[j] == ']'){
                            finishPointer = j;
                            break;
                        }
                    }
                    i = finishPointer;
                }
                break;
            case ']':
                if(pointer[pointerNum] != 0){
                    //"["を見つける
                    let beginPointer;
                    for(let j = i; j >= 0; j--){
                        if(compile[j] == '['){
                            beginPointer = j;
                            break;
                        }
                    }
                    i = beginPointer;
                }
                break;
            default:
                break;
        }
    }
}
function run(){
    let outputString = "";
    output.forEach(function(value){
        outputString += String.fromCharCode(value); 
    });
    console.log(outputString);
}

function decode(dataRaw){
    let decode = "";
    let deta = Array.from(dataRaw);
    deta.forEach(function(value){
        switch(value){
            case '>':
              decode += 'デ';
              break;
            case '<':
                decode += 'で';
                break;
            case '+':
                decode += 'て゛';
                break;
            case '-':
                decode += 'テ゛';
                break;
            case '.':
                decode += 'て”';
                break;
            case ',':
                decode += 'テ”';
                break;
            case '[':
                decode += 'ﾃ゛';
                break;
            case ']':
                decode += 'ﾃ”';
                break;
            default:
                break;
        }
    });
    console.log(decode);
    return decode;
}