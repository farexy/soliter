/**
 * Created by А on 27.03.2016.
 */
    
class DragDrop{

    static set target(value){
        target = value
    }

    static get target(){
        return target;
    }
    static getTargetElement(event){
        if(this.target == null)
            document.getElementById('tx1').innerHTML = event.target.parentElement;
            this.target = event.target.parentElement;

        document.getElementById('tx').innerHTML = this.target;
        this.target.zIndex = 100;
    }

    static leaveTargetElement(event){
        document.getElementById('tx').innerHTML = this.target;
        //alert(this.target)
        //this.target = null;
    }

    static moveTarget(event){
        document.getElementById('tx').innerHTML = this.target;
        if(this.target != null) {
            this.target.style.left = event.pageX - shiftX + 'px';
            this.target.style.top = event.pageY - shiftY + 'px';
        }
    }

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
    card.style.zIndex = 100;
        
    function moveAt(e) {
        card.style.left = e.pageX - card.offsetWidth / 2 + 'px';
        card.style.top = e.pageY - card.offsetHeight / 2 + 'px';
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

