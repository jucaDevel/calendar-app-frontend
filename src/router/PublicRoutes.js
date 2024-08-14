import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom';

export const PublicRoutes = ({
    isAuth,
    children
}) => {
    return !isAuth ? children : <Navigate to="/" replace />;
}

PropTypes.PublicRoute = {
    isAuth: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
}
