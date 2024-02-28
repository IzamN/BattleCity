(function(){
    'use strict'
    //любой объект который нужно отобразить sprite json container 
    class DisplayObject{
        constructor(args){
            this.x=args.x || 0
            this.y=args.y || 0
            this.width=args.width || 0
            this.height=args.height || 0
            this.rotation =args.rotation || 0
            this.anchorX= args.anchorX || 0
            this.anchorY=args.anchorY || 0
            this.scaleX=args.scaleX || 1
            this.scaleY=args.scaleY || 1
            if (args.scale!==undefined){
                this.setScale(args.scale)

            }

        }
        //так как любой обект (сущеность ) которую мы отрисовываем внутри себя будет иметь функцию draw свою, поэтому в главном классе мы ее обозначим, а в дочерних потом будем переопределять для каждого свое
       

        get absoluteX(){
            return this.x-this.anchorX*this.width
        }
        get absoluteY(){
            return this.y-this.anchorY*this.height
        }
        set absoluteX(value){
            this.x=value+this.anchorX*this.width
            return value;

        }
        set absoluteY(value){
            this.y=value+this.anchorY*this.height
            return value

        }

        draw(){}
        
        setScale(scale){
            this.scaleX=scale
            this.scaleY=scale
        }
    }
    window.GameEngine=window.GameEngine || {}
    window.GameEngine.DisplayObject=DisplayObject

})()