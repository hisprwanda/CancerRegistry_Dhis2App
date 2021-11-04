import { useDataQuery, useAlert } from '@dhis2/app-runtime'
import { Button, CircularLoader, InputField, Table, TableBody, TableCell, TableCellHead, TableHead, TableRow, TableRowHead } from "@dhis2/ui";

import { AllRecordsHeaderView } from './AllRecordsHeaderView'
import React, { useState } from 'react'

import { PaginationControls } from './SourceComponents/PaginationControls'
import * as classes from '../App.module.css'
import i18n from "../locales/index.js";
import styles from './Form.module.css';
import { formatTodayDate } from "../app_utils/App_Utils";


const eventsQuery = {
    results: {
        resource: 'trackedEntityInstances.json',
        params: ({ page, startDate, endDate, orgUnitID, pageSize, ouMode }) => ({
            page: page,
            ou: orgUnitID,
            ouMode: ouMode,
            program: 'rx6V962E4XM',
            fields: ['attributes[attribute,value],enrollments[events[storedBy,event,programStage,dataValues[dataElement,value]]]'],
            programStartDate:startDate,
            programEndDate:endDate,
            totalPages: true,
            pageSize:pageSize,
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

export const AllRecords = () => {
    const [forFileDownload, setForFileDownload] = useState(false)

    const formatPatientID = (oldID) => {
        var newID
        if (oldID.length == 9) { 
            newID = oldID.substring(0, 4) + oldID.substring(5);
        } else if  (oldID.length == 14) { 
            newID = oldID.substring(4, 8) + oldID.substring(10);
        }else {
            newID = oldID
        }
        return newID;
    }
    const formatCanRegDate = (dhis2DateFormat) => {
        let rawDate = dhis2DateFormat
        let pyear= rawDate.substring(0,4);
        let pmonth= rawDate.substring(5,7);
        let pdate= rawDate.substring(8,10);
        let canRegDateFormat = pyear+pmonth+pdate;
        return canRegDateFormat;
    }

    const exportTSVFile = (trackedEntityInstances) =>{
  
        var contacts = "TUMOURIDSOURCETABLE"+"\t"+"SOURCERECORDID"+"\t"+"SRC"+"\t"
        +"SRVC"+"\t"+"SRCNO"+"\t"+"ARCHVC"+"\t"+"ADMNDATE"+"\t"+"DATESC"+"\t"+"DISDATE"+"\t"+"LABO"+"\t"+"LABNO"+"\t"+"BIOPSYNO"+"\t"+"RECEPTNDATE"+"\t"+"REPRTDATE"+"\t"+"FROM"+"\t"+"SRCDATE"+"\t"+"TO"+"\t"+"INTENTREF"+"\t"+"RECS"+"\t"+"CHEC"+"\t"+"HIVSTATUS"+"\t"+"DATEHIVTEST"+"\t"+"AGE"+"\t"+"ADDR"+"\t"+"SECTOR"+"\t"+"CELL"+"\t"+"VILLAGE"+"\t"+"MPCODE"+"\t"+"MPSEQ"+"\t"+"MPTOT"+"\t"+"INCID"+"\t"+"BAS"+"\t"+"TOP"+"\t"+"BEH"+"\t"+
        "LATERALITY"+"\t"+"MOR"+"\t"+"I10"+"\t"+"ICCC"+"\t"+"GRDE"+"\t"+"STAGE"+"\t"+"T"+"\t"+"N"+"\t"+"M"+"\t"+"UPDATE"+"\t"+"OBSOLETEFLAGTUMOURTABLE"+"\t"+"TUMOURID"+"\t"+"PATIENTIDTUMOURTABLE"+"\t"+"PATIENTRECORDIDTUMOURTABLE"+"\t"+"TUMOURUPDATEDBY"+"\t"+"TUMOURUNDUPLICATIONSTATUS"+"\t"+"INITIALT"+"\t"+"INTENTT"+"\t"+"SGRY"+"\t"+"DATES"+"\t"+"CHEMO"+"\t"+"STARTC"+"\t"+"ENDCHEMO"+"\t"+"IMMUNO"+"\t"+"STARTI"+"\t"+"ENDIMMUNO"+"\t"+"HPVASS"+"\t"+"RADIO"+"\t"+"STARTR"+"\t"+"ENDRADIO"+"\t"+"HORMO"+"\t"+"STARTH"+"\t"+"ENDHORMO"+"\t"+"PALLIA"+"\t"+"DATEP"+"\t"+"OTHERT"+"\t"+"SPECIFYOT"+"\t"+"STARTOT"+"\t"+"ENDOT"+"\t"+"REGNO"+"\t"+"PERS"+"\t"+"IDENTITYCARD"+"\t"
        +"SURNAME"+"\t"+"FIRSTN"+"\t"+"SEX"+"\t"+"BIRTHD"+"\t"+"PHONE1"
        +"\t"+"PHONEN2"+"\t"+"NKNAME"+"\t"+"TNNK"+"\t"+"NATIONALITY"
        +"\t"+"DLC"+"\t"+"STATUS"+"\t"+"ONCOPR"
        +"\t"+"IFALIVE"+"\t"+"PROGRESSION"+"\t"+"CAUSEDEATH"+"\t"+"PLACED"+"\t"+"OCD"+"\t"+"OBSOLETEFLAGPATIENTTABLE"+
        "\t"+"PATIENTRECORDID"+"\t"+"PATIENTUPDATEDBY"+"\t"+"PATIENTUPDATEDATE"+"\t"+"PATIENTRECORDSTATUS"+
        "\t"+"PATIENTCHECKSTATUS"+"\t"+"REMARKS";

        //variable declaration...
        let tumourid_src_table="", source_record_id="", tumor_src="", source_service="", patient_hospital_number="", archive_code="", date_of_admition="", date_of_discharge="", date_of_adm="", source_labo="", labnun="", Biopsy_Number="", Date_of_reception="", Date_of_Report="", Referred_from="", srcdate="", Referred_to="", Referred_for="", aregno="",datelastcontact="";
       
       
        let RECS = "1", CHEC = "1", HIVSTATUS = "", DATEHIVTEST = "", AGE = "",ADDR= "",SECTOR= "",	CELL= "", VILLAGE="", MPCODE="", MPSEQ= "",MPTOT= "",INCID= "",BAS= "",TOP= "",BEH= "",
    LATERALITY="",MOR="",I10="",ICCC="",GRDE="",STAGE="",T="",N="",M="",UPDATE=formatTodayDate(),OBSOLETEFLAGTUMOURTABLE="0",TUMOURID= "",PATIENTIDTUMOURTABLE= "",PATIENTRECORDIDTUMOURTABLE="",TUMOURUPDATEDBY="",TUMOURUNDUPLICATIONSTATUS="",INITIALT="",INTENTT="",SGRY="",DATES="",CHEMO="",STARTC="",ENDCHEMO="",IMMUNO="",STARTI="",ENDIMMUNO="",HPVASS="",RADIO="",STARTR="",ENDRADIO="",HORMO="",STARTH="",ENDHORMO="",PALLIA="",DATEP="",OTHERT="",SPECIFYOT="",STARTOT="",ENDOT="";

       
       
        // end of global variable declaration...
        let temp_sourceid_src_table="";


//mapping datas in file to download

trackedEntityInstances.map((tei) => {
    let uniqueId = ''
    let sourceCounts = 0
    let sourceEvents = []
    let tumourCounts = 0
    let tumourEvents = []
    let afname="", lname="", emails="", age="", idnums="", genders="", bds="", mdates="", phn="", phn1="", nkin="", natn="", stus="", oncopr="", progress="", csdeath="", placd="",datelastcontact="";





    tei.attributes.map((item) => {
 
        if (item.attribute == 'uWRHiEUPnP7') {
            uniqueId = item.value
        }

        if(item.attribute=="Yp8W95xlxMv")
        {
        natn=item.value;
        
        }
        if(item.attribute=="iUkIkQbkxI1")
        {
        phn=item.value;
        
        }
        if(item.attribute=="YfjjdE6XOBu")
        {
        nkin=item.value;
        
        }
        if(item.attribute=="dd98c7o6RjZ")
        {
        phn1=item.value;
        
        }
        
        if(item.attribute=="m1At2P4UT9e")
        {
        mdates=item.value;
        var pyear=mdates.substring(0,4);
        var pmonth=mdates.substring(5,7);
        var pdate=mdates.substring(8,10);
        bds=pyear+pmonth+pdate;
    
        }
        if(item.attribute=="l93yUywzP20")
        {
        genders=item.value;
        
        }
        
        if(item.attribute=="LbuO5oeODsy")
        {
        idnums=item.value;
        idnums=idnums;
        }
        if(item.attribute=="mJ3oYSkDyWz")
        {
        afname=item.value;
        }
    
        if(item.attribute=="Uda5alDG8P5")
        {
        lname=item.value;
        }
        if(item.attribute=="dd98c7o6RjZ")
        {
        emails=item.value;
        }
        if(item.attribute=="m1At2P4UT9e")
        {
        age=item.value;
        }





    })
    
    // Getting the number of Source  stage events present in the current enrollment
    tei.enrollments.map((enrollment) => {
        enrollment.events.map((teiEvent) => {
            if(teiEvent.programStage=="x0UOKjUKJsO"){
                sourceCounts ++
                sourceEvents.push(teiEvent)
            }
           // stus="";datelastcontact="";oncopr="";progress="";csdeath="";placd="";
            if(teiEvent.programStage=="yj7nAGqKXZw")
            {
                teiEvent.dataValues.map(function(dtvalues, i){
            
            if(dtvalues.dataElement=="ya7NvvPZ6NE")
            {
                //console.log(dtvalues.value);
                stus=dtvalues.value;
            }
            if(dtvalues.dataElement=="ZBgYdd6OKlc")
                    {
                        //console.log(dtvalues.value);
                        mdates=dtvalues.value;
                var pyear=mdates.substring(0,4);
                var pmonth=mdates.substring(5,7);
                var pdate=mdates.substring(8,10);
                datelastcontact=pyear+pmonth+pdate;
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

     // Getting the number of Tumour  stage events present in the current enrollment
     tei.enrollments.map((enrollment) => {
        enrollment.events.map((teiEvent) => {
            if(teiEvent.programStage=="Y0cWLBEdXzb"){
                tumourCounts ++
                tumourEvents.push(teiEvent)
            } 
        })
    })


    for (let i = 0; i < tumourEvents.length; i++) {
        let teiEvent = tumourEvents[i]
        
        // Filling MPSEQ, MPTOT, TUMOURID, PATIENTIDTUMOURTABLE, and PATIENTRECORDIDTUMOURTABLE using patient unique ID
        MPSEQ = (i+1)
        MPTOT = tumourEvents.length
        TUMOURID = uniqueId + '010'+ (i+1);
        PATIENTIDTUMOURTABLE = uniqueId;
        PATIENTRECORDIDTUMOURTABLE = uniqueId +'01';
        TOP ="";
        HIVSTATUS = "", DATEHIVTEST = "", AGE = "",ADDR= "",SECTOR= "",	CELL= "", VILLAGE="", MPCODE="", MPSEQ= "",MPTOT= "",INCID= "",BAS= "",TOP= "",BEH= "",
       LATERALITY="",MOR="",I10="",ICCC="",GRDE="",STAGE="",T="",N="",M="",TUMOURUPDATEDBY="",TUMOURUNDUPLICATIONSTATUS="",INITIALT="",INTENTT="",SGRY="",DATES="",CHEMO="",STARTC="",ENDCHEMO="",IMMUNO="",STARTI="",ENDIMMUNO="",HPVASS="",RADIO="",STARTR="",ENDRADIO="",HORMO="",STARTH="",ENDHORMO="",PALLIA="",DATEP="",OTHERT="",SPECIFYOT="",STARTOT="",ENDOT="";
   
        // Filling the rest of the tumor table fields
        teiEvent.dataValues.map((dataValue) =>{
            if(dataValue.dataElement == "XBZsBO1iIMu") { HIVSTATUS = dataValue.value }
            if(dataValue.dataElement == "w3hjoxhRdxX") { DATEHIVTEST = formatCanRegDate(dataValue.value) }
            if(dataValue.dataElement == "Lklmhjoa2VZ") { AGE = dataValue.value }
            if(dataValue.dataElement == "YjyatbcXrAB") { ADDR = dataValue.value }
            if(dataValue.dataElement == "R7C6qavR1By") { SECTOR = dataValue.value }
            if(dataValue.dataElement == "JoiKTef007f") { CELL = dataValue.value }
            if(dataValue.dataElement == "hNjuN29oWEo") { VILLAGE = dataValue.value }
            if(dataValue.dataElement == "qiPi86HJH9D") { INCID = formatCanRegDate(dataValue.value) }
            if(dataValue.dataElement == "b4nlCulDaNv") { BAS = dataValue.value }
            if(dataValue.dataElement == "mIGq36ORtj5") { TOP = dataValue.value }
            if(dataValue.dataElement == "R3V4FZ7bm1Z") { BEH = dataValue.value }
            if(dataValue.dataElement == "pUcbnDZTKWO") { LATERALITY = dataValue.value }
            if(dataValue.dataElement == "g4InB94akRh") { MOR = dataValue.value }
            if(dataValue.dataElement == "MiCTO3OgRB8") { GRDE = dataValue.value }
            if(dataValue.dataElement == "lsyoWxLKpcg") {  dataValue.value == "Unkwown"? STAGE = "XX" : STAGE = dataValue.value  }
            if(dataValue.dataElement == "jufaPpTt33C") { T = dataValue.value }
            if(dataValue.dataElement == "crCh4AWyhEQ") { N = dataValue.value }
            if(dataValue.dataElement == "YU85aZgUvpI") { M = dataValue.value }
            TUMOURUPDATEDBY = teiEvent.storedBy?teiEvent.storedBy:"";
            if(dataValue.dataElement == "QDYFCDo0kLm") { INITIALT = dataValue.value }
            if(dataValue.dataElement == "EJi6tdw5T1v") { INTENTT = dataValue.value }
            if(dataValue.dataElement == "lb1iN94cSNn") { SGRY = dataValue.value }
            if(dataValue.dataElement == "NzUoPBTcUme") { formatCanRegDate(DATES = dataValue.value) }
            if(dataValue.dataElement == "tmy8Js2OerA") { CHEMO = dataValue.value }
            if(dataValue.dataElement == "dqLzVzpPBQk") { STARTC = formatCanRegDate(dataValue.value) }
            if(dataValue.dataElement == "qKApg9EbBvP") { ENDCHEMO = formatCanRegDate(dataValue.value) }
            if(dataValue.dataElement == "qhTmdhweTY6") { IMMUNO = dataValue.value }
            if(dataValue.dataElement == "UH0QjAVVpBw") { STARTI = formatCanRegDate(dataValue.value) }
            if(dataValue.dataElement == "Os8vbHJ3qoc") { ENDIMMUNO = formatCanRegDate(dataValue.value) }
            if(dataValue.dataElement == "simuoODFRUc") { RADIO = dataValue.value }
            if(dataValue.dataElement == "KuewOYQYRq7") { STARTR = formatCanRegDate(dataValue.value) }
            if(dataValue.dataElement == "THtdWv46cXH") { ENDRADIO = formatCanRegDate(dataValue.value) }
            if(dataValue.dataElement == "QKXwZ57aGdH") { HORMO = dataValue.value }
            if(dataValue.dataElement == "pazmxkluuAK") { STARTH = formatCanRegDate(dataValue.value) }
            if(dataValue.dataElement == "ZTtTjPPKemm") { ENDHORMO = formatCanRegDate(dataValue.value) }
            if(dataValue.dataElement == "N6J5Bp9auN9") { PALLIA = dataValue.value }
            if(dataValue.dataElement == "KWsp9YpTp8O") { DATEP = formatCanRegDate(dataValue.value) }
            if(dataValue.dataElement == "YYW855k5GgW") { OTHERT = dataValue.value }
            if(dataValue.dataElement == "tfeZgkgqJC9") { SPECIFYOT = dataValue.value }
            
        });
      
    }



    
    for (let i = 0; i < sourceEvents.length; i++) {
        let teiEvent = sourceEvents[i]

       
                    aregno = uniqueId+"0101"; 
                    source_record_id=aregno+"0"+(i+1);
                    tumourid_src_table=aregno;
        
        // Filling the rest of the tumor table fields



        tumor_src ="";source_service ="";patient_hospital_number ="";archive_code ="";date_of_admition="";
        date_of_discharge="";source_labo="";labnun=""; Biopsy_Number="";Date_of_reception="";
         Date_of_Report="";Referred_from="";Referred_to="";Referred_for="";







        teiEvent.dataValues.map((dataValue) =>{
            if(dataValue.dataElement == "WEMqZvXK07I") { tumor_src = dataValue.value }
            if(dataValue.dataElement == "v9h8LhYlF2k") { source_service = dataValue.value }
            if(dataValue.dataElement == "gfyCp3UGFBg") { patient_hospital_number = dataValue.value }
            if(dataValue.dataElement == "g5PfzRwNHVy") { archive_code = dataValue.value }
            if(dataValue.dataElement=="alUwzyO4ksp")
            {
                //console.log(dtvalues.value);
                var dats=dataValue.value;

                var pyear=dats.substring(0,4);
                var pmonth=dats.substring(5,7);
                var pdate=dats.substring(8,10);
                date_of_admition=pyear+pmonth+pdate;

            }
            if(dataValue.dataElement=="Ntf8uwbttrj")
            {
                //console.log(dtvalues.value);
                var dats=dataValue.value;

                var pyear=dats.substring(0,4);
                var pmonth=dats.substring(5,7);
                var pdate=dats.substring(8,10);
                date_of_discharge=pyear+pmonth+pdate;

            }




            if(dataValue.dataElement=="cVDk6Qi4aXJ")
            {
                //console.log(dtvalues.value);
                source_labo=dataValue.value;
            }
            if(dataValue.dataElement=="m9zPgjtU6Ck")
            {
                //console.log(dtvalues.value);
                labnun=dataValue.value;
            }
            if(dataValue.dataElement=="K90OuFCv3c8")
            {
                //console.log(dtvalues.value);
                Biopsy_Number=dataValue.value;
            }
            if(dataValue.dataElement=="iUev3OfIqOg")
            {
                //console.log(dtvalues.value);
                var dats=dataValue.value;

                var pyear=dats.substring(0,4);
                var pmonth=dats.substring(5,7);
                var pdate=dats.substring(8,10);
                Date_of_reception=pyear+pmonth+pdate;

            }
            if(dataValue.dataElement=="kNjR9xQM4Wv")
            {
                //console.log(dtvalues.value);
                var dats=dataValue.value;

                var pyear=dats.substring(0,4);
                var pmonth=dats.substring(5,7);
                var pdate=dats.substring(8,10);
                Date_of_Report=pyear+pmonth+pdate;

            }
            
            if(dataValue.dataElement=="sLGqIdIjg20")
            {
                //console.log(dtvalues.value);
                Referred_from=dataValue.value;
            }
            if(dataValue.dataElement=="yvXtJYq4f5A")
            {
                //console.log(dtvalues.value);
                Referred_to=dataValue.value;
            }
            if(dataValue.dataElement=="BD4nYiPXwLN")
            {
                //console.log(dtvalues.value);
                Referred_for=dataValue.value;
            }
      
    
        });
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


        var fullstring=tumourid_src_table+"\t"+source_record_id+"\t"+tumor_src+"\t"+source_service+"\t"+patient_hospital_number+"\t"+archive_code+
        "\t"+date_of_admition+"\t"+date_of_adm+"\t"+date_of_discharge+"\t"+source_labo+"\t"+labnun+"\t"+Biopsy_Number+
        "\t"+Date_of_reception+"\t"+Date_of_Report+"\t"+Referred_from+"\t"+srcdate+"\t"+Referred_to+"\t"+Referred_for+"\t"+RECS+"\t"+CHEC+"\t"+HIVSTATUS+"\t"+DATEHIVTEST+"\t"+AGE+"\t"+ADDR+"\t"+SECTOR+"\t"+CELL+"\t"+VILLAGE+"\t"+MPCODE+"\t"+MPSEQ+"\t"+MPTOT+"\t"+INCID+"\t"+BAS+"\t"+TOP+"\t"+BEH+"\t"+
        LATERALITY+"\t"+MOR+"\t"+I10+"\t"+ICCC+"\t"+GRDE+"\t"+STAGE+"\t"+T+"\t"+N+"\t"+M+"\t"+UPDATE+"\t"+OBSOLETEFLAGTUMOURTABLE+"\t"+TUMOURID+"\t"+PATIENTIDTUMOURTABLE+"\t"+PATIENTRECORDIDTUMOURTABLE+"\t"+
        TUMOURUPDATEDBY+"\t"+TUMOURUNDUPLICATIONSTATUS+"\t"+INITIALT+"\t"+INTENTT+"\t"+SGRY+"\t"+DATES+"\t"+CHEMO+"\t"+STARTC+"\t"+ENDCHEMO+"\t"+IMMUNO+"\t"+STARTI+"\t"+ENDIMMUNO+"\t"+HPVASS+"\t"+RADIO+"\t"+
                        STARTR+"\t"+ENDRADIO+"\t"+HORMO+"\t"+STARTH+"\t"+ENDHORMO+"\t"+PALLIA+"\t"+DATEP+"\t"+OTHERT+"\t"+SPECIFYOT+"\t"+STARTOT+"\t"+ENDOT+"\t"+uniqueId+"\t"+prss+"\t"+idnums+"\t"+afname+"\t"+lname+"\t"+genders+"\t"+bds+"\t"+phn+"\t"+phn1+"\t"+nkin+"\t"+tnnk+ "\t"+natn+"\t"+datelastcontact+"\t"+stus+"\t"+ 
                        oncopr+"\t"+ifall+"\t"+progress+"\t"+csdeath+"\t"+placd+"\t"+ocd+"\t"+obsplaq+"\t"+patrecid+ "\t"+recby+"\t"+formatTodayDate()+"\t"+patrecstatus+"\t"+checkstatus+"\t"+remark;
                
        
        if(tumourid_src_table.length == 12){
            contacts=contacts+'\n'+fullstring;
        }

    }
});


    const element = document.createElement("a");
    const file = new Blob([contacts], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = "source_data.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();


        // Reset file dowload to false
        setForFileDownload(false)

        // Show paginated list again
        refetch({ 
            pageSize: 5
        })
        

    }

    // A dynamic alert to communicate success or failure 
    const { show } = useAlert(
        ({ message }) => message,
        ({ status }) => {
            if (status === 'success') return { success: true }
            else if (status === 'error') return { critical: true }
            else return {}
        } )

    const { loading, error, data, refetch } = useDataQuery(eventsQuery, {
        variables: { page: 0, startDate: '2021-02-01', endDate: '2021-06-01', orgUnitID: 'OujzhM1lgN5', pageSize: 5, ouMode: 'SELECTED' },
    })

    if (error) { return <span>ERROR: {error.message}</span> }

    if (loading) {
        return (
            <>
                <CircularLoader />
            </>
        )
    }

    if (data.results.trackedEntityInstances) {  
        const message = 'SUCCESS: Successfully retrieved Source events.'
        if (forFileDownload) {
            exportTSVFile(data.results.trackedEntityInstances)
        }
        show({ message, status: 'success' })
    }

    const updateDowloadInfo = (pageSize) =>{
        setForFileDownload(true)

        refetch({ 
            pageSize: pageSize
        })
    }

    // Refetches and updates the tumour data as long as the Filter button is clicked
    const updateFetchInfo = (startDate, endDate, orgUnitID, ouMode) => {
        refetch({ 
            startDate: startDate,
            endDate: endDate,
            orgUnitID: orgUnitID,
            ouMode: ouMode 
        })

        setForFileDownload(false)
    }

    return (

        <div className={classes.tableContainer}>
          <div className='products'>
            <AllRecordsHeaderView onUpdateFetchInfo={updateFetchInfo} provinces={data.provinces.children}/>
            
            
            <Table>
                                <TableHead>
                                    <TableRowHead>
                                        <TableCellHead className={styles.leftcell}>
                                            <div className={styles.row}>
                                                <div className={styles.downloadfiles}>
                                             
             
                                                <Button primary onClick={() => {updateDowloadInfo(data.results.pager.total)}}>{i18n.t('Download Oncology Data')} </Button>
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
                                            {attr.attribute == 'uWRHiEUPnP7'
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