import React from 'react';
import './singleCard.css'
import cover2 from "../img/cover2.jpg";

const SingleCard = ({card, handleChoice, flipped, disabled}) => {

    const handleClick = () => {
        if(!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className={'card'} >
            <div className={flipped ? 'flipped' : ''} >
                <img className={'frontCard'} src={card.src} alt=""/>
                <img
                    className={'backCard'}
                    src={cover2} alt=""
                    onClick={handleClick} />
            </div>
        </div>
    );
};

export default SingleCard;