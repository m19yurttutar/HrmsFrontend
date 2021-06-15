import React from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Menu, Image } from 'semantic-ui-react'
import "./Navi.css"

export default function NaviSignedIn(props) {
    return (
        <div>
            <Menu.Item className="MenuItemSignedIn">
                <Image avatar spaced="right" src="https://res.cloudinary.com/dxahez1o6/image/upload/v1623099446/mqkyb7zxgnmnwwnlxhwf.jpg"/>
                <Dropdown className="text-white font-weight-bold mr-5" pointing="top right" text="Mert Yurttutar">
                    <Dropdown.Menu>
                        <Dropdown.Item text="Bilgilerim" icon="info"/>
                        <Dropdown.Item as={Link} to="/" onClick={props.signOut} text="Çıkış Yap" icon="sign-out"/>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>  
        </div>
    )
}