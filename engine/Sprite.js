//sprite вместо изображений , оно отображает на странице текстуру
//текстура - содежрание картинки . та часть картинки которую нам надо отобразить
(function(){
    'use strict'
    class Sprite extends GameEngine.DisplayObject{
        constructor(texture, args={}){
            super(args)
            this.texture=texture

            const frame=args.frame || {}

            //данные части картинки которые нам нужны и будем их вырезать
            this.frame={
                x:frame.x || 0,
                y: frame.y || 0,
                width:frame.width || texture.width,
                height:frame.height || texture.height
            }
            //данные отображаемые на canvas
            //удалили так как унаследуем от displayObject
            // this.x= args.x || 0
            // this.y=args.y || 0
            // this.anchorX= args.anchorX || 0
            // this.anchorY=args.anchorY || 0
            //  this.width=args.width || this.frame.width //ширина и высота текстуры
            //  this.height=args.height || this.frame.height
            
            if (args.width === undefined) {
                this.width = this.frame.width
            }
    
            if (args.height === undefined) {
                this.height = this.frame.height
            }
          
          
        }



        //геттеры и сеттеры особые поля которые явлюятся функциями и могут вычисляться налету
        //getter
        //перенесли в displayObject
        // get absoluteX(){
        //     return this.x-this.anchorX*this.width
        // }
        // get absoluteY(){
        //     return this.y-this.anchorY*this.height
        // }
        // set absoluteX(value){
        //     this.x=value+this.anchorX*this.width
        //     return value;

        // }
        // set absoluteY(value){
        //     this.y=value+this.anchorY*this.height
        //     return value

        // }


        //----------------------------------
        // get scaleX(){
        //     return this.width/this.frame.width
        // }
        // get scaleY(){
        //     return this.height/this.frame.height
        // }

        // //setter
        // set scaleX(value){
        //     this.width=this.frame.width*value
        //     return value;
        // }
        // set scaleY(value){
        //     this.height=this.frame.height*value;
        //     return value
        // }


        draw(canvas, context){
            context.save()
            context.translate(this.x, this.y) //this.x this.y 1/2canvas
            context.rotate(-this.rotation)
            context.scale(this.scaleX, this.scaleY)
            context.drawImage(
                this.texture,
                //координаты откуда часть изображние из всего изображение начинать вырезать
                this.frame.x,
                this.frame.y,
                this.frame.width,
                this.frame.height,
                //координаты на canvas куда начинать нам вставлять вырезанное изображние
                // this.x,
                // this.y,
                this.absoluteX-this.x, //center of sprite
                this.absoluteY-this.y,
                this.width,
                this.height
                
            )
            context.restore()

        }
    }

    window.GameEngine=window.GameEngine || {}
    window.GameEngine.Sprite=Sprite
})()