(function(){

    'use strict';
    class Loader {
        constructor(){
            //очередь для загрузки
            this.loadOrder={
                images:[],
                jsons:[]
            }
            //ссылки на уже загруженные ресурсы
            this.resources={
                images:[],
                jsons:[]
            }
        }
        //добавление фотографии в очередь на загрузку
        addImage(name, src){
            this.loadOrder.images.push({name, src})
        }
        //добавление json file в загрузку на очередь
        addJson(name, address){
            this.loadOrder.jsons.push({name, address})
        }
        //загружение данных на страницу 
        load (callback){
            const promises=[]
            for (const imageData of this.loadOrder.images ){
                const {name, src}=imageData;
                const promise=Loader.loadImage(src)
                .then(image=>{
                    this.resources.images[name]=image;
                    if (this.loadOrder.images.includes(imageData)){
                        const index=this.loadOrder.images.indexOf(imageData);
                        this.loadOrder.images.splice(index,1);
                    }
                })
                promises.push(promise)
                }
            
            for (const jsonData of this.loadOrder.jsons ){
                const {name, address}=jsonData;
                const promise=Loader.loadJson(address)
                .then(json=>{
                    this.resources.jsons[name]=json;
                    if (this.loadOrder.jsons.includes(jsonData)){
                        const index=this.loadOrder.jsons.indexOf(jsonData);
                        this.loadOrder.jsons.splice(index,1);
                    }
                })
                promises.push(promise)
                }
            Promise.all(promises).then(()=>callback())
        }
        // получение фотографии по адресу с сервера
        static loadImage (src){
            return new Promise(function(resolve, reject){
                try{
                    const image=new Image;
                    image.onload=function(){
                        resolve(image);
                    }
                    image.src=src; 

                }catch(err){
                    reject(err);
                }
            })
        }
        //получение json по адресу с сервера ,json file load with help FETCH
        static loadJson(address){
            return new Promise(function(resolve, reject){
                fetch(address).then(result=>result.json()
                ).then(result=>resolve(result)).catch(err=>reject(err))
            })
        }

    }
    window.GameEngine=window.GameEngine || {};
    window.GameEngine.Loader=Loader;
})();