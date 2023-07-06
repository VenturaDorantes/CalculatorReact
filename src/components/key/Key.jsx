import './key.css'
import KeyBottom from "./KeyButton"

const Key = (props) => {

    const { data } = props

    return (
        <div className="keys">
            { data.map((btn, i) => 
                <KeyBottom 
                    dataKey={ btn.dataKey } 
                    cssClass={ btn.class } 
                    spanText={ btn.spanText }
                    key={ i }
                />
            )}
        </div>
    )
}

export default Key