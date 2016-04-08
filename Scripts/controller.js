/**
 * Created by А on 27.03.2016.
 */
    
class DragDrop{

    static checkNewColl(card){
        var cardLeft = card.getBoundingClientRect().left;
        var left = 100;
        for(var i = 0; i < Field.NUMBER_OF_COLLS; i++) {
            if (cardLeft >= left - 20 && cardLeft <= left + 80) {
                var cardIdx = Set.getCardIndexById(card.id);
                if(Field.isCardSuitableForColl(cardIdx, i)) {
                    var previousColl = Field.getCollByCardIndex(cardIdx)
                    Field.popCardFromColl(previousColl);
                    Field.pushCardToColl(Set.getCardById(card.id), i);
                }

            }
            left += 110;
        }

    }

    static watchPosition(card){
        var cardTop = card.getBoundingClientRect().top;
        if(cardTop >= Field.collsTopPosition){
            DragDrop.checkNewColl(card);
        }
    }

    static dragCard(e) {

    var card = e.target.parentElement;
    var cardInd =  Set.getCardIndexById(card.id);
    if(!Field.isCardAvailable(cardInd))
        return false;
    card.style.zIndex = 100;
    var tailCards = Field.getCardTail(cardInd)
    var tail = Set.convertObjectListToElements(tailCards)
    function moveAt(e) {
        var prevLeft = card.getBoundingClientRect().left;
        var prevTop = card.getBoundingClientRect().top;
        card.style.left = e.pageX - card.offsetWidth / 2 + 'px';
        card.style.top = e.pageY - card.offsetHeight / 2 + 'px';
        var newLeft = prevLeft - card.getBoundingClientRect().left;
        var newTop = prevTop - card.getBoundingClientRect().top;
        for(var i = 0; i < tail.length; i++){
            tail[i].style.left =  tail[i].getBoundingClientRect().left + newLeft - tail[i].offsetWidth / 2 + 'px';
            tail[i].style.top = tail[i].getBoundingClientRect().top + newTop - tail[i].offsetHeight / 2 + 'px';
        }
    }

    document.onmousemove = function(e) {
        moveAt(e);
    };

    card.onmouseup = function() {
        document.onmousemove = null;
        card.onmouseup = null;
        DragDrop.watchPosition(card);
        View.drawField();
    };
}
}

