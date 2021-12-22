import React from "react";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import axios from "axios";
import $ from "jquery";
import {useSelector} from "react-redux";

export function drawPointOnly(x_draw, y_draw, isHit) {
    let canvas = $('.graph-canvas');
    let ctxAxes = canvas[0].getContext('2d');
    ctxAxes.beginPath();
    ctxAxes.setLineDash([]);
    ctxAxes.stroke();
    if (isHit === "true")
        ctxAxes.fillStyle = 'green';
    else if (isHit === "false")
        ctxAxes.fillStyle = 'red';
    else if (isHit === "none")
        ctxAxes.fillStyle = 'black';
    ctxAxes.arc(x_draw, y_draw, 3, 0, 2 * Math.PI);
    ctxAxes.fill();
}


export const XOFFSET = 110
export const YOFFSET = 110


function Data_inputs_main(props) {


    let x = props.x;
    let y = props.y;
    let r = props.r;
    let userID = props.userID;
    let dispatch = props.dispatch;


    function drawOldPoints(r) {

        $("tbody tr").each(function () {

            const point = $(this);

            const x = parseFloat(point.find("td:first-child").text());
            const y = parseFloat(point.find("td:nth-child(2)").text());
            var res = point.find("td:nth-child(6)").text();
            if (isNaN(x) || isNaN(y) || isNaN(r)) return;
            let x_click = x / r * 68 + XOFFSET;
            let y_click = -(y / r * 66 - YOFFSET);
            drawPointOnly(x_click, y_click, res)
        })
    }

    function logOut() {
        localStorage.setItem("token", null);
        localStorage.setItem("refreshToken", null);
        dispatch({type: "LOG_IN", login: ""})
    }


    function submitClick(e) {
        e.preventDefault()
        // alert(localStorage.getItem("token"))
        let httpHeaders = {
            Authorization: 'Bearer ' + localStorage.getItem("token"),
            ContentType: 'application/json',
            Accept: 'application/json'
        };

        axios.post(`http://localhost:8080/points/save`, {x: x, y: y, r: r}, {headers: httpHeaders})
            .then(response => {
                console.log(response.data)
                if (response.status === 200) {
                    dispatch({type: "SAVE_POINT", point: response.data})
                }
            })
            .catch(function (error) {
                if (error.response.data.message.toString() === "Недостаточно прав.") {
                    axios.post('http://localhost:8080/users/refreshToken', {refreshToken: localStorage.getItem("refreshToken")}, {headers: httpHeaders})
                        .then(response => {
                            if (response.status === 200) {
                                alert("Срок токена истёк. Токен был обновлён.")
                                localStorage.setItem("token", response.data.accessToken);
                                localStorage.setItem("refreshToken", response.data.refreshToken);
                            } else {
                                alert(response.data)
                            }
                        })
                        .catch(function (error) {
                            alert(error.response.data.message.toString())
                        })
                } else {
                    alert(error.response.data.message.toString())
                }


            })
    }

    function clearPoints() {
        let httpHeaders = {
            Authorization: 'Bearer ' + localStorage.getItem("token"),
            ContentType: 'application/json',
            Accept: 'application/json'
        };

        axios.post('http://localhost:8080/points/clear', {userID: userID}, {headers: httpHeaders})
            .then(response => {

            })
            .catch(function (error) {
                if (error.response.data.message.toString() === "Недостаточно прав.") {
                    axios.post('http://localhost:8080/users/refreshToken', {refreshToken: localStorage.getItem("refreshToken")}, {headers: httpHeaders})
                        .then(response => {
                            if (response.status === 200) {
                                alert("Срок токена истёк. Токен был обновлён.")
                                localStorage.setItem("token", response.data.accessToken);
                                localStorage.setItem("refreshToken", response.data.refreshToken);
                            } else {
                                alert(response.data)
                            }
                        })
                        .catch(function (error) {
                            alert(error.response.data.message.toString())
                        })
                } else {
                    alert(error.response.data.message.toString())
                }


            })
        sleepFor(300)
    }

    function sleepFor(sleepDuration) {
        var now = new Date().getTime();
        while (new Date().getTime() < now + sleepDuration) {

        }
    }

    function changeX(e) {
        e.preventDefault();
        dispatch({type: "SET_X", x: e.target.innerText})
        let x_click = xCoordinatesToPixels(e.target.innerText);
        let y_click = yCoordinatesToPixels(y);
        drawPoint(x_click, y_click,r)

    }

    function changeY(e) {
        dispatch({type: "SET_Y", y: e.target.value})
        let x_click = xCoordinatesToPixels(x);
        let y_click = yCoordinatesToPixels(e.target.value);
        drawPoint(x_click, y_click,r)
    }

    function validateYWithEvent(e) {
        e.preventDefault()
        if (isNaN(y) || y > 5 || y < -5) {
            dispatch({type: "SET_Y", y: ""})
        }
    }

    function changeR(e) {
        e.preventDefault();
        console.log(e.target.innerText)
        dispatch({type: "SET_R", r: e.target.innerText})
        r = e.target.innerText
        fillR(e.target.innerText)
        let x_click = xCoordinatesToPixels(x);
        let y_click = yCoordinatesToPixels(y);
        drawPoint(x_click, y_click,r)


    }

    function validateX() {
        return !(x < -2 || x > 2 || x == null);
    }

    function validateY() {
        return !(y < -5 || y > 5 || y === "");
    }

    function validateR() {
        return !(r < -2 || r > 2 || r == null);
    }

    function xCoordinatesToPixels(x) {
        return x / r * 68 + XOFFSET;
    }

    function yCoordinatesToPixels(y) {
        return -(y / r * 66 - YOFFSET);
    }


    function fillR(newR) {
        $('.minus_R_X')[0].textContent = (-newR).toString();
        $('.minus_half_R_X')[0].textContent = (-newR / 2).toString();
        $('.half_R_X')[0].textContent = (newR / 2).toString();
        $('.R_X')[0].textContent = (newR).toString();
        $('.minus_R_Y')[0].textContent = (-newR).toString();
        $('.minus_half_R_Y')[0].textContent = (-newR / 2).toString();
        $('.half_R_Y')[0].textContent = (newR / 2).toString();
        $('.R_Y')[0].textContent = (newR).toString();
    }


    function clearCanvas() {
        let canvas = $('.graph-canvas');
        canvas[0].getContext('2d').clearRect(0, 0, canvas.width(), canvas.height());
    }


    function drawPoint(x_draw, y_draw,r) {

        clearCanvas();
        drawOldPoints(r)
        if (!validateX() || !validateY() || !validateR()) return;
        drawPointOnly(x_draw, y_draw, "none")
    }

    return (
        <div>
            <form>
                <h2 className="namer" style={{marginTop: "40px"}}>Ввод данных</h2>
                <br/>


                <div style={{margin: 10}}>
                    <h3>X: {x}</h3>
                    <Button
                        className={"r_button"}
                        label={-2}
                        onClick={changeX}
                        value={-2}/>
                    <Button
                        className={"r_button"}
                        label={-1.5}
                        onClick={changeX}
                        value={-1.5}/>
                    <Button
                        className={"r_button"}
                        label={-1}
                        onClick={changeX}
                        value={-1}/>
                    <Button
                        className={"r_button"}
                        label={-0.5}
                        onClick={changeX}
                        value={-0.5}/>
                </div>
                <div style={{margin: 10}}>
                    <Button
                        className={"r_button"}
                        label={"0"}
                        onClick={changeX}
                        value={0}/>
                </div>
                <div style={{margin: 10}}>
                    <Button
                        className={"r_button"}
                        label={0.5}
                        onClick={changeX}
                        value={0.5}/>
                    <Button
                        className={"r_button"}
                        label={1}
                        onClick={changeX}
                        value={1}/>
                    <Button
                        className={"r_button"}
                        label={1.5}
                        onClick={changeX}
                        value={1.5}/>
                    <Button
                        className={"r_button"}
                        label={2}
                        onClick={changeX}
                        value={2}/>
                </div>


                <h3>Y: {y}</h3>
                <InputText
                    style={{width: "220px", height: "30px"}}
                    value={y}
                    onChange={changeY}
                    onBlur={validateYWithEvent}
                    maxLength={5}
                    tooltip={"Число от -5 до 5"}
                />
                <br/>

                <div style={{margin: 10}}>
                    <h3>R: {r}</h3>
                    <Button
                        className={"r_button"}
                        label={-2}
                        onClick={changeR}
                        value={-2}/>
                    <Button
                        className={"r_button"}
                        label={-1.5}
                        onClick={changeR}
                        value={-1.5}/>
                    <Button
                        className={"r_button"}
                        label={-1}
                        onClick={changeR}
                        value={-1}/>
                    <Button
                        className={"r_button"}
                        label={-0.5}
                        onClick={changeR}
                        value={-0.5}/>
                </div>
                <div style={{margin: 10}}>
                    <Button
                        className={"r_button"}
                        label={"0"}
                        onClick={changeR}
                        value={0}/>
                </div>
                <div style={{margin: 10}}>
                    <Button
                        className={"r_button"}
                        label={0.5}
                        onClick={changeR}
                        value={0.5}/>
                    <Button
                        className={"r_button"}
                        label={1}
                        onClick={changeR}
                        value={1}/>
                    <Button
                        className={"r_button"}
                        label={1.5}
                        onClick={changeR}

                        value={1.5}/>
                    <Button
                        className={"r_button"}
                        label={2}
                        onClick={changeR}
                        value={2}/>
                </div>

                <button
                    id={"out_button"}
                    className={"submit_button"}
                    value={"Отправить"}
                    ajax={"false"}
                    onClick={submitClick}>Отправить
                </button>

                <button
                    id={"clear_button"}
                    className={"submit_button"}
                    value={"Очистить"}
                    ajax={"false"}
                    onClick={clearPoints}
                >Очистить
                </button>

                <br/><br/>

                <button
                    id={"logout_button"}
                    className={"submit_button"}
                    value={"Выйти"}
                    ajax={"false"}
                    onClick={logOut}>Выйти
                </button>


            </form>
        </div>
    );
}

export default Data_inputs_main;