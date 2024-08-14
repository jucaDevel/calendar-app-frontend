import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'

export const PrivateRoutes = ({
    isAuth,
    children
}) => {
    const {pathname} = useLocation()
    localStorage.setItem('lastPath',pathname)

    return isAuth ? children : <Navigate to="/auth/login" replace />;
}

PropTypes.PrivateRoute = {
    isAuth: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
}
