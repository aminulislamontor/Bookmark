import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import { AppMenuList } from './components/AppMenuList';
import { AddAppMenuList } from './components/AddAppMenuList';

import { SubMenuList } from './components/SubMenuList';
import { AddSubMenuList } from './components/AddSubMenuList';

import { LinksList } from './components/LinksList';
import { AddLinksList } from './components/AddLinksList';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />

                <Route path='/app-menu-list' component={AppMenuList} /> 
                <Route path='/add-app-menu-list' component={AddAppMenuList} />
                <Route path='/appmenu/edit/:appId' component={AddAppMenuList} />

                <Route path='/sub-menu-list' component={SubMenuList} /> 
                <Route path='/add-sub-menu-list' component={AddSubMenuList} />
                <Route path='/submenu/edit/:subMenuId' component={AddSubMenuList} />

                <Route path='/links-list' component={LinksList} /> 
                <Route path='/add-links-list' component={AddLinksList} />
                <Route path='/links/edit/:linkId' component={AddLinksList} />
            </Layout>
        );
    }
}
