import './display.css'
import DisplayInput from "./DisplayInput"
import DisplayOutput from "./DisplayOutput"

const Display = () => {

    const operation =  <>5 <span className="operator">x</span> 5</> 
    const result = '25'

    return (
        <div className="display">
            <div className="content">
                <DisplayInput operation={ operation } />
                <DisplayOutput result={ result } />
            </div>
        </div>
    )

}

export default Display