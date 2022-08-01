import React from "react";
import Button from "components/Button";
import logo from '../../images/Logo.svg'

export default function Header() {
    return (
        <header className="header">
            <div className="header__container page__container">
                <a href='/src/index.js'>
                    <img className="header__logo-img" src={logo} alt="Logo" />
                </a>
                <div className="header__signUp-conainer">
                    <Button classModificator="button--space-between">
                        <a href="#users" className="button__link">
                            Users
                        </a>
                    </Button>
                    <Button>
                        <a href="#sign-up" className="button__link">Sign up</a>
                    </Button>
                </div>
            </div>
        </header>
    );
};