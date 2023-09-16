import React from 'react'
import { Deck } from './types';

type Props = {
    deck: Deck;
}

const SingleDeck: React.FC<Props> = ({ deck }) => {
    return (
        <div>A Deck of Flashcards</div>
    )
};

export default SingleDeck;