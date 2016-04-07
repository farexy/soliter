/**
 * Created by А on 27.03.2016.
 */

var cardValueEnum = {
    ACE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    JACK: 11,
    QUEEN: 12,
    KING: 13
}

var cardSuitEnum = {
    HEART: 0, //red
    CLUB: 1, //black
    PICA: 3,
    DIAMOND: 2
}

class Card{
    constructor(suit, value, index) {
        this.value = value;
        this.suit = suit;
        this.index = index;
    }
}

class Set{

    static get NUMBER_OF_CARDS() {
        return 52;
    };

    static initialize(){
        this.cards = [];
        for(let i = 0; i < Set.NUMBER_OF_CARDS; i++){
            this.cards[i] = new Card(i % 4, i % 13 + 1, i);
        }
        Field.initialize(this.cards)
    }

    static get cards(){
        return cards;
    }

    static set cards(value){
        cards = value;
    }

    static getCardByIndex(i){
        return this.cards[i];
    }

    static getCardById(id){
        id = id.substring(1);
        return this.cards[parseInt(id)];
    }

    static getCardIndexById(id){
        return id.substring(1);
    }

    static compareCardsCollors(suit1, suit2){
        if((suit1 == cardSuitEnum.HEART || suit1 == cardSuitEnum.DIAMOND)
            && (suit2 == cardSuitEnum.DIAMOND || suit2 == cardSuitEnum.HEART))
                return true;
        if((suit1 == cardSuitEnum.CLUB || suit1 == cardSuitEnum.PICA)
            && (suit2 == cardSuitEnum.CLUB || suit2 == cardSuitEnum.PICA))
                return true;
        return false;
    }
}

var cardColl; //я чего то не понимаю... в классе Field в getter и setter ругается на эту переменную как на undefined
//поэтому пришлось объевить её сдесь... при этом абсолютно аналогично в классе Set getter и setter все работает...

class Field{

    static get NUMBER_OF_COLLS(){
        return 8;
    }

    static addElement(element){
        document.getElementById('field').appendChild(element);
    }

    static initialize(cardSet){
        this.cardColls = [];
        for(var i = 0; i < Field.NUMBER_OF_COLLS; i++)
            this.cardColls[i] = [];
        for(var i = 0; i < cardSet.length; i++){
            var index = Math.round(Math.random() * 7);
            this.cardColls[index].push(cardSet[i]);
        }
        View.initialize();
    }

    static set cardColls(value){
        cardColl = value;
    }

    static get cardColls(){
        return cardColl;
    }

    static set cardFreePlace(value){
        cardFreePlace = value;
    }

    static get cardFreePlace(){
        return cardFreePlace;
    }

    static get collsTopPosition(){
        return 175;
    }
    
    static getCollByCardIndex(idx){
        for(var i = 0; i < this.NUMBER_OF_COLLS; i++)
            for(var j = 0; j < this.cardColls[i].length; j++) {
                if (idx == this.cardColls[i][j].index)
                    return i;
            }
    }

    static availableCards(idxCard, idxColl){
        var result = [];
        if(Field.popCardFromColl(idxColl) == Set.getCardByIndex(idxCard))
            result[0] = Field.popCardFromColl(idxColl);
    }

    static isCardSuitableForColl(cardIndex, collIndex){
        var card = Set.getCardByIndex(cardIndex);
        var coll = this.cardColls[collIndex];
        var topCard = coll[coll.length - 1]
        return (topCard.value - card.value == 1 && !Set.compareCardsCollors(card.suit, topCard.suit))
    }

    static pushCardToColl(card, collIndex){
        this.cardColls[collIndex].push(card);
    }

    static popCardFromColl(collIndex){
        var coll = this.cardColls[collIndex];
        var card = coll.pop();
        return card;
    }

}

window.onload = Set.initialize;


