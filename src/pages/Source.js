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
import { CircularLoader } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'



var data = []

var endpointtracker='https://dev.hisprwanda.org/oncology/api/trackedEntityInstances.json?ou=';
var endpointou='https://dev.hisprwanda.org/oncology/api/organisationUnits/';


const eventsQuery = {
    results: {
        resource: 'events',
        params: ({ page }) => ({
            page: page,
            orgUnit: 'OujzhM1lgN5',
            programStage: 'Y0cWLBEdXzb',
            pageSize: 5,
            fields: ['dataValues'],
            startDate: '2020-04-13',
            endDate: '2021-04-13',
        }),
    },
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

class Source extends Component {
    
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
        
        var contacts = "TUMOURIDSOURCETABLE"+"\t"+"SOURCERECORDID"+"\t"+"SRC"+"\t"
        +"SRVC"+"\t"+"SRCNO"+"\t"+"ARCHVC"+"\t"+"ADMNDATE"+"\t"+"DATESC"
        +"\t"+"DISDATE"+"\t"+"LABO"+"\t"+"LABNO"+"\t"+"BIOPSYNO"
        +"\t"+"RECEPTNDATE"+"\t"+"REPRTDATE"+"\t"+"FROM"
        +"\t"+"SRCDATE"+"\t"+"TO"+"\t"+"INTENTREF";
      
        
      
        console.log(this.state.mydatas)
        var tumourid_src_table="";
        var source_record_id="";
        var tumor_src="";
        var source_service="";
        var patient_hospital_number=""
        var archive_code="";
        var date_of_admition="";
        var date_of_discharge="";
        var date_of_adm="";
        var source_labo="";
        var labnun="";
        var Biopsy_Number="";
        var Date_of_reception="";
        var Date_of_Report="";
        var Referred_from="";
        var srcdate="";
        var Referred_to="";
        var Referred_for="";
        var aregno="";
      
        
      this.state.mydatas.map(function(itemp, i){
       
      
      
        itemp.enrollments.map(function(enrolmnt, i){
          enrolmnt.events.map(function(evts, i){
      
            if(evts.programStage=="x0UOKjUKJsO")
            {
                evts.dataValues.map(function(dtvalues, i){
            
            if(dtvalues.dataElement=="WEMqZvXK07I")
            {
                //console.log(dtvalues.value);
                tumor_src=dtvalues.value;
            }
            
            if(dtvalues.dataElement=="v9h8LhYlF2k")
            {
                //console.log(dtvalues.value);
                source_service=dtvalues.value;
            }
            if(dtvalues.dataElement=="gfyCp3UGFBg")
            {
                //console.log(dtvalues.value);
                patient_hospital_number=dtvalues.value;
            }
            if(dtvalues.dataElement=="g5PfzRwNHVy")
            {
                //console.log(dtvalues.value);
                archive_code=dtvalues.value;
            }
            if(dtvalues.dataElement=="alUwzyO4ksp")
            {
                //console.log(dtvalues.value);
                var dats=dtvalues.value;

                var pyear=dats.substring(0,4);
                var pmonth=dats.substring(5,7);
                var pdate=dats.substring(8,10);
                date_of_admition=pyear+pmonth+pdate;

            }
            if(dtvalues.dataElement=="Ntf8uwbttrj")
            {
                //console.log(dtvalues.value);
                var dats=dtvalues.value;

                var pyear=dats.substring(0,4);
                var pmonth=dats.substring(5,7);
                var pdate=dats.substring(8,10);
                date_of_discharge=pyear+pmonth+pdate;

            }
            if(dtvalues.dataElement=="cVDk6Qi4aXJ")
            {
                //console.log(dtvalues.value);
                source_labo=dtvalues.value;
            }
            if(dtvalues.dataElement=="m9zPgjtU6Ck")
            {
                //console.log(dtvalues.value);
                labnun=dtvalues.value;
            }
            if(dtvalues.dataElement=="K90OuFCv3c8")
            {
                //console.log(dtvalues.value);
                Biopsy_Number=dtvalues.value;
            }
            if(dtvalues.dataElement=="iUev3OfIqOg")
            {
                //console.log(dtvalues.value);
                var dats=dtvalues.value;

                var pyear=dats.substring(0,4);
                var pmonth=dats.substring(5,7);
                var pdate=dats.substring(8,10);
                Date_of_reception=pyear+pmonth+pdate;

            }
            if(dtvalues.dataElement=="kNjR9xQM4Wv")
            {
                //console.log(dtvalues.value);
                var dats=dtvalues.value;

                var pyear=dats.substring(0,4);
                var pmonth=dats.substring(5,7);
                var pdate=dats.substring(8,10);
                Date_of_Report=pyear+pmonth+pdate;

            }
            
            if(dtvalues.dataElement=="sLGqIdIjg20")
            {
                //console.log(dtvalues.value);
                Referred_from=dtvalues.value;
            }
            if(dtvalues.dataElement=="yvXtJYq4f5A")
            {
                //console.log(dtvalues.value);
                Referred_to=dtvalues.value;
            }
            if(dtvalues.dataElement=="BD4nYiPXwLN")
            {
                //console.log(dtvalues.value);
                Referred_for=dtvalues.value;
            }
            
            
            
            
            
            
            
            
            
            
            
            })
            }
                })
                })
      
      
      
      
      
        itemp.attributes.map(function(itm, i){
          
        
          
          if(itm.attribute=="PTGSZmTk3IQ")
          {
            tumourid_src_table=itm.value;
            var strFirstThree = tumourid_src_table.substring(0,2);
      
            var regnolength=tumourid_src_table.toString().length
            
            if(regnolength=="9")
            {
            
                tumourid_src_table=tumourid_src_table.substring(1,9)+"01"; 
                source_record_id=tumourid_src_table+"01";
            
            }
      
            if(strFirstThree=="CR")
            {
              var n1=tumourid_src_table.substring(5,8);
              var n2=tumourid_src_table.substring(9,14);
              aregno=n1+n2+"01"; 
              source_record_id=aregno+"01";
              tumourid_src_table=aregno;
            }
          }
      
         
        
        })
        
      
        
        var fullstring=tumourid_src_table+"\t"+source_record_id+"\t"+tumor_src+"\t"+source_service+"\t"+patient_hospital_number+"\t"+archive_code+
        "\t"+date_of_admition+"\t"+date_of_adm+"\t"+date_of_discharge+"\t"+source_labo+"\t"+labnun+"\t"+Biopsy_Number+
        "\t"+Date_of_reception+"\t"+Date_of_Report+"\t"+Referred_from+"\t"+
        srcdate+"\t"+Referred_to+"\t"+Referred_for;
          
               contacts=contacts+'\n'+fullstring;
      
      })
      
      if(!(tumourid_src_table==""))
      {
      const element = document.createElement("a");
      const file = new Blob([contacts], {type: 'text/plain;charset=utf-8'});
      element.href = URL.createObjectURL(file);
      element.download = "sourceFile.txt";
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
                
                this.setState({
                    orgs: res.data.organisationUnits,
                })
            })

// test dhis2 library...







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
                <h1>Source Location Filter</h1>

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


{this.state.isLoaded==false?<CircularLoader />:



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

export default Source
