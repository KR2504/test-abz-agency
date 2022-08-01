import React from "react";
// import Section from 'components/Section'
import UserCard from "components/UserCard";
import Button from "components/Button";

export default function UserList({users, addMoreUsers, totalPages, currentPage}) {
    return (
        <section id="users" className="userList">
            <h1 className="userList__title">Working with GET request</h1>
            {users.length && <ul className="userList__list">
                {users.map(({ id, name, photo, position, phone, email }) => (
                    <li key={id} className={'userList__item'}>
                        <UserCard
                            name={name}
                            avatar={photo}
                            position={position}
                            phone={phone}
                            email={email}
                        />
                    </li>
                )
                )}
            </ul>}
            {users.length > 0 && (
                <Button
                    onClick={addMoreUsers}
                    classModificator={`button--wide userList__btn ${currentPage >= totalPages && 'button--hidden'
                        }`}
                >Show more</Button>
            )}
        </section>
    );
};