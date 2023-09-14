import React from 'react'
import { Deck } from './types';

type Props = {
    deck: Deck;
}

const FlashcardDeck: React.FC<Props> = ({ deck }) => {
    return (
        <div>FlashcardDeck</div>
    )
};

export default FlashcardDeck;