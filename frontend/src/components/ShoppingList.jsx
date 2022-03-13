// import React from "react"

const ShoppingList = (props) => {
    return (
        <div>
            <ul>
                {
                    props.shoppingList.map(ing => {
                        return (<li key={ing}>{ing}</li>)
                    })
                }
            </ul>
        </div>
    )
}

export default ShoppingList