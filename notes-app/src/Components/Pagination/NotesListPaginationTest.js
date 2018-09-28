// import React, { Component } from 'react';
// import './index.css';
// import { Link } from 'react-router-dom';
// import Pagination from '../Pagination/Pagination';


// class NotesList extends Component {

    
//     state = {
//         update: false,
//         notes: this.props.state.notes, // or elsewhere ?? this.setState({notes: this.props.state.notes})
//         allNotes: [],
//         currentNotes: [],
//         currentPage: null,
//         totalPages: null
//     }

//     componentDidMount() {
//         const allNotes = this.props.state.notes;
//         this.setState({ allNotes });
//     }

//     onPageChanged = data => {
//         const { allNotes } = this.state;
//         const { currentPage, totalPages, pageLimit } = data;
    
//         const offset = (currentPage - 1) * pageLimit;
//         const currentNotes = allNotes.slice(offset, offset + pageLimit);
    
//         this.setState({ currentPage, currentNotes, totalPages });
//     };
    
    
//     render(){
//         const {
//             allNotes,
//             currentNotes,
//             currentPage,
//             totalPages
//         } = this.state;
//         const totalNotes = allNotes.length;

//         if (totalNotes === 0) return null;

//         // const headerClass = [
//         //     "text-dark py-2 pr-4 m-0",
//         //     currentPage ? "border-gray border-right" : ""
//         // ]
//         //     .join(" ")
//         //     .trim();
        
//         return (
//             <div className="container mb-5">
//               <div className="row d-flex flex-row py-5">
//                 <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
//                   <div className="d-flex flex-row align-items-center">
//                     <h2 className={headerClass}>
//                       <strong className="text-secondary">{totalCountries}</strong>{" "}
//                       Countries
//                     </h2>
//                     {currentPage && (
//                       <span className="current-page d-inline-block h-100 pl-4 text-secondary">
//                         Page <span className="font-weight-bold">{currentPage}</span> /{" "}
//                         <span className="font-weight-bold">{totalPages}</span>
//                       </span>
//                     )}
//                   </div>
//                   <div className="d-flex flex-row py-4 align-items-center">
//                     <Pagination
//                       totalRecords={totalCountries}
//                       pageLimit={18}
//                       pageNeighbours={1}
//                       onPageChanged={this.onPageChanged}
//                     />
//                   </div>
//                 </div>
//                 {currentCountries.map(country => (
//                   <CountryCard key={country.cca3} country={country} />
//                 ))}
//               </div>
//             </div>
//           );
//         }
//       }

// export default NotesList;


// // return (
// //     <div>
// //         <div className="inner_outer_notes">
        
// //         <h3 className="list_title">Your Notes:</h3>
// //         <div className="note_container">
// //         {this.props.state.notes.map(each => (


// //             <Link to={`/note/${each.id}`} style={{ textDecoration: 'none' }}>
// //                 <div 
// //                     className="note" 
// //                     key={each.id}
// //                     allnotes={this.state}    
// //                 >

// //                 <div className="note_title" >
// //                 <div>{each.title}</div>
// //                 <br /><br />
// //                 </div>
// //                 <div>{each.content}</div>
// //                 </div>
// //             </Link>
            
// //         ))}
// //         </div>
// //         </div>
        
// //     </div>
// // )
// // }

// // }