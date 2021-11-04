import { PropTypes } from '@dhis2/prop-types'
import { Menu, MenuItem } from '@dhis2/ui'
import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import i18n from '../locales/index.js'


import '../components/Navbar.css'

const NavigationItem = ({ path, label }) => {
    // browser history object
    const history = useHistory()

    // "null" when not active, "object" when active
    const routeMatch = useRouteMatch(path)
    // If "isActive" is not null and "isActive.isExact" is true
    const isActive = routeMatch?.isExact

    // Callback called when clicking on the menu item.
    // If the menu item is not active, navigate to the path
    const onClick = () => !isActive && history.push(path)

    return <MenuItem label={label} active={isActive} onClick={onClick} />
}

NavigationItem.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
}

export const Navigation = () => (
    <Menu className="navbar">
        <NavigationItem
            // Menu item for the home page
            label={i18n.t("Home")}
            path="/home"
        />

        <NavigationItem
            // Menu item for the meta data page
            label={i18n.t("Patient")}
            path="/patient"
        />
        
        <NavigationItem
            // Menu item for the meta data page
            label={i18n.t("Tumour")}
            path="/tumour"
        />

        <NavigationItem 
            label={i18n.t("Source")}
            path="/source" 
        />

        <NavigationItem
            // Menu item for the FAQ page
            label={i18n.t("All Records Export")}
            path="/allRecords"
        />

        <NavigationItem label={i18n.t("Reports")}
         path="/reports" />
    </Menu>
)
