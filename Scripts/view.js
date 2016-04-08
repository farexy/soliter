/**
 * Created by А on 27.03.2016.
 */
class View{
    static initialize(){
        for(var i = 0; i < Set.NUMBER_OF_CARDS; i++)
            View.addCard(i)
        View.drawPlaces()
        View.drawField()

    }

    static drawField(){
        var cardColls = Field.cardColls;

        var left = 100;
        for(var i = 0; i < Field.NUMBER_OF_COLLS; i++) {
            var top = Field.collsTopPosition;
            for (var j = 0; j < cardColls[i].length; j++) {
                var id = "c" + cardColls[i][j].index;
                View.drawCard(id, left, top, j);
                top += 32;
            }
            left += 110;
        }
    }

    static addCard(i){
        var cardDiv = document.createElement("div");
        cardDiv.setAttribute("id", "c" + i);
        cardDiv.setAttribute("class", "card");
        //cardDiv.setAttribute("style", "background-image: url('Images/" + View.getImageByCardIndex(i) + ".jpg');");
        cardDiv.innerHTML = "<img src = 'Images/" + View.getImageByCardIndex(i) + ".jpg' ondragstart='return false'>";
        cardDiv.onmousedown = DragDrop.dragCard;
        //cardDiv.onmouseup = DragDrop.leaveTargetElement;
        document.getElementById('field').appendChild(cardDiv);
    }

    static drawCard(id, positionHorizontal, positionVertical, zIndex){
        var cardDiv = document.getElementById(id);
        cardDiv.style.top = positionVertical + 'px';
        cardDiv.style.left = positionHorizontal + 'px';
        cardDiv.style.zIndex = zIndex + 1;
    }

    static getImageByCardIndex(i){
        var card = Set.getCardByIndex(i);
        var imageUrl;
        switch (card.suit){
            case cardSuitEnum.HEART:
                imageUrl = 'heart';
                break;
            case cardSuitEnum.CLUB:
                imageUrl = 'club';
                break;
            case cardSuitEnum.DIAMOND:
                imageUrl = 'diamond'
                break;
            case cardSuitEnum.PICA:
                imageUrl = 'pica';
                break;
        }
        return imageUrl + card.value;
    }

    static drawPlaces(){
        var top = 20;
        var left = 100;
        for(var i = 0; i < 2; i++) {
            for(var j = 0; j < 8; j++){
                View.addFreePlace((i + 1) * (j + 1), left, top);
                if(j == 3) left += 100;
                left += 100;
            }
            left = 100;
            top = 200;
        }

    }
    static addFreePlace(i, positionLeft, positionTop){
        var newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'freePlace');
        newDiv.setAttribute('style', 'left: ' + positionLeft + 'px; top: ' + positionTop+ 'px;' );
        newDiv.zIndex = 0;
        Field.addElement(newDiv);
    }
}