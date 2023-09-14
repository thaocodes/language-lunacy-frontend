import { Deck } from '../components/types';

export const mockDeck: Deck = {
    id: 1,
    name: "Dutch Deck",
    flashcards: [
        {
            id: 1,
            number: 1,
            language: "dutch",
            english: "as",
            difficulty: "unset",
            dutch: "als",
        },
        {
            id: 2,
            number: 2,
            language: "dutch",
            english: "I",
            difficulty: "unset",
            dutch: "I",
        },
        {
            id: 3,
            number: 3,
            language: "dutch",
            english: "his",
            difficulty: "unset",
            dutch: "zijn",
        }
    ]
};
