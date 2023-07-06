import './app.css'
import { useState } from 'react';
import Icons from './components/icons/Icons';
import IconSun from './components/icons/icon/IconSun';
import IconMoon from './components/icons/icon/IconMoon';

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

    console.log(icons)


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


    return(
        <div className="app">
            <div className="calculator">
                <Icons 
                    icons={ icons }
                    updateColorActive={ updateColorActive }
                />
            </div>
        </div>
    ) 
}

export default App;