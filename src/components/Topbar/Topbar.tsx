import React from "react";

import './Topbar.scss';

const Topbar = (
    {
        user,
        onClickLogout
    }: 
    {
        user: string| null,
        onClickLogout: () => void
    }
) => {
    return <div className="topbar-container">
        <div className="username">{`Welcome ${user}`}</div>
        <div onClick={onClickLogout} className="logout-action">Logout</div>
    </div>
}

export default Topbar;