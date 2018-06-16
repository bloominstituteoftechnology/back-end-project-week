import React, { Component } from 'react';
import ReactExport from "react-data-export";
import db from '../dummyData.js';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class ExportNotes extends Component {
    render() {
        return (
            <ExcelFile element={<button>Download Notes.xls</button>}>
                <ExcelSheet data={db.data.notes} name="Notes">
                    <ExcelColumn label="Title" value="title" />
                    <ExcelColumn label="Content" value="content" />
                </ExcelSheet>
            </ExcelFile>
        );
    }
}

export default ExportNotes;
