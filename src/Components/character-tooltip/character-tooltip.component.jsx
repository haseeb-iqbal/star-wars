import React from "react";
import './character-tooltip.styles.scss';

const CharacterTooltip = ({characterInfo}) =>{
    return(
        <div className="tooltip">{characterInfo.name}
            <span className="tooltiptext">
                Gender: {characterInfo.gender}<br/>
                Birth year: {characterInfo.birth_year}<br/>
                Hair color: {characterInfo.hair_color}<br/>
                Eye color: {characterInfo.eye_color}<br/>
                Height: {characterInfo.height}cm<br/>
                Mass: {characterInfo.mass}kg<br/>
            </span>
        </div>

    );

}

export default CharacterTooltip;