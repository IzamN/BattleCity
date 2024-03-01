(function(){
    'use strict'
    class Render{
        constructor(args={}){
            this.canvas=document.createElement('canvas');
            this.context=this.canvas.getContext('2d');
            this.canvas.width=args.width || 50 ;
            this.canvas.height=args.height || 50;
            this.background=args.background || 'black'
            this.update=args.update || (()=>{})

            this.stage=new GameEngine.Container()

            //функция отрисовки изображения 

            //функция вызывается один раз при первоначальной загрузки страницы

            requestAnimationFrame(timeStep=>this.tick(timeStep))

        }

        //get all sprites
        get displayObjects(){
            return _getDisplayObjects(this.stage)
            function _getDisplayObjects(container, result=[]){
                for (const displayObject of  container.displayObjects ){
                    if (displayObject instanceof GameEngine.Container) _getDisplayObjects(displayObject, result)
                    else result.push(displayObject)
                }
                return result
            }
           
        }


        //рекурсия для отрисовки

        //tick частота обновления экрана 
        tick (timeStep){
            this.update(timeStep)

            this.clear(this.canvas, this.context)
            this.renderer()

            requestAnimationFrame(timeStep=>this.tick(timeStep))
        }

        renderer(){
            this.stage.draw(this.canvas, this.context)
        }
 
        //clear canvas
        clear (){
            this.context.beginPath()
            this.context.fillStyle=this.background
            this.context.rect(0,0,this.canvas.width, this.canvas.height)
            this.context.fill()
        }
        
    }
    window.GameEngine=window.GameEngine || {};
    window.GameEngine.Render=Render;
})();