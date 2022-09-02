import React from "react";

import './UserTile.scss';

import UserModel from "../../models/user.model";

const UserTile = ({
    user
}: {
    user: UserModel
}) => <div className="user-tile-container">
    
    <div className="details">
        <div className="detail">
            <div className="title">Name: </div>
            <div className="value">{user.name}</div>
        </div>
        <div className="detail">
            <div className="title">Phone: </div>
            <div className="value">{user.phoneNumber}</div>
        </div>
    </div>
</div>

export default UserTile;