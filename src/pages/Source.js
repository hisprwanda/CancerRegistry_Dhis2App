import { useDataQuery } from '@dhis2/app-runtime'
import { Button, CircularLoader, InputField, Table, TableBody, TableCell, TableCellHead, TableHead, TableRow, TableRowHead } from "@dhis2/ui";

import { SourceTableViewHeader } from './SourceComponents/SourceTableViewHeader'
import React, { useState } from 'react'
import i18n from '../locales/index.js'

import { TumourTableView } from './TumourComponents/TumourTableView'
import { PaginationControls } from './SourceComponents/PaginationControls'
import * as classes from '../App.module.css'
import i18n from "../locales/index.js";
import styles from './Form.module.css'


const eventsQuery = {
    results: {
        resource: 'trackedEntityInstances.json',
        params: ({ page, startDate, endDate, orgUnitID }) => ({
            page: page,
            ou: orgUnitID,
            program: 'rx6V962E4XM',
            fields: ['attributes[attribute,value],enrollments[events[storedBy,event,programStage,dataValues[dataElement,value]]]'],
            programStartDate:startDate,
            programEndDate:endDate,
            totalPages: true,
            pageSize:5,
        }),
    },
    provinces: {
        resource: 'organisationUnits',
        id: 'Hjw70Lodtf2',
        params:{
            fields: ['children[name,id]']
        },
    },
}

export const Source = () => {
    const { loading, error, data, refetch } = useDataQuery(eventsQuery, {
        variables: { page: 0, startDate: '2021-02-01', endDate: '2021-06-01', orgUnitID: 'OujzhM1lgN5' },
    })

    if (error) { return <span>ERROR: {error.message}</span> }

    if (loading) {
        return (
            <>
                <SourceTableViewHeader/>
                <CircularLoader />
            </>
        )
    }

    var RECS = "1", CHEC = "1", HIVSTATUS = "", DATEHIVTEST = "", AGE = "",ADDR= "",MPSEQ= "0",MPTOT= "",INCID= "",BAS= "",TOP= "",BEH= "",
    LATERALITY="",MOR="",I10="",ICCC="",GRDE="",STAGE="",T="",N="",M="",UPDATE="20210605",OBSOLETEFLAGTUMOURTABLE="0",TUMOURID= "",PATIENTIDTUMOURTABLE= "",PATIENTRECORDIDTUMOURTABLE="",TUMOURUPDATEDBY="",TUMOURUNDUPLICATIONSTATUS="",INITIALT="",INTENTT="",SGRY="",DATES="",CHEMO="",STARTC="",ENDCHEMO="",IMMUNO="",STARTI="",ENDIMMUNO="",HPVASS="",RADIO="",STARTR="",ENDRADIO="",HORMO="",STARTH="",ENDHORMO="",PALLIA="",DATEP="",OTHERT="",SPECIFYOT="",STARTOT="",ENDOT="";

    const tumourTableHeaders = "RECS"+"\t"+"CHEC"+"\t"+"HIVSTATUS"+"\t"+"DATEHIVTEST"+"\t"+"AGE"+"\t"+"ADDR"+"\t"+"MPSEQ"+"\t"+"MPTOT"+"\t"+"INCID"+"\t"+"BAS"+"\t"+"TOP"+"\t"+"BEH"+"\t"+
            "LATERALITY"+"\t"+"MOR"+"\t"+"I10"+"\t"+"ICCC"+"\t"+"GRDE"+"\t"+"STAGE"+"\t"+"T"+"\t"+"N"+"\t"+"M"+"\t"+"UPDATE"+"\t"+"OBSOLETEFLAGTUMOURTABLE"+"\t"+"TUMOURID"+"\t"+"PATIENTIDTUMOURTABLE"+"\t"+"PATIENTRECORDIDTUMOURTABLE"+"\t"+"TUMOURUPDATEDBY"+"\t"+"TUMOURUNDUPLICATIONSTATUS"+"\t"+"INITIALT"+"\t"+"INTENTT"+"\t"+"SGRY"+"\t"+"DATES"+"\t"+"CHEMO"+"\t"+"STARTC"+"\t"+"ENDCHEMO"+"\t"+"IMMUNO"+"\t"+"STARTI"+"\t"+"ENDIMMUNO"+"\t"+"HPVASS"+"\t"+"RADIO"+"\t"+"STARTR"+"\t"+"ENDRADIO"+"\t"+"HORMO"+"\t"+"STARTH"+"\t"+"ENDHORMO"+"\t"+"PALLIA"+"\t"+"DATEP"+"\t"+"OTHERT"+"\t"+"SPECIFYOT"+"\t"+"STARTOT"+"\t"+"ENDOT";
    var tumourTableData = tumourTableHeaders;

    const formatPatientID = (oldID) => {
        var newID
        if (oldID.length == 11) { 
            newID = oldID.substring(1, 9);
        } else if  (oldID.length > 11){ newID = oldID.substring(10); }
        return newID;
    }


    const exportTSVFile = (trackedEntityInstances) =>{

  
        var contacts = "TUMOURIDSOURCETABLE"+"\t"+"SOURCERECORDID"+"\t"+"SRC"+"\t"
        +"SRVC"+"\t"+"SRCNO"+"\t"+"ARCHVC"+"\t"+"ADMNDATE"+"\t"+"DATESC"
        +"\t"+"DISDATE"+"\t"+"LABO"+"\t"+"LABNO"+"\t"+"BIOPSYNO"
        +"\t"+"RECEPTNDATE"+"\t"+"REPRTDATE"+"\t"+"FROM"
        +"\t"+"SRCDATE"+"\t"+"TO"+"\t"+"INTENTREF";

//variable declaration...

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

// end of global variable declaration...


trackedEntityInstances.map((itemp) => {


      
    itemp.enrollments.map(function(enrolmnt, i){
        enrolmnt.events.map(function(evts, i){
    
          if(evts.programStage=="x0UOKjUKJsO")
          {
              evts.dataValues.map(function(dtvalues, i){
          
<<<<<<< HEAD
          if(dtvalues.dataElement=="WEMqZvXK07I")
          {
              //console.log(dtvalues.value);
              tumor_src=dtvalues.value;
=======
            if(itm.attribute=="PTGSZmTk3IQ")
          {
            tumourid_src_table=itm.value;
            var strFirstThree = tumourid_src_table.substring(0,2);
      
            var regnolength=tumourid_src_table.toString().length
            
            if(regnolength=="9")
            {
            
                tumourid_src_table=tumourid_src_table.substring(1,9)+"0101"; 
                source_record_id=tumourid_src_table+"01";
            
            }
      
            if(strFirstThree=="CR")
            {
              var n1=tumourid_src_table.substring(5,8);
              var n2=tumourid_src_table.substring(9,14);
              aregno=n1+n2+"0101"; 
              source_record_id=aregno+"01";
              tumourid_src_table=aregno;
            }
>>>>>>> 71519ca50f34bff2ca8ea4a4fb3d80caf88d11f0
          }
          
<<<<<<< HEAD
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
=======
               contacts=contacts+'\n'+fullstring;
      
      })
      
      if(!(tumourid_src_table==""))
      {
      const element = document.createElement("a");
      const file = new Blob([contacts], {type: 'text/plain;charset=utf-8'});
      element.href = URL.createObjectURL(file);
      element.download = "source_data.txt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
      
      }
      
            
         
       }
      




>>>>>>> 71519ca50f34bff2ca8ea4a4fb3d80caf88d11f0

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
          
              tumourid_src_table=tumourid_src_table.substring(1,9)+"0101"; 
              source_record_id=tumourid_src_table+"01";
          
          }
    
          if(strFirstThree=="CR")
          {
            var n1=tumourid_src_table.substring(5,8);
            var n2=tumourid_src_table.substring(9,14);
            aregno=n1+n2+"0101"; 
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











});

if(!(tumourid_src_table==""))
{
const element = document.createElement("a");
const file = new Blob([contacts], {type: 'text/plain;charset=utf-8'});
element.href = URL.createObjectURL(file);
element.download = "sourceFile.txt";
document.body.appendChild(element); // Required for this to work in FireFox
element.click();

}




<<<<<<< HEAD
=======
        return (
            <div className="products">
                <h1>{i18n.t('Source Location Filter')}</h1>
>>>>>>> 71519ca50f34bff2ca8ea4a4fb3d80caf88d11f0



    }

    // Refetches and updates the tumour data as long as the Filter button is clicked
    const updateFetchInfo = (startDate, endDate, orgUnitID) => {
        refetch({ 
            startDate: startDate,
            endDate: endDate,
            orgUnitID: orgUnitID 
        })
    }

    return (

        <div className={classes.tableContainer}>
          <div className='products'>
            <SourceTableViewHeader onUpdateFetchInfo={updateFetchInfo} provinces={data.provinces.children}/>
            
            
            <Table>
                                <TableHead>
                                    <TableRowHead>
                                        <TableCellHead className={styles.leftcell}>
                                            <div className={styles.row}>
                                                <div className={styles.downloadfiles}>
                                             
             
                                                <Button primary onClick={() => {exportTSVFile(data.results.trackedEntityInstances)}}>{i18n.t('Download Source Data')} </Button>
              </div>


             
                                            </div>
                                        </TableCellHead>

                                    
                                    </TableRowHead>
                                </TableHead>
                            </Table>

            
            
            
            
            
 

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
                {data.results.trackedEntityInstances.map((item) => (


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
                                            {attr.attribute == 'dd98c7o6RjZ'
                                                ? attr.value
                                                : ''}
                                        </p>
                                    ))}
                                </TableCell>
                                <TableCell>Incomplete</TableCell>
                            </TableRow>



                ))
                }
                </TableBody>
            </Table>
        </div>
            <PaginationControls pager={data.results.pager} refetch={refetch} />
        </div>
    )
}