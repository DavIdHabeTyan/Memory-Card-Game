import './App.css';

import {imageDat} from "./imagesData";
import {useEffect, useState} from "react";
import SingleCard from "./components/singleCard";

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const shuffleCards = () => {
        const shuffledCards = [...imageDat, ...imageDat]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random()}));

        setCards(shuffledCards);
        setTurns(0);
    }
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }


    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);

            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceTwo.src) {
                            return {...card, isMatched: true}
                        } else {
                            return card
                        }
                    })
                })
                resetTurn()
            } else {
                setTimeout(() => resetTurn(), 1000)
            }
        }
    }, [choiceOne, choiceTwo])

    console.log(cards)
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(turns => turns + 1)
        setDisabled(false)
    }

    return (
        <div className="App">
            <h2>Hello word</h2>
            <button onClick={shuffleCards}>New game</button>
            <div className="card_grid">
                {cards.map(card => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.isMatched}
                        disabled={disabled}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
