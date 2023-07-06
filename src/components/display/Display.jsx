import './display.css'
import DisplayInput from "./DisplayInput"
import DisplayOutput from "./DisplayOutput"

const Display = (props) => {

    const { displayInput, displayOutput } = props

    return (
        <div className="display">
            <div className="content">
                <DisplayInput operation={ displayInput } />
                <DisplayOutput result={ displayOutput } />
            </div>
        </div>
    )

}

export default Display