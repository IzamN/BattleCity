(function(){
    'use strict'
    //класс который просто хранит список всех изображений которые нужно отрисовать
    //container
    class Container extends GameEngine.DisplayObject{
        constructor(args={}){
            super(args)
            this.displayObjects=[]

            delete this.width //удаляем так как не нужные поля для контейнера но вообще делать не рекомендуется так
            delete this.height 
        }

        
        add(displayObject){
            if (!this.displayObjects.includes(displayObject)){
                this.displayObjects.push(displayObject)
            }
        }
        remove(){}
        //класс контейнер должен передать всем своим дочерним элементам(картиникам) функцию отрисовки
        draw(canvas, context){
            for(const displayObject of this.displayObjects){
                displayObject.draw(canvas, context) //это draw в самом sprite
            }
        }
    }
    window.GameEngine=window.GameEngine || {}
    window.GameEngine.Container=Container
})()