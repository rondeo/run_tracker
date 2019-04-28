import React from 'react';

export default ({ input, id, label, meta: { error, touched }, type = 'text',
    col = 'sm-12',
    placeholder }) => {

    return (
        <div
            className={`input-field`}
        >
            <input className="inputFields" {...input} id={id} type={type} placeholder={placeholder} />
            <label htmlFor={id}>{label}</label>
            <p className="red-text text-darken-2">{touched && error}</p>
        </div>
    );
}