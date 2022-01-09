import React, { Component } from "react"

class InputRecipe extends Component {

    state = {
        url: ""
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        if(this.state.url.trim()) {
            this.props.addRecipeToProps(this.state.url);
            this.setState({
                url: ""
            })
        } else {
            alert("Input recipe")
        }
        
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-container">
                <input
                    type="text"
                    className="input-text"
                    placeholder="Add recipe..."
                    value={this.state.url}
                    name="url"          
                    onChange={this.onChange}
                />
                <button className="input-submit">Submit</button>
            </form>
        )
    }
}

export default InputRecipe