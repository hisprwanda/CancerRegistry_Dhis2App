import axios from 'axios'
import React, { Component, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { CSVLink } from 'react-csv'
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableCellHead,
    TableHead,
    TableRow,
    TableRowHead,
    InputFieldFF,
    SingleSelectFieldFF,
    SwitchFieldFF,
    composeValidators,
    createEqualTo,
    email,
    hasValue,
} from '@dhis2/ui'
import ReactPaginate from 'react-paginate'
import styles from './Form.module.css'
import { ReactFinalForm } from '@dhis2/ui'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Moment from 'react-moment';



var data = []

var endpointtracker='https://dev.hisprwanda.org/oncology/api/trackedEntityInstances.json?ou=';
var endpointou='https://dev.hisprwanda.org/oncology/api/organisationUnits/';

var headers = [
    { label: 'REGNO', key: 'regno' },
    { label: 'PERS', key: 'pers' },
    { label: 'IDENTITYCARD', key: 'idnum' },
    { label: 'SURNAME', key: 'firstName' },
    { label: 'FIRSTN', key: 'lastName' },
    { label: 'SEX', key: 'gender' },
    { label: 'BIRTHD', key: 'bd' },
    { label: 'PHONE1', key: 'phone' },
    { label: 'PHONEN2', key: 'phone1' },
    { label: 'Date', key: 'date' },
]

var csvReport = {
    filename: 'Report.csv',
    headers: headers,
    data: data,
}

/**
 * This is just a function to demonstrate the values when the form is submitted
 * It takes the form's values (which is an object), transforms it into readable JSON,
 * and then finally displays the values in an alert box
 *
 * @param {Object} values
 * @param {string} values.title
 * @param {string} values.surname
 * @param {string} values.firstname
 * @param {string} values.email
 * @param {string} values.email-confirmation
 * @param {bool} values.newsletter
 */
const alertValues = values => {
    const formattedValuesString = JSON.stringify(values, null, 2)
}

const { Field } = ReactFinalForm

class Patient extends Component {
    
    constructor(props) {
       
        super(props)

        var today = new Date(),
        dates = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
        
        this.state = {
            items: [],
            mydatas: [],
            orgs: [],
            isLoaded: false,
            selectValue: 0,
            districts: [],
            sectors: [],
            cells: [],
            villages: [],
            provselected: '',
            disselected: '',
            sectselected: '',
            celselected: '',
            villselected: '',
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 10,
            currentPage: 0,
            frdate : today,
            enddate : today,
            downloadstatus : 0,
           
        }
        this.handlePageClick = this.handlePageClick.bind(this)
    }

    handlePageClick = e => {
        const selectedPage = e.selected
        const offset = selectedPage * this.state.perPage

        this.setState(
            {
                currentPage: selectedPage,
                offset: offset,
            },
            () => {
                this.loadMoreData()
            }
        )
    }

    loadMoreData() {
        const data = this.state.orgtableData

        const slice = data.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
        )
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            items: slice,
        })
    }

    myFunc = event => {
        const nam = event.target.name
        const val = event.target.value
        this.setState({ [nam]: val })

        axios
            .get(
                endpointou +
                    event.target.value +
                    '.json?fields=children[name,id]',
                { auth: { username: 'pndayizigiye', password: 'Pascal@1234' } }
            )
            .then(res => {
                console.log(res.data.children)
                this.setState({
                    districts: res.data.children,
                })
            })
    }

    myChangeHandler = event => {
    

         // set the date interval

//Capture DatePicker Fromdate and change the format


this.setState({
    isLoaded: false,
})

const mdates=this.state.frdate;

      

var datp=new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(mdates);
var pdate=datp.substring(0,2);
var pmonth=datp.substring(3,5);
var pyear=datp.substring(6,10);


var bds=pyear+"-"+pdate+"-"+pmonth;

//Capture DatePicker dateTo and change the format

const mdates1=this.state.enddate;



var datp1=new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(mdates1);
var pdate1=datp1.substring(0,2);
var pmonth1=datp1.substring(3,5);
var pyear1=datp1.substring(6,10);


var bds1=pyear1+"-"+pdate1+"-"+pmonth1;

// retrieve the with date interval

        axios
            .get(
                endpointtracker +
                    this.state.villselected +
                    '&ouMode=DESCENDANTS&fields=attributes[attribute,value]&program=rx6V962E4XM&programStartDate='+bds+'&programEndDate='+bds1,
                { auth: { username: 'pndayizigiye', password: 'Pascal@1234' } }
            )
            .then(res => {
               
                const datap = res.data.trackedEntityInstances
                const slice = datap.slice(
                    this.state.offset,
                    this.state.offset + this.state.perPage
                )



                this.setState({
                    isLoaded: true,
                    items: slice,
                    pageCount: Math.ceil(datap.length / this.state.perPage),
                    orgtableData: res.data.trackedEntityInstances,
                    tableData: slice,
                })
            })


           /* const datap = res.data.trackedEntityInstances
            const slice = datap.slice(
                this.state.offset,
                this.state.offset + this.state.perPage
            )
            this.setState({
                isLoaded: true,
                items: slice,
                pageCount: Math.ceil(datap.length / this.state.perPage),
                orgtableData: res.data.trackedEntityInstances,
                tableData: slice,
            })*/









    }

    


    exportexcel = (event) => {

        console.log(this.state.mydatas);
       
        axios.get(endpointtracker+this.state.villselected+'&ouMode=DESCENDANTS&pageSize=5&fields=attributes[attribute,value]&program=rx6V962E4XM',{auth:{username:"pndayizigiye",password:"Pascal@1234"}})
        .then(res =>{
          //console.log(res.data.trackedEntityInstances)
          this.setState(
            {
              isLoaded: true,
              items:res.data.trackedEntityInstances,
            }
          )
         
        })
        
        var contacts = "REGNO"+"\t"+"PERS"+"\t"+"IDENTITYCARD"+"\t"
        +"SURNAME"+"\t"+"FIRSTN"+"\t"+"SEX"+"\t"+"BIRTHD"+"\t"+"PHONE1"
        +"\t"+"PHONEN2"+"\t"+"NKNAME"+"\t"+"TNNK"+"\t"+"NATIONALITY"
        +"\t"+"DLC"+"\t"+"STATUS"+"\t"+"ONCOPR"
        +"\t"+"IFALIVE"+"\t"+"PROGRESSION"+"\t"+"CAUSEDEATH"+"\t"+"PLACED"+"\t"+"OCD"+"\t"+"OBSOLETEFLAGPATIENTTABLE"+
        "\t"+"PATIENTRECORDID"+"\t"+"PATIENTUPDATEDBY"+"\t"+"PATIENTUPDATEDATE"+"\t"+"PATIENTRECORDSTATUS"+
        "\t"+"PATIENTCHECKSTATUS"+"\t"+"REMARKS";
      
        
      
        console.log(this.state.mydatas)
        var aregno="";
        var afname="";
        var lname=""
        var emails="";
        var age="";
        var idnums="";
        var genders="";
        var bds="";
        var mdates="";
        var phn="";
        var phn1="";
        var nkin="";
        var natn="";
        var stus="";
        var oncopr="";
        var progress="";
        var csdeath="";
        var placd="";
        
      this.state.mydatas.map(function(itemp, i){
       
      
      
        itemp.enrollments.map(function(enrolmnt, i){
          enrolmnt.events.map(function(evts, i){
      
      if(evts.programStage=="yj7nAGqKXZw")
      {
        evts.dataValues.map(function(dtvalues, i){
      
      if(dtvalues.dataElement=="ya7NvvPZ6NE")
      {
        //console.log(dtvalues.value);
        stus=dtvalues.value;
      }
      
      if(dtvalues.dataElement=="TFmh28f4Ylz")
      {
        //console.log(dtvalues.value);
        oncopr=dtvalues.value;
      }
      if(dtvalues.dataElement=="CiP6FnZEAr7")
      {
        //console.log(dtvalues.value);
        progress=dtvalues.value;
      }
      if(dtvalues.dataElement=="amOhRQ0vBI7")
      {
        //console.log(dtvalues.value);
        csdeath=dtvalues.value;
      }
      if(dtvalues.dataElement=="CMycg9jCdw3")
      {
        //console.log(dtvalues.value);
        placd=dtvalues.value;
      }
      
      
      
      
      
      
      
      })
      }
          })
        })
      
      
      
      
      
        itemp.attributes.map(function(itm, i){
          
          if(itm.attribute=="Yp8W95xlxMv")
          {
            natn=itm.value;
          
          }
          if(itm.attribute=="iUkIkQbkxI1")
          {
            phn=itm.value;
          
          }
          if(itm.attribute=="YfjjdE6XOBu")
          {
            nkin=itm.value;
          
          }
          if(itm.attribute=="dd98c7o6RjZ")
          {
            phn1=itm.value;
          
          }
          
          
          
          
          
          if(itm.attribute=="PTGSZmTk3IQ")
          {
            aregno=itm.value;
            var strFirstThree = aregno.substring(0,2);
      
            var regnolength=aregno.toString().length
            
            if(regnolength=="9")
            {
            
              aregno=aregno.substring(1,9); 
            
            }
      
            if(strFirstThree=="CR")
            {
              var n1=aregno.substring(5,8);
              var n2=aregno.substring(9,14);
              aregno=n1+n2; 
            }
          }
      
          if(itm.attribute=="m1At2P4UT9e")
          {
            mdates=itm.value;
            var pyear=mdates.substring(0,4);
            var pmonth=mdates.substring(5,7);
            var pdate=mdates.substring(8,10);
            bds=pyear+pmonth+pdate;
      
          }
          if(itm.attribute=="l93yUywzP20")
          {
            genders=itm.value;
           
          }
          
          if(itm.attribute=="LbuO5oeODsy")
          {
            idnums=itm.value;
            idnums=idnums;
          }
          if(itm.attribute=="mJ3oYSkDyWz")
          {
            afname=itm.value;
          }
      
          if(itm.attribute=="Uda5alDG8P5")
          {
            lname=itm.value;
          }
          if(itm.attribute=="dd98c7o6RjZ")
          {
            emails=itm.value;
          }
          if(itm.attribute=="m1At2P4UT9e")
          {
            age=itm.value;
          }
        
        })
        var prss="0";
        var tnnk="-1";
       
        
        var ifall="1";
        
        
        
        var ocd="";
        var obsplaq="0";
        var patrecid=aregno+"01";
        var recby="Winny";
        var patrecstatus="0";
        var checkstatus="0";
        var remark="";
        var fullstring=aregno+"\t"+prss+"\t"+idnums+"\t"+afname+"\t"+lname+"\t"+genders+
        "\t"+bds+"\t"+phn+"\t"+phn1+"\t"+nkin+"\t"+tnnk+
        "\t"+natn+"\t"+bds+"\t"+stus+"\t"+
        oncopr+"\t"+ifall+"\t"+progress+"\t"+csdeath+"\t"+placd+"\t"+ocd+"\t"+obsplaq+"\t"+patrecid+
        "\t"+recby+"\t"+bds+"\t"+patrecstatus+"\t"+checkstatus+"\t"+remark;
          
               contacts=contacts+'\n'+fullstring;
      
      })
      
      if(!(aregno==""))
      {
      const element = document.createElement("a");
      const file = new Blob([contacts], {type: 'text/plain;charset=utf-8'});
      element.href = URL.createObjectURL(file);
      element.download = "myFile.txt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
      
      }
      
            
         
       }
      





    sectorfilter = event => {
        const nam = event.target.name
        const val = event.target.value
        this.setState({ [nam]: val })

       // console.log(this.state.date)
       // console.log(this.state.date1)
    
      
        axios
            .get(
                endpointou +
                    event.target.value +
                    '.json?fields=children[name,id]',
                { auth: { username: 'pndayizigiye', password: 'Pascal@1234' } }
            )
            .then(res => {
                console.log(res.data.children)
                this.setState({
                    sectors: res.data.children,
                })
            })
    }

    villagfilter= (event) =>{
        let nam = event.target.name;
        let val = event.target.value;
       
        
      console.log(event.target.value)
      
      
          this.setState({[nam]: val});

          // set the date interval

//Capture DatePicker Fromdate and change the format

          const mdates=this.state.frdate;

      

          var datp=new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(mdates);
          var pdate=datp.substring(0,2);
          var pmonth=datp.substring(3,5);
          var pyear=datp.substring(6,10);
          
          
          var bds=pyear+"-"+pdate+"-"+pmonth;

//Capture DatePicker dateTo and change the format

          const mdates1=this.state.enddate;

      

          var datp1=new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(mdates1);
          var pdate1=datp1.substring(0,2);
          var pmonth1=datp1.substring(3,5);
          var pyear1=datp1.substring(6,10);
          
          
          var bds1=pyear1+"-"+pdate1+"-"+pmonth1;

          //console.log(bds)
          //console.log(bds1)



// filter data with date interval and dump to a variable that populate the txt file to be downloaded

      
          axios.get(endpointtracker+event.target.value+'&ouMode=DESCENDANTS&fields=attributes[attribute,value],enrollments[events[programStage,dataValues]]&program=rx6V962E4XM&programStartDate='+bds+'&programEndDate='+bds1,{auth:{username:"pndayizigiye",password:"Pascal@1234"}})
          .then(res =>{
            
            this.setState(
              {
                isLoaded: true,
                mydatas:res.data.trackedEntityInstances,
              
              }
            )

            if(this.state.mydatas.length>0)
            {
              this.setState(
                  {
                
                    downloadstatus:1,
                  }
                )
                
              
            }
            else{
              this.setState(
                  {
                
                    downloadstatus:0,
                  }
                )
                console.log("no Data");
             
            }
           
          })

         
          
      
      
          //var afname="Pascaltest";
      
      
          //var datss={firstName: ap,lastName: "NDAYIZIGIYE", email: "pazzosgmail.com", age: "30"}
          //data.push(datss);
         
       
      }
      
      

    cellfilter = event => {
        const nam = event.target.name
        const val = event.target.value
        this.setState({ [nam]: val })

        axios
            .get(
                endpointou +
                    event.target.value +
                    '.json?fields=children[name,id]',
                { auth: { username: 'pndayizigiye', password: 'Pascal@1234' } }
            )
            .then(res => {
                console.log(res.data.children)
                this.setState({
                    cells: res.data.children,
                })
            })
    }
    villagefilter = event => {
        const nam = event.target.name
        const val = event.target.value
        this.setState({ [nam]: val })

        axios
            .get(
                endpointou +
                    event.target.value +
                    '.json?fields=children[name,id]',
                { auth: { username: 'pndayizigiye', password: 'Pascal@1234' } }
            )
            .then(res => {
                console.log(res.data.children)
                this.setState({
                    villages: res.data.children,
                })
            })
    }
    componentDidMount() {
        axios
            .get(
                endpointtracker+'Hjw70Lodtf2&ouMode=DESCENDANTS&pageSize=30&fields=attributes[attribute,value]&program=rx6V962E4XM',
                { auth: { username: 'pndayizigiye', password: 'Pascal@1234' } }
            )
            .then(res => {
                const datap = res.data.trackedEntityInstances
                const slice = datap.slice(
                    this.state.offset,
                    this.state.offset + this.state.perPage
                )
                this.setState({
                    isLoaded: true,
                    items: slice,
                    pageCount: Math.ceil(datap.length / this.state.perPage),
                    orgtableData: res.data.trackedEntityInstances,
                    tableData: slice,
                })
            })

        axios
            .get(
                endpointou+'?paging=false&level=2',
                { auth: { username: 'pndayizigiye', password: 'Pascal@1234' } }
            )
            .then(res => {
                console.log(res.data.organisationUnits)
                this.setState({
                    orgs: res.data.organisationUnits,
                })
            })
    }

    handleChange = (date) => {
        // const valueOfInput = this.state.date  <--- I want string with date here
        console.log('this.state.date',this.state.frdate);

        this.setState({frdate: date});
      };
      handleChange1 = (date) => {
        // const valueOfInput = this.state.date  <--- I want string with date here
        console.log('this.state.date',this.state.enddate);
        this.setState({enddate: date});
      };

    render() {
        var a = 0
       

        return (
            <div className="products">
                <h1>Location Filter</h1>

                <ReactFinalForm.Form onSubmit={this.myChangeHandler}>
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>

                                   


                       <Table>
                                <TableHead>
                                    <TableRowHead>
                                        <TableCellHead className={styles.leftcell}>
                                            <div className={styles.row}>
                                                <div className={styles.leftmargin}>
                                                Start Date
                                            <DatePicker
                                            
                  selected={this.state.frdate}
                  name="frdate"
                  onChange={this.handleChange}
                  dateFormat="d MMM yyyy"
                  locale={this.props.language}
                  className={styles.cbx}
                  
                />
</div>
<div className={styles.leftmarginsecond}>
End Date
                <DatePicker
                  selected={this.state.enddate}
                  name="enddate"
                  onChange={this.handleChange1}
                  dateFormat="d MMM yyyy"
                  locale={this.props.language}
                  className={styles.cbx}
                />
                </div>
                                            </div>
                                        </TableCellHead>

                                     
                                  
                                   
                                      

                                     
                                     
                                    
                                    </TableRowHead>
                                </TableHead>
                            </Table>



                            <Table>
                                <TableHead>
                                    <TableRowHead>
                                        <TableCellHead>
                                            <div className={styles.row}>
                                                <select
                                                    className={styles.cbx}
                                                    onChange={this.myFunc}
                                                    name="provselected"
                                                >
                                                    <option value="0">
                                                        Select Province...
                                                    </option>
                                                    {this.state.orgs.map(
                                                        (orgn, index) => (
                                                            <option
                                                                value={orgn.id}
                                                            >
                                                                {
                                                                    orgn.displayName
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </TableCellHead>
                                        <TableCellHead>
                                            <div className={styles.row}>
                                                <select
                                                    className={styles.cbx}
                                                    onChange={this.sectorfilter}
                                                    name="disselected"
                                                >
                                                    <option value="0">
                                                        Select District...
                                                    </option>
                                                    {this.state.districts.map(
                                                        (distr, index) => (
                                                            <option
                                                                value={distr.id}
                                                            >
                                                                {distr.name}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </TableCellHead>
                                        <TableCellHead>
                                            <div className={styles.row}>
                                                <select
                                                    className={styles.cbx}
                                                    onChange={this.cellfilter}
                                                    name="sectselected"
                                                >
                                                    <option value="0">
                                                        Select sector...
                                                    </option>
                                                    {this.state.sectors.map(
                                                        (sect, index) => (
                                                            <option
                                                                value={sect.id}
                                                            >
                                                                {sect.name}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </TableCellHead>
                                        <TableCellHead>
                                            <div className={styles.row}>
                                                <select
                                                    className={styles.cbx}
                                                    onChange={
                                                        this.villagefilter
                                                    }
                                                    name="celselected"
                                                >
                                                    <option value="0">
                                                        Select Cell...
                                                    </option>
                                                    {this.state.cells.map(
                                                        (cels, index) => (
                                                            <option
                                                                value={cels.id}
                                                            >
                                                                {cels.name}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </TableCellHead>

                                        <TableCellHead>
                                            <div className={styles.row}>
                                                <select
                                                    className={styles.cbx}
                                                    onChange={this.villagfilter}
                                                    name="villselected"
                                                >
                                                    <option value="0">
                                                        Select Villages...
                                                    </option>
                                                    {this.state.villages.map(
                                                        (vill, index) => (
                                                            <option
                                                                value={vill.id}
                                                            >
                                                                {vill.name}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </TableCellHead>
                                        <TableCellHead>
                                            <div className={styles.row}>
                                                <Button primary type="submit">
                                                    Filter Data
                                                </Button>
                                            </div>
                                        </TableCellHead>
                                        <TableCellHead>
                                            <div className={styles.row}>
                                                <Button
                                                    primary
                                                    onClick={this.exportexcel}
                                                >
                                                    {this.state.downloadstatus=="0"?"No Data to Downlaad...":"Download"}
                                                </Button>
                                            </div>
                                        </TableCellHead>
                                    </TableRowHead>
                                </TableHead>
                            </Table>



                         




                        </form>
                    )}
                </ReactFinalForm.Form>

                <br />
                <br />


{this.state.isLoaded==false?"Loading...":



                <Table>
                    <TableHead>
                        <TableRowHead>
                            <TableCellHead>First name</TableCellHead>
                            <TableCellHead>Last name</TableCellHead>
                            <TableCellHead>Phone Number</TableCellHead>
                            <TableCellHead>DOB</TableCellHead>

                            <TableCellHead>UID</TableCellHead>
                            <TableCellHead>Other Phone</TableCellHead>
                            <TableCellHead>Status</TableCellHead>
                        </TableRowHead>
                    </TableHead>
                    <TableBody>
                        {this.state.items.map((item, index) => (
                            <TableRow>
                                <TableCell>
                                    {item.attributes.map((attr, index) => (
                                        <p>
                                            {attr.attribute == 'mJ3oYSkDyWz'
                                                ? attr.value
                                                : ''}
                                        </p>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {item.attributes.map((attr, index) => (
                                        <p>
                                            {attr.attribute == 'Uda5alDG8P5'
                                                ? attr.value
                                                : ''}
                                        </p>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {item.attributes.map((attr, index) => (
                                        <p>
                                            {attr.attribute == 'dd98c7o6RjZ'
                                                ? attr.value
                                                : ''}
                                        </p>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {item.attributes.map((attr, index) => (
                                        <p>
                                            {attr.attribute == 'm1At2P4UT9e'
                                                ? attr.value
                                                : ''}
                                        </p>
                                    ))}
                                </TableCell>

                                <TableCell>
                                    {item.attributes.map((attr, index) => (
                                        <p>
                                            {attr.attribute == 'PTGSZmTk3IQ'
                                                ? attr.value
                                                : ''}
                                        </p>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {item.attributes.map((attr, index) => (
                                        <p>
                                            {attr.attribute == 'm1At2P4UT9e'
                                                ? attr.value
                                                : ''}
                                        </p>
                                    ))}
                                </TableCell>
                                <TableCell>Incomplete</TableCell>
                            </TableRow>
                        ))}

                        <ReactPaginate
                            previousLabel={'prev'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                        />
                    </TableBody>
                </Table>



}

            </div>
        )
    }
}

export default Patient
