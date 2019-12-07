import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from 'rbx';

export default function SimpleMenu(state) {
    return (
        <div style={{ height: '50px' }}>
        <Dropdown>
        <Dropdown.Trigger>
            <Button>
            <span>My Cart</span>
            </Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
            <Dropdown.Content>
                {state.map(item => <Dropdown.Item> {item} </Dropdown.Item>)}
            </Dropdown.Content>
        </Dropdown.Menu>
        </Dropdown>
    </div>
    );
}