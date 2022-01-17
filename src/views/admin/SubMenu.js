import React, { useEffect, useState, forwardRef } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';

//import moment from 'moment'; 
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
// core components
import Header from "components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/tables.js";
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Print from '@material-ui/icons/Print';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const useStyles = makeStyles(componentStyles);
 
const SubMenu = () => {

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} style={{ color: "red" }} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} style={{ color: "orange" }} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        Print: forwardRef((props, ref) => <Print {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    const [user, setUser] = useState([]);
    const [appMenu, setAppMenu] = useState([]);
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);


    let columns = [
        { title: 'Sub Name', field: 'subName' },
        {
            title: 'App Name', field: 'appId',
            lookup: appMenu.reduce(function (acc, cur, i) {
                acc[cur.appId] = cur.appName;
                return acc;
            }, {}),
        },
        { title: 'Created By', field: 'createdBy' },
        {
            title: 'Active Status', field: 'activeStatus',
            lookup: { 0: '⏹︎ Inactive', 1: '✅ Active' },
        },
    ]

    useEffect(() => {
        axios.get(`http://localhost:4531/subMenu`)
            .then(res => {
                const users = res.data;
                setUser(users); 
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:4531/appMenu`)
            .then(res => { 
                var appMenus = res.data;
                setAppMenu(appMenus); 
            })
    }, [])


    //function for updating the existing row details
    const handleRowUpdate = (newData, oldData, resolve) => {
        //validating the data inputs
        let errorList = []
        if (newData.appId === "") {
            errorList.push("Try Again, appId")
        }
        if (newData.subName === "") {
            errorList.push("Try Again, subName")
        } 
        if (newData.createdBy === "") {
            errorList.push("Try Again, createdBy")
        }
        if (newData.activeStatus === "") {
            errorList.push("Try Again, activeStatus")
        } 

        if (errorList.length < 1) { 
            axios.put(`http://localhost:4531/subMenu`, newData)
                .then(response => { 

                    const updateUser = [...user];
                    const index = oldData.tableData.id;
                    updateUser[index] = newData;
                    setUser([...updateUser]);
                    resolve()
                    setIserror(false)
                    setErrorMessages([])
                })
                .catch(error => {
                    setErrorMessages(["Update failed! Server error"])
                    setIserror(true)
                    resolve()

                })
        } else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()

        }
    }


    //function for deleting a row
    const handleRowDelete = (oldData, resolve) => {
        axios.delete(`http://localhost:4531/subMenu/${oldData.subId}`)
            .then(response => {
                const dataDelete = [...user];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setUser([...dataDelete]);
                resolve()
            })
            .catch(error => {
                setErrorMessages(["Delete failed! Server error"])
                setIserror(true)
                resolve()
            })
    }



    //function for adding a new row to the table
    const handleRowAdd = (newData, resolve) => {
        //validating the data inputs
        let errorList = []
        if (newData.appId === "") {
            errorList.push("Try Again, appId")
        }
        if (newData.subName === "") {
            errorList.push("Try Again, subName")
        } 
        if (newData.createdBy === "") {
            errorList.push("Try Again, createdBy")
        }
        if (newData.activeStatus === "") {
            errorList.push("Try Again, activeStatus")
        } 

        if (errorList.length < 1) { 
            axios.post(`http://localhost:4531/subMenu`, newData)
                .then(response => {

                    let newUserdata = [...user];
                    newUserdata.push(newData);
                    setUser(newUserdata);
                    resolve()
                    setErrorMessages([])
                    setIserror(false)
                })
                .catch(error => {
                    setErrorMessages(["Cannot add data. Server error!"])
                    setIserror(true)
                    resolve()
                })
        } else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
        }
    }



    const classes = useStyles();
    return (
        <>
            <Header />
            {/* Page content */}
            <Container
                maxWidth={false}
                component={Box}
                marginTop="-6rem"
                classes={{ root: classes.containerRoot }}
            >
                <Card classes={{ root: classes.cardRoot }}>
                    <CardHeader
                        className={classes.cardHeader}
                        title="Sub Menu Table"
                        titleTypographyProps={{
                            component: Box,
                            marginBottom: "0!important",
                            variant: "h3",
                        }}
                    ></CardHeader>
                    <MaterialTable
                        title=""
                        columns={columns} 
                        data={user}
                        icons={tableIcons}
                        options={{
                            headerStyle: { borderBottomColor: '#fb6340', borderBottomWidth: '3px', },
                            actionsColumnIndex: -1,
                            exportButton: {
                                csv: true,
                                pdf: true
                            },

                        }}
                        localization={{
                            toolbar: {
                                exportCSVName: "Export as Excel",
                                exportPDFName: "Export as PDF"
                            }
                        }}

                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => { 

                                    handleRowUpdate(newData, oldData, resolve);

                                }),
                            onRowAdd: (newData) =>
                                new Promise((resolve) => { 
                                    handleRowAdd(newData, resolve)
                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    handleRowDelete(oldData, resolve)
                                }),
                        }}
                    />

                    <div>
                        {iserror &&
                            <Alert severity="error">
                                <AlertTitle>ERROR</AlertTitle>
                                {errorMessages.map((msg, i) => {
                                    return <div key={i}>{msg}</div>
                                })}
                            </Alert>
                        }
                    </div>

                </Card>

            </Container>
        </>
    );
};

export default SubMenu;
