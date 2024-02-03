import './App.css';
import React, { useEffect, useState } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import BotPage from './screens/BotPage/BotPage';
import UserProfile from './screens/userProfile/UserProfile';
import ManageUser from "./screens/manageUser/ManageUser"
import Dashboard from './screens/dashboard/Dashboard';
import Login from './screens/login/Login';

import Layout from './components/layout/Layout'
import ServiceAgreement from './screens/serviceAgreement/ServiceAgreement';
import { setIsUser, setUserEmail, setUserRegion, setUserRole } from './redux/actions';

export default function App() {
	const isUser = localStorage.getItem("user-email") ? true : false
	const userRole = localStorage.getItem("user-role")

	return (
		<Routes>
			<Route
				path='/'
				element={
					isUser ? (
						(userRole === 'user' && <Navigate to={"/user-chatbot/conversation"} />) ||
						(userRole === 'admin' && <Navigate to={"/manage-users"} />) ||
						(userRole === 'superadmin' && <Navigate to={"/super-admin-dashboard"} />)
					)
						: <Login />
				} />
			<Route
				path='/user-chatbot/conversation/:id?'
				element={
					<PrivateRoute>
						<BotPage />
					</PrivateRoute>
				}
			/>
			<Route
				path='/user-profile/:id'
				element={
					(userRole === 'user' ?
						<Navigate to={"/user-chatbot/conversation"} /> :
						<PrivateRoute>
							<UserProfile />
						</PrivateRoute>
					)
				}
			/>
			<Route
				path='/manage-users'
				element={
					(userRole === 'user' ?
						<Navigate to={"/user-chatbot/conversation"} /> :
						<PrivateRoute>
							<ManageUser />
						</PrivateRoute>
					)
				}
			/>
			<Route path='/super-admin-dashboard' element={
				(userRole === 'admin' ?
					<Navigate to={"/manage-users"} /> :
					userRole === 'user' ?
						<Navigate to={"/user-chatbot/conversation"} /> :
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
				)
			} />
			<Route
				path='/service-agreement'
				element={
					(userRole === 'admin' ?
						<Navigate to={"*"} /> :
						userRole === 'user' ?
							<Navigate to={"*"} /> :
							<PrivateRoute>
								<ServiceAgreement />
							</PrivateRoute>
					)
				}
			/>
		</Routes>
	)
}

const PrivateRoute = ({ children }) => {
	const isUser = localStorage.getItem("user-email") ? true : false
	// const isUser = useSelector(state => state.isUser)

	return isUser ?
		<Layout>
			{children}
		</Layout>
		:
		<Navigate to={"/"} />
}