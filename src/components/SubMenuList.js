import React from 'react';
import moment from 'moment';

 
export class SubMenuList extends React.Component {

    //Declaring the constructor 
    constructor() {
         
        super();
         
        this.state = { subMenuListData: [], loading: true };
         
        fetch('SubMenu')
            .then(response => response.json())
            .then(data => {

                this.setState({ subMenuListData: data, loading: false });
            });

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }

     
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderSubMenuListTable(this.state.subMenuListData);//this renderCustomerTable method will return the HTML table. This table will display all the record.
        return <div>
            <h1>Sub Menu </h1>
            <p>
                <a href="add-sub-menu-list"><button className="btn btn-primary"><i className="plus icon"></i>Create New</button></a>
            </p>
            {contents}
        </div>;
    }

    FuncDelete(subMenuId) { 
        if (window.confirm("Do you want to delete Sub Menu List with this Id: " + subMenuId) === false)
            return;
        else {

            fetch('SubMenu/' + subMenuId, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        subMenuListData: this.state.subMenuListData.filter((rec) => {
                            return (rec.subMenuId !== subMenuId);
                        })
                    });
            });
        }
    }


    FuncEdit(subMenuId) {

        this.props.history.push("/submenu/edit/" + subMenuId);
    }


    renderSubMenuListTable(subMenuListData) {

        return <table className='table'>
            <thead>
                <tr>
                    <th>Sub Name</th>
                    <th>App Menu Name</th>
                    <th>Created By</th>
                    <th>Active Status</th>
                    <th>Creation Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {subMenuListData.map(item =>
                    <tr key={item.subMenuId}>
                        <td>{item.subName}</td>
                        <td>{item.appMenu.appName}</td>
                        <td>{item.createdBy}</td>
                        <td>{item.activeStatus}</td>
                        <td>{moment(item.creationDate).format('YYYY-MM-DD')}</td>
                        <td>
                            <button className="btn btn-warning" onClick={(subMenuId) => this.FuncEdit(item.subMenuId)}><i className="edit icon"></i>Edit</button>
                            <button className="btn btn-danger" onClick={(subMenuId) => this.FuncDelete(item.subMenuId)}><i className="trash icon"></i>Delete</button></td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}


export class subMenuListData {
    subMenuId = 0;
    appId = 0; 
    subName = "";
    activeStatus = "";
    createdBy = "";
    creationDate = "";
}