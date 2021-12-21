import React from "react";

function Header_main(props) {

    return (
        <div>
            <div className="header">
                <h2  style={{color: "white"}}>Нуруллаев Даниил</h2>
            </div>

            <div className="header">
                <h2 style={{color: "white"}}> Группа: P3214</h2>
            </div>

            <div className="header">
                <h2  style={{color: "white", paddingRight: "20px"}}>Вариант №2572</h2>
            </div>

            <div className="header">
                <h2  style={{color: "white", paddingRight: "20px"}}>Пользователь: {props.login} </h2>
            </div>

            <div className="clear">
            </div>
        </div>
    );
}

export default Header_main;