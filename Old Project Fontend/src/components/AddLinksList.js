import React from 'react'; 
import { linksListData } from './LinksList';
import moment from 'moment';


export class AddLinksList extends React.Component {
    constructor(props) {
        super(props);


        this.state = { title: "", loading: true, subMenuListData: [], linksList: new linksListData() };
 

        fetch('SubMenu')
            .then(response => response.json())
            .then(data => {

                this.setState({ subMenuListData: data, loading: false });
            });


        var linkId = this.props.match.params["linkId"];


        if (linkId > 0) {
            fetch('Links/' + linkId)
                .then(response => response.json())
                .then(data => {

                    this.setState({ title: "Edit", loading: false, linksList: data });
                });
        }
        else {
            this.state = { title: "Create", loading: false, subMenuListData: [], linksList: new linksListData() };
        }

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.subMenuListData);
        return <div>
            <h1>{this.state.title} Links</h1>
            <hr />
            {contents}
        </div>;
    }



    FuncSave(event) {
        event.preventDefault();
        const data = new FormData(event.target)
        
        if (this.state.linksList.linkId) {
            fetch('Links', {
                method: 'PUT',
                body: data,
            }).then((response) => {
                this.props.history.push("/links-list");
            })
        }
        else {

            fetch('Links', {
                method: 'POST',
                body: data,
            })
                .then(response => {
                    this.props.history.push("/links-list");
                })
        }
    }


    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/links-list");
    }
     

    renderCreateForm(subMenuListData) {

        return (

            <form onSubmit={this.FuncSave} >
                <div className="form-group row" >
                    <input type="hidden" name="linkId" value={this.state.linksList.linkId} />
                </div>

                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="name">Link Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="linkName" placeholder="Link Name" defaultValue={this.state.linksList.linkName} required />
                    </div>
                </div>


                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="link">Link</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="link" placeholder="Link" defaultValue={this.state.linksList.link} required />
                    </div>
                </div>


                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="submenu">Sub Menu Name</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="subMenuId" placeholder="Sub Menu Name" defaultValue={this.state.linksList.subMenuId} required>
                            <option value="">-- Select Sub Menu --</option>
                            {subMenuListData.map(item =>
                                <option key={item.subMenuId} value={item.subMenuId}>{item.subName}</option>
                            )}
                        </select> 
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="created">Created By</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="createdBy" placeholder="Created By" defaultValue={this.state.linksList.createdBy} required />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="active">Active Status</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="activeStatus" placeholder="Active Status" defaultValue={this.state.linksList.activeStatus} required>
                            <option value="">-- Select Status --</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="date">Creation Date</label>
                    <div className="col-md-4">
                        <input className="form-control" type="date" name="creationDate" placeholder="Creation Date " defaultValue={moment(this.state.linksList.creationDate).format('YYYY-MM-DD')} required />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-success"><i className="save icon"></i>Save</button>
                    {' '}
                    <button className="btn btn-danger" onClick={this.FuncCancel}><i className="cancel icon"></i>Cancel</button>
                </div>
            </form>
        )
    }
}