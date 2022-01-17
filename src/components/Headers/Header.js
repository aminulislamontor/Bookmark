import React, { useEffect, useState } from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons components
//import ArrowDownward from "@material-ui/icons/ArrowDownward";
//import ArrowUpward from "@material-ui/icons/ArrowUpward";
//import EmojiEvents from "@material-ui/icons/EmojiEvents";
//import GroupAdd from "@material-ui/icons/GroupAdd";
import InsertChartOutlined from "@material-ui/icons/InsertChartOutlined"; 

// core components
import CardStats from "components/Cards/CardStats.js";

import componentStyles from "assets/theme/components/header.js";

const useStyles = makeStyles(componentStyles);

const Header = () => {

    const [result1, setApp] = useState([]);
    const [result2, setSubMenu] = useState([]);
    const [result3, setLink] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4531/AppMenu`)
            .then(res => {
                const results = res.data;
                setApp(results);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:4531/SubMenu`)
            .then(res => {
                const results = res.data;
                setSubMenu(results);
                //console.log(users);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:4531/Links`)
            .then(res => {
                const results = res.data;
                setLink(results);
                //console.log(users);
            })
    }, [])

    const classes = useStyles();
    const theme = useTheme();
    return (
        <>
            <div className={classes.header}>
                <Container
                    maxWidth={false}
                    component={Box}
                    classes={{ root: classes.containerRoot }}
                >
                    <div>
                        <Grid container>
                            <Grid item xl={4} lg={6} xs={12}>
                                <CardStats
                                    subtitle="App Menu"
                                    title={result1.length}
                                    icon={InsertChartOutlined}
                                    color="bgError" 
                                />
                            </Grid>
                            <Grid item xl={4} lg={6} xs={12}>
                                <CardStats
                                    subtitle="Sub Menu"
                                    title={result2.length}
                                    icon={InsertChartOutlined}
                                    color="bgWarning"
                                />
                            </Grid>
                            <Grid item xl={4} lg={6} xs={12}>
                                <CardStats
                                    subtitle="Links"
                                    title={result3.length}
                                    icon={InsertChartOutlined}
                                    color="bgWarningLight"
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default Header;
