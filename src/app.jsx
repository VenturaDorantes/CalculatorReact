import './app.css'
import { useState } from 'react';
import Icons from './components/icons/Icons';
import IconSun from './components/icons/icon/IconSun';
import IconMoon from './components/icons/icon/IconMoon';
import Display from './components/display/Display';
import Keys from './keys.json'
import Key from './components/key/Key'

export function App() {

    var pageColor = localStorage.getItem('pageColor')
    var boolSun, boolMoon;
    if (pageColor == ''){
        boolSun = false
        boolMoon = true
    } else if (pageColor == 'sun') {
        boolSun = true
        boolMoon = false
    } else if (pageColor == 'moon'){
        boolSun = false
        boolMoon = true
    }

    const[icons, setIcons] = useState(
        [
            {   
                name: 'sun',
                content: <IconSun />,
                active: boolSun
            },
            {
                name: 'moon',
                content: <IconMoon />,
                active: boolMoon
            }
        ]
    )

    const [keys, setKey] = useState(Keys.keys)

    const $styleColor = document.documentElement.style
    if(icons[0].active == true) {
        $styleColor.setProperty('--bg-black', 'white');
        $styleColor.setProperty('--bd-keys', '#E9ECEF');
        $styleColor.setProperty('--txt-white', 'black');
        $styleColor.setProperty('--btn-shadow', '#00000033');
        $styleColor.setProperty('--bd-btnIconActive', '#000000');
    } else if(icons[1].active == true){
        $styleColor.setProperty('--bg-black', '#22252D');
        $styleColor.setProperty('--bd-keys', '#292d36');
        $styleColor.setProperty('--txt-white', 'white');
        $styleColor.setProperty('--btn-shadow', '#ffffff33');
        $styleColor.setProperty('--bd-btnIconActive', '#ffffff');
        localStorage.setItem('pageColor', 'moon');
    }

    const updateColorActive = (nameIcon) => {
        
        const updateActive = icons.map((icon) => {
                if (icon.name === nameIcon){
                    icon.active = true
                } else {
                    icon.active = false
                }
                return icon
            }
        ) 

        setIcons(updateActive)
        localStorage.setItem('pageColor', nameIcon)
    }

    const [ input, setInput ] = useState('')
    const [ displayInput, setDisplayInput ] = useState('')
    const [ displayOutput, setDisplayOutput ] = useState('')

    const functionKey = (nameKey) => {

        switch(nameKey){
            case 'clear':
                setInput('')
                setDisplayInput('')
                setDisplayOutput('')
                break
            case 'backspace':
                setInput(input.slice(0, -1))
                setDisplayInput(cleanInput(input.slice(0, -1)))
                break
            case '=':
                let result;
                try {
                    result=eval(perpareInput(input))
                } catch(error) {
                    setDisplayInput('')
                    setDisplayOutput('Syntax Error')
                }
                setDisplayOutput(cleanOutput(result))
                break
            case 'brackets':
                let inputBracket
                if (input.indexOf('(') == -1 || 
                    input.indexOf(')') != -1 && 
                    input.indexOf(')') != -1 && 
                    input.lastIndexOf('(') < input.lastIndexOf(')')) {
                    setInput(input + '(')
                    inputBracket = input + '('
                } else if (input.indexOf('(') != -1 && 
                            input.indexOf(')') == -1 ||
                            input.indexOf('(') != -1 &&
                            input.indexOf(')') != -1 &&
                            input.lastIndexOf('(') > input.lastIndexOf(')')
                ) {
                    setInput(input + ')')
                    inputBracket = input + ')'
                }
                setDisplayInput(cleanInput(inputBracket))
                break
            default:
                if (validateInput(nameKey)){
                    setInput(input + nameKey)
                    setDisplayInput(cleanInput(input + nameKey))
                }
                break
        }
    }

    const cleanInput = (inputValue) => {
        let input_array = inputValue.split('');
        let input_array_length = input_array.length;

        // Cambiando agregando un span en caso de precionar un boton del operador
        for (let i = 0; i < input_array_length; i++) {
        if (input_array[i] == '*') {
            input_array[i] = ' <span class="operator">x</span> ';
        } else if (input_array[i] == '/') {
            input_array[i] = ' <span class="operator">÷</span> ';
        } else if (input_array[i] == '+') {
            input_array[i] = ' <span class="operator">+</span> ';
        } else if (input_array[i] == '-') {
            input_array[i] = ' <span class="operator">-</span> ';
        } else if (input_array[i] == '(') {
            input_array[i] = ' <span class="bracket">(</span> ';
        } else if (input_array[i] == ')') {
            input_array[i] = ' <span class="brecket">)</span> ';
        } else if (input_array[i] == '%') {
            input_array[i] == ' <span class="percent">%</span> ';
        }
    }
        return input_array.join('') 
        return <>{input}</>
    }

    const cleanOutput = (output) => {
        let output_string = output.toString();
        let decimal = output_string.split('.')[1];
        output_string = output_string.split('.')[0];

        let output_array = output_string.split('');

        if(output_array.length > 3) {
            if (!(output_array[0] == '-' && output_array.length === 4)) {
                for (let i = output_array.length - 3; i > 0; i -= 3) {
                    output_array.splice(i, 0, ',');
                }
            } 
        }

        if(decimal) {
            output_array.push('.');
            output_array.push(decimal);
        }

        return output_array.join('')
    }

    // funcion para no poder agregar puntos y operadores despues de otro
    const validateInput = (value) => {
        let last_input = input.slice(-1);
        let operators = ['+', '-', '*', '/'];

        if(value == '.' && last_input == '.') {
            return false
        } 

        if(value == '%' && last_input == '%' ) {
            return false
        } 

        if(operators.includes(value)) {
            return operators.includes(last_input) ? false : true
        }
        
        return true;
    }

    const perpareInput = (inputValue) => {
        let input_array = input.split('');
        let operator = ['*', '+', '-', '/']; 

        if (input_array.includes('%')){

            for (let i = 0; i < input_array.length; i++) {
                if(input_array[i] === '%'){
                    input_array[i] = "/100"
                }
            }
        
            for (let i = input_array.length; i > 0; i--) {
       
                for (let j = 0; j < operator.length; j++){
    
                    if(input_array[i] === operator[j]){
                        const getOperator = input_array[i];
                        if(getOperator == '*'){
                            return input_array.join('')
                        } else {
                            console.log(getOperator)
                            const getNumberPercent = input_array.splice(i + 1)
                            const getOperationPercent = input_array.slice(0, i);
        
                            const operationPercent = eval(getOperationPercent.join(''))
                            const numberPercent = eval(getNumberPercent.join(''))
        
                            const resultOperation = operationPercent * numberPercent;
        
                            const resultFinally = eval(operationPercent + getOperator + resultOperation)
                            console.log('operation', operationPercent + getOperator + resultOperation)
                            console.log('resultFinally', resultFinally)
                            return resultFinally
                        }
                        
                    }
                }
            }
        }
     
        return input_array.join('')
    }

    return(
        <div className="app">
            <div className="calculator">
                <Icons 
                    icons={ icons }
                    updateColorActive={ updateColorActive }
                />
                <Display 
                    displayInput={ displayInput }
                    displayOutput={ displayOutput }
                />
                <Key 
                    data={ keys }
                    functionKey={ functionKey }
                />
            </div>
        </div>
    ) 
}

export default App;