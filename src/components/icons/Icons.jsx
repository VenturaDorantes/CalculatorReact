import './icons.css'
import BtnIcons from './BtnIcons'

const Icons = (props) => {

    const { icons, updateColorActive } = props

    return (
        <div className="icons" >
            { icons.map( (icon, i) => {
                return (
                    <BtnIcons
                        key = { i }
                        name={ icon.name }
                        content={ icon.content }
                        activate={ icon.active }
                        updateColorActive={ updateColorActive }
                    />
                )
            }) }
        </div>
    )
}

export default Icons;