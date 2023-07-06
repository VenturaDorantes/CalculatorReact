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
    const [ displayInput, setDisplayInput ] = useState('5 <span class="operator">+</span> 5')
    const [ displayOutput, setDisplayOutput ] = useState('25')

    const functionKey = (nameKey) => {

        switch(nameKey){
            case 'clear':
                setInput('')
                setDisplayInput('')
                setDisplayOutput('')
                break
            case '':
                break
            default:
                if (validateInput(nameKey)){
                    setInput(input + nameKey)
                    setDisplayInput(cleanInput(input + nameKey))
                }
                break
        }
    }

    const cleanInput = (input) => {
        let input_array = input.split('');
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