import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import './Table.css';

function Table_main() {

    const dispatch = useDispatch();
    const data = useSelector(state => state.data);
    const login = useSelector(state => state.login);

    let res = data.map(function (point) {

        if (point.user === login){

            return <tr>
                <td className={"coord_col"}>{point.x}</td>
                <td className={"coord_col"}>{point.y}</td>
                <td className={"coord_col"}>{point.r}</td>
                <td className={"time_col"}>{point.execTime}</td>
                <td className={"time_col"}>{point.curTime}</td>
                <td className={"time_col"}>{point.hit}</td>
                <td className={"coord_col"}>{point.user}</td>
            </tr>;
            }

    });

    useEffect(() => {
        if (localStorage.getItem("login") === ""){
            localStorage.setItem("token", null);
            localStorage.setItem("refreshToken", null);
            dispatch({type: "LOG_IN", login: ""})
        }
    });




    return (
        <div>
            <div className="table">
                <table id="table_res">
                    <thead>
                    <tr>
                        <th className={"coord_col"}>X</th>
                        <th className={"coord_col"}>Y</th>
                        <th className={"coord_col"}>R</th>
                        <th className={"time_col"}>Время выполнения (мс)</th>
                        <th className={"time_col"}>Время отправки</th>
                        <th className={"time_col"}>Результат</th>
                        <th className={"coord_col"}>Создатель</th>
                    </tr>
                    </thead>
                    <tbody>
                    {res}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default Table_main;