import React from 'react';

const Suggestions = props => 
  <ul>
        {props.results.map((result, index) =>
            <li key={index}>
                {result.title}
            </li>
        )}
    </ul>;


export default Suggestions