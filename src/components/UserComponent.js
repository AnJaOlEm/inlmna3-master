import { response } from "express";
import React from "react";
import UserService from "../services/UserService";

export default function UserComponent() {

    // constructor(){
    //     this.state = {
    //         users:[]
    //     }
    // }

    // function componentDidMount() {
    //     UserService.getUsers().then((response) => {
    //         this.setState({users : response.data})
    //     });
    // }

     
        return (

            <div>

                <h1 className="text-center">Users List</h1>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td> User Id </td>
                            <td> First Name </td>
                            <td> Last Name </td>
                            <td> E-mail </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(
                                user =>
                                <tr key = {user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>

        )
    }



 