import React from 'react'
import { useSelector } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'

export default function Favorites() {

    const { favoritesItems } = useSelector((state) => state.favorites)

    return (
        <div>
            <Dropdown className="mt-3" item text="Favorileriniz">
                <Dropdown.Menu>
                    {favoritesItems.map((favoritesItem) => (
                        <Dropdown.Item key={favoritesItem.id}>
                            {favoritesItem?.employer.companyName}
                        </Dropdown.Item>
                    ))}
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        Favorilere Git
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
