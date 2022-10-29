import create from 'zustand'
import { v4 as uuidv4 } from 'uuid';

export const useStore = create((set) => ({
    // Lists
    addList: () => set((state) => ({ lists: state.lists.concat([{id: uuidv4(), cards: []}])})),
    deleteList: (id) => set((state) => ({ lists: state.lists.filter(i=>i.id!=id) })),
    
    // Cards
    addCard: (listId) => set((state) => {
        let foundListIdx = state.lists.findIndex(l => l.id == listId)
        state.lists[foundListIdx].cards = state.lists[foundListIdx].cards.concat([{id: uuidv4(), initTitle: "", initDescription: ""}])
        return {lists: [...state.lists]}
    }),
    deleteCard: (listId, cardId) => set((state) => {
        let foundListIdx = state.lists.findIndex(l => l.id == listId)
        state.lists[foundListIdx].cards = state.lists[foundListIdx].cards.filter(i=>i.id != cardId)
        return {lists: [...state.lists]}
    }),
    moveCard: (listId, dragIndex, hoverIndex) => set((state) => {
        let foundListIdx = state.lists.findIndex(l => l.id == listId)
        let newLists = state.lists
        let newCards = state.lists[foundListIdx].cards

        newCards[dragIndex] = newCards.splice(hoverIndex, 1, newCards[dragIndex])[0]
        
        newLists[foundListIdx].cards = newCards
        return {lists: [...newLists]}
    }),
    moveList: (dragIndex, hoverIndex) => set((state) => {
        let newLists = state.lists
        newLists[dragIndex] = newLists.splice(hoverIndex, 1, newLists[dragIndex])[0]
        return {lists: [...newLists]}
    }),

    // Initial values
    lists: [
        {
        title: "Fiction",
        id: uuidv4(), 
        cards: [
            {id: uuidv4(), title: "Great Expectations", description: "Presents the classic story of the orphan Pip, the convict Magwitch, the beautiful Estella, and her guardian, the embittered Miss Havisham"},
            {id: uuidv4(), title: 'Wuthering Heights', description: "Wuthering Heights is one of the world's greatest tales of unrequited love, captivating readers with its intense passion and drama since its publication in 1847."},
        ]
        },
        {
        title: "Non-Fiction",
        id: uuidv4(), 
        cards: [
            {id: uuidv4(), title: 'The Art of War', description: 'Not only for military people who wage war on battlefields, this book is appropriate for business leaders who wage battles in the corporate world, martial artists, spiritual leaders, and those who rely on their street smarts.'},
        ]
        },
        {
        title: "Biographies",
        id: uuidv4(), 
        cards: [
            {id: uuidv4(), title: 'Yes Please', description: "Did you wish you were in the audience at the last two Golden Globes ceremonies, so you could bask in the hilarity of Amy's one-liners? If your answer to these questions is Yes Please! then you are in luck."},
        ]
        },
    ]
}))