import React, {useState} from "react";
import classNames from 'classnames';

export default function UserCard({avatar, name, position, email, phone }) {
    const [show, setShow] = useState('');

    return (
        <div className="userCard">
            <img src={avatar} alt="avatar" className="userCard__avatar" />
            <div className="userCard__text-container">
                <p
                onMouseOver={() => setShow('name')}
                onMouseOut={() => setShow('')}
                className="userCard__name"
            >
                {name}
            </p>
            <span
                className={classNames('userCard__fullInfo', {
                    'userCard__fullInfo--active': show.includes('name'),
                })}
            >
                {name}
            </span>
            </div>
           
            <div className="userCard__text-container">
                <p
                onMouseOver={() => setShow('position')}
                onMouseOut={() => setShow('')}
                className="userCard__information"
            >
                {position}
            </p>
            <span
                className={classNames('userCard__fullInfo', {
                    'userCard__fullInfo--active': show.includes('position'),
                })}
            >
                {position}
            </span>
            </div>
            
            <div className="userCard__text-container">
                 <p onMouseOver={() => setShow('email')}
                onMouseOut={() => setShow('')}
                className="userCard__information"
            >
                {email}
            </p>
            <span
                className={classNames('userCard__fullInfo', {
                    'userCard__fullInfo--active': show.includes('email'),
                })}
            >
                {email}
            </span>
           </div>
            
            <div className="userCard__text-container">
                <p onMouseOver={() => setShow('phone')}
                onMouseOut={() => setShow('')}
                className="userCard__information"
            >
                {phone}
            </p>
            <span
                className={classNames('userCard__fullInfo', {
                    'userCard__fullInfo--active': show.includes('phone'),
                })}
            >
                {phone}
            </span>
            </div>
            
        </div>
    );

};