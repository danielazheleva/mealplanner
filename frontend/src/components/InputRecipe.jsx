import React from "react"

const InputRecipe = (props) => {
    const [url, setUrls] = React.useState({url: ""});

    function onChange(e) {
        setUrls({
            [e.target.name]: e.target.value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(url.url.trim()) {
            props.addRecipeToProps(url.url);
            setUrls({
                url: ""
            })
        } else {
            alert("Input recipe")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input
                type="text"
                className="input-text"
                placeholder="Add recipe..."
                value={url.url}
                name="url"          
                onChange={onChange}
            />
            <button className="input-submit">Submit</button>
        </form>
    )
}

export default InputRecipe