import React from 'react';
import './Suggestions.css';

function Suggestions(props) {
    const suggestions = props.suggestions;
    if (suggestions.length === 0) return null;
    const titles = suggestions.map((suggestion, index) => {
        return (
            <li className={"sugestion"} key={index} onClick={props.onSelect} value={suggestion.id}>
                {suggestion.title}
            </li>
        )
    });
    return (
        <ul className="suggestions shadow">
            {titles}
        </ul>
    );
}

export default Suggestions;
