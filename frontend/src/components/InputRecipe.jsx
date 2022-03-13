import React from "react"

const InputRecipe = (props) => {
    const [urls, setUrls] = React.useState({});

    function onChange(e) {
        setUrls({
            ...urls,
            [e.target.name]: e.target.value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(urls) {
            props.addRecipeToProps(urls);
            setUrls({})
        } else {
            alert("Input recipe")
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className='container'>
                <div className='row'>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Add recipe..."
                        value={urls.url1 || ''} 
                        name="url1"          
                        onChange={onChange}
                        style={{width: "50%", margin: "0.1%"}}
                    />
                </div>
                <div className='row'>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Add recipe..."
                        value={urls.url2 || ''}
                        name="url2"          
                        onChange={onChange}
                        style={{width: "50%", margin: "0.1%"}}
                    />
                </div>
            </div>
            <button type="submit" className="input-submit">Submit</button>
        </form>
    )
}

export default InputRecipe