import React from "react";
import {useState} from 'react';

const FormInput = (props) => {

    const { inputAttr, onChange } = props;
    const defaultPlaceHolder = props.placeHolder;
    const [placeHolder, setPlaceHolder] = useState(defaultPlaceHolder);

    function HandleFocus(e) {
        if(!e.target.value) {
            setPlaceHolder('');
        }
    }

    function HandleBlur(e) {
        if(!e.target.value) {
            setPlaceHolder(defaultPlaceHolder);
        }
    }

    return (
        <div className="form-control">
            <input placeholder = {placeHolder} {...inputAttr}  onFocus = {HandleFocus} onBlur = {HandleBlur} onChange = {onChange}></input>
        </div>
    )
};

export default FormInput;